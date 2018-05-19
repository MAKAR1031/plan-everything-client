import React, {Component, Fragment} from 'react';
import FontAwesome from 'react-fontawesome';
import {Tooltip} from "reactstrap";

export default class MarkdownSupport extends Component {

    state = {
        isOpen: false
    };

    linkUrl = () => 'https://guides.github.com/features/mastering-markdown/';

    onToggle = () => this.setState(({isOpen}) => ({isOpen: !isOpen}));

    render() {
        return (
            <Fragment>
                <FontAwesome id='pencil-icon' name='pencil' onClick={this.onToggle}/>
                <Tooltip target="pencil-icon"
                         placement="bottom"
                         autohide={false}
                         isOpen={this.state.isOpen}
                         toggle={this.onToggle}>
                    This field supports <a target="_blank" href={this.linkUrl()}>markdown</a>
                </Tooltip>
            </Fragment>
        );
    }
}
