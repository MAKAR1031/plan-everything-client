import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Button} from 'reactstrap';
import {Link} from "react-router-dom";

class ProjectPage extends Component {

    componentDidMount() {
        this.checkAuthAndRedirect();
    }

    componentDidUpdate() {
        this.checkAuthAndRedirect();
    }

    checkAuthAndRedirect() {
        if (!this.props.isAuthorized) {
            this.props.history.push('/');
        }
    }

    projectName = () => this.props.project ? this.props.project.name : '';

    onManageTags = () => this.props.history.push('/manageTags');

    onManageMembers = () => this.props.history.push('/manageMembers');

    canManageTags = () => this.props.project ? this.props.project._links.manageTags != null : false;

    canManageMembers = () => this.props.project ? this.props.project._links.manageMembers != null : false;

    render() {
        const manageTagsAction = this.canManageTags() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onManageTags}>Manage tags</Button>
                </Col>
            </Row>
        ) : '';

        const manageMembersAction = this.canManageMembers() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onManageMembers}>Manage members</Button>
                </Col>
            </Row>
        ) : '';


        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>{this.projectName()}</h2>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        {manageTagsAction}
                        {manageMembersAction}
                        <Link to='projects'>Go back</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    project: state.currentProject
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);