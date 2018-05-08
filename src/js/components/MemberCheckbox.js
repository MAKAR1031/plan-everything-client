import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Col, Input, Row} from "reactstrap";
import linkUtils from '../util/link-utils';

class MemberCheckbox extends Component {
    state = {
        isChecked: false
    };

    fullName = () => this.props.account.fullName;

    accountLink = () => linkUtils.linkUrl(this.props.account._links.self);

    onChange = () => {
        this.setState(({ isChecked }) => ({isChecked: !isChecked}));
        this.props.onToggleHandler(this.accountLink())
    };

    render() {
        return (
            <Row>
                <Col sm={10}>{this.fullName()}</Col>
                <Col sm={2}>
                    <Input type='checkbox'
                           checked={this.state.isChecked}
                           onChange={this.onChange}/>
                </Col>
            </Row>
        );
    }
}

MemberCheckbox.propTypes = {
    account: PropTypes.object.isRequired,
    onToggleHandler: PropTypes.func.isRequired
};

export default MemberCheckbox;