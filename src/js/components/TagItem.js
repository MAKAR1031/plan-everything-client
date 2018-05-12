import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, Col, Row} from "reactstrap";

class TagItem extends Component {

    onClick = () => this.props.onClickHandler(this.props.tag);

    itemStyle = () => ({
        backgroundColor: '#' + this.props.tag.color,
        borderRadius: '50%',
        width: '20px',
        height: '20px',
    });

    render() {
        return (
            <Card onClick={this.onClick} className='mb-2 selectable-item'>
                <CardBody className='pb-1 pt-1 pr-3'>
                    <Row>
                        <Col sm={8}>{this.props.tag.name}</Col>
                        <Col className='d-flex justify-content-end flex-row align-items-center'>
                            <div style={this.itemStyle()}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

TagItem.propTypes = {
    tag: PropTypes.object.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export default TagItem;