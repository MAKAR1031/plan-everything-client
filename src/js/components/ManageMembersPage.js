import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardBody, Button, Input} from "reactstrap";
import {Link} from "react-router-dom";
import {load, select, openAddMembersDialog, openChangeRoleDialog, exclude} from "../actions/manage_members_actions";
import AddMembersDialog from './AddMembersDialog';
import ChangeMemberRoleDialog from './ChangeMemberRoleDialog';
import alertify from 'alertify.js';

class ManageMembersPage extends Component {
    state = {
        search: ''
    };

    componentDidMount() {
        this.checkAndLoadMembers();
    }

    componentDidUpdate() {
        this.checkAndLoadMembers();
    }

    projectName = () => this.props.project ? this.props.project.name : '';

    checkAndLoadMembers = () => {
        if (!this.props.members && this.props.project) {
            this.props.load(this.props.project);
        }
    };

    membersList = () => this.props.members ? (this.state.search ?
            this.props.members._embedded.projectMembers.filter(m =>
                m.account.fullName.includes(this.state.search) ||
                m.account.login.includes(this.state.search)
            ) :
            this.props.members._embedded.projectMembers
    ) : null;

    isCurrent = (member) => this.props.selected ?
        this.props.selected._links.self.href === member._links.self.href : false;

    canChangeRole = () => this.props.selected ? this.props.selected._links.changeRole != null : false;

    canExclude = () => this.props.selected ? this.props.selected._links.exclude != null : false;

    onSearch = e => this.setState({search: e.target.value});

    onSelect = (member) => this.props.select(member);

    onAdd = () => this.props.openAddMembersDialog();

    onChangeRole = () => this.props.openChangeRoleDialog();

    onExclude = () => {
        const member = this.props.selected;
        alertify
            .okBtn("Yes")
            .cancelBtn("No")
            .confirm(`Exclude ${member.account.fullName} from project?`, () => this.props.exclude(member));

    };

    render() {
        const list = this.membersList() ? this.membersList().map(member => (
            <Card className={'selectable-item mb-3' + (this.isCurrent(member) ? ' selected' : '')}
                  key={member._links.self.href} onClick={() => this.onSelect(member)}>
                <CardBody>
                    <Row>
                        <Col>{member.account.fullName}</Col>
                        <Col>{member.role.name}</Col>
                    </Row>
                </CardBody>
            </Card>
        )) : (<Container>Loading...</Container>);

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>Manage members</h2>
                            <Input
                                className='mb-4'
                                placeholder='Search member...'
                                value={this.state.search}
                                onChange={this.onSearch}/>
                            {list}
                        </Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Container className='info-container'>
                            <Row>
                                <Col>Project name: {this.projectName()}</Col>
                            </Row>
                        </Container>
                        <Container className='actions-container'>
                            <Row>
                                <Col>
                                    <Button color='primary' onClick={this.onAdd}>Add member</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.canChangeRole()}
                                            onClick={this.onChangeRole}>
                                        Change role
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.canExclude()}
                                            onClick={this.onExclude}>
                                        Exclude
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to='/project'>Go back</Link>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <AddMembersDialog/>
                <ChangeMemberRoleDialog/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject,
    members: state.membersManagement.members,
    selected: state.membersManagement.selected
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, select, openAddMembersDialog, openChangeRoleDialog, exclude},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageMembersPage);