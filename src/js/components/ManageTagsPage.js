import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Container, Row} from 'reactstrap';
import {Link} from "react-router-dom";

class ManageTagsPage extends Component {
    render() {
        return(
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>Manage tags</h2>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Link to='/project'>Go back</Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    project: state.currentProject
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageTagsPage);