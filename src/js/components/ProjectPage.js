import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'reactstrap';

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

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>{this.projectName()}</h2>
                    </Col>
                    <Col sm={2} className='right-menu'/>
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