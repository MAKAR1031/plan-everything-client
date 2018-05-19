import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge, Card, CardBody, Col, Collapse, Input, Row} from "reactstrap";
import Markdown from 'react-markdown';

class TaskStep extends Component {

    state = {
        showReport: false
    };

    hasReport = () => this.props.step.report != null;

    canComplete = () => this.props.step._links.complete != null;

    onComplete = () => this.props.onCompleteHandler(this.props.step);

    onReportToggle = () => this.setState(({showReport}) => ({showReport: !showReport}));

    render() {
        const reportBadge = this.hasReport() ? (
            <Badge color="info">has report</Badge>
        ) : '';

        const reportBlock = this.hasReport() ? (
            <Collapse isOpen={this.state.showReport}>
                <Card>
                    <CardBody>
                        <Markdown source={this.props.step.report}/>
                    </CardBody>
                </Card>
            </Collapse>
        ) : '';

        return (
            <Row key={this.props.step.name} className='pl-3 mb-2' onClick={this.onReportToggle}>
                <Col>
                    <Input
                        type='checkbox'
                        checked={this.props.step.completed}
                        disabled={this.props.step.completed || !this.canComplete()}
                        onChange={this.onComplete}/>
                    <h6 className={'step-item' + (this.hasReport() ? ' with-report' : '')}>
                        {this.props.step.name} {reportBadge}
                    </h6>
                    {reportBlock}
                </Col>
            </Row>
        )
    }
}

TaskStep.propTypes = {
    step: PropTypes.object.isRequired,
    onCompleteHandler: PropTypes.func.isRequired
};

export default TaskStep;