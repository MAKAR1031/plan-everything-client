import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";
import {load, select} from "../actions/manage_members_actions";

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

    onSelect = (member) => this.props.select(member);

    render() {
        const list = this.membersList() ? this.membersList().map(member => (
            <Card className='selectable-item mb-3' key={member._links.self.href} onClick={() => this.onSelect(member)}>
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
                        <Link to='projects'>Go back</Link>
                    </Col>
                </Row>
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
    {load, select},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageMembersPage);