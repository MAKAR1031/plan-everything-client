import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

class NewTaskPage extends Component {

    projectName = () => this.props.project ? this.props.project.name : '';

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>New task</h2>
                        <Container>New task page</Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>
                                <p>Project name: {this.projectName()}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to='project'>Go back</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskPage);