import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardBody, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {load, select, openAddMembersDialog} from "../actions/manage_members_actions";
import AddMembersDialog from './AddMembersDialog';

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

    onSelect = (member) => this.props.select(member);

    onAdd = () => this.props.openAddMembersDialog();

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
                        <Link to='projects'>Go back</Link>
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
    {load, select, openAddMembersDialog},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageMembersPage);