import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";

class ManageMembersPage extends Component {
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>Manage members</h2>
                        <p>Manage members page</p>
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

});

const mapDispatchToProps = dispatch => bindActionCreators(
    {},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageMembersPage);