import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadProgress} from "../actions/projects_actions";
import {Col, Progress, Row} from "reactstrap";

class ProjectProgress extends Component {
    componentDidMount() {
        this.checkAndLoadData();
    }

    componentDidUpdate() {
        this.checkAndLoadData();
    }

    checkAndLoadData = () => {
        if (this.props.selected && !this.props.progress) {
            this.props.loadProgress(this.props.selected);
        }
    };

    completed = () => this.props.progress ? this.props.progress.completedSteps : 0;

    total = () => this.props.progress ? this.props.progress.totalSteps : 0;

    color = () => {
        if (this.completed() === this.total() && this.total() !== 0) {
            return 'success'
        } else {
            return 'primary'
        }
    };

    render() {
        return(
            <Row className='mb-3'>
                <Col>
                    <h5>Project progress</h5>
                    <Progress value={this.completed()} max={this.total()} color={this.color()}>
                        {this.completed()} / {this.total()}
                    </Progress>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    selected: state.currentProject,
    progress: state.projectProgress
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadProgress},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProgress);