import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardBody, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {load, select, openAddMembersDialog, exclude} from "../actions/manage_members_actions";
import AddMembersDialog from './AddMembersDialog';
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

    checkAndLoadMembers = () => {
        if (!this.props.members && this.props.project) {
            this.props.load(this.props.project);
        }
    };

    membersList = () => this.props.members ? (this.state.search ?
            this.props.members._embedded.projectMembers.filter(m =>
                m.account.fullName.includes(this.state.search)
            ) :
            this.props.members._embedded.projectMembers
    ) : null;

    isCurrent = (member) => this.props.selected ?
        this.props.selected._links.self.href === member._links.self.href : false;

    canExlude = () => this.props.selected ? this.props.selected._links.exclude != null : false;

    onSelect = (member) => this.props.select(member);

    onAdd = () => this.props.openAddMembersDialog();

    onExclude = () => {
        const member = this.props.selected;
        alertify
            .okBtn("Yes")
            .cancelBtn("No")
            .confirm(`Exclude ${member.account.fullName} from project?`, () => {
                this.props.exclude(member);
            });

    };

    render() {
        const list = this.membersList() ? this.membersList().map(member => (
            <Card className={'selectable-item mb-3' + (this.isCurrent(member) ? ' selected' : '')}
                  key={member._links.self.href} onClick={() => this.onSelect(member)}>
                <CardBody>
                    <Row>
                        <Col>{member.account.fullName}</Col>
                        <Col>{member.role}</Col>
                    </Row>
                </CardBody>
            </Card>
        )) : (<Container>Loading...</Container>);

        const excludeAction = this.canExlude() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onExclude}>Exclude</Button>
                </Col>
            </Row>
        ) : '';

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>Manage members</h2>
                        {list}
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>
                                <Button color='primary' onClick={this.onAdd}>Add member</Button>
                            </Col>
                        </Row>
                        {excludeAction}
                        <Row>
                            <Col>
                                <Link to='projects'>Go back</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <AddMembersDialog/>
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
    {load, select, openAddMembersDialog, exclude},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageMembersPage);