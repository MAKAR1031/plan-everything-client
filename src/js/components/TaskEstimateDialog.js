import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {closeEstimateDialog, estimateTask, loadCriteria} from '../actions/tasks_actions';
import {Button, Container, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import sort from '../util/sort_by_order';
import EstimateCriterionItem from './EstimateCriterionItem';

class TaskEstimateDialog extends Component {

    state = {
        init: false
    };

    componentDidMount() {
        this.initDialog();
    }

    componentDidUpdate() {
        this.initDialog();
    }

    initDialog = () => {
        if (!this.props.criteria && this.props.selected) {
            this.props.loadCriteria(this.props.selected);
        } else if (!this.state.init) {
            this.setState({
                init: true,
                criteria: this.criteriaList().map(c => ({
                    ...c,
                    actualValue: {
                        value: '',
                        isInvalid: false
                    }
                }))
            });
        }
    };

    criteriaList = () => this.props.criteria ? this.props.criteria._embedded.criteria.sort(sort) : [];

    onClose = () => this.props.close();

    onChangeCriterion = (index, criterion) => {
        this.setState(({criteria}) => ({
            criteria: criteria.map((c, i) => i === index ? criterion : c)
        }));
    };

    onSave = () => {
        let valid = true;

        const criteria = this.state.criteria.map(criterion => {
            const invalidActualValue = criterion.actualValue.value == null || criterion.actualValue.value <= 0;
            if (!invalidActualValue) {
                return criterion;
            }
            valid = false;
            return {
                ...criterion,
                actualValue: {
                    ...criterion.actualValue,
                    isInvalid: invalidActualValue
                }
            };
        });
        this.setState({criteria});

        if (valid) {
            this.props.estimateTask(this.props.selected, criteria);
        }
    };

    render() {
        const list = this.state.criteria ? this.state.criteria.map((c, i) => (
            <EstimateCriterionItem index={i} key={i} criterion={c} criterionChangeHandler={this.onChangeCriterion}/>
        )) : <Container>Loading...</Container>;

        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Estimate task</ModalHeader>
                <ModalBody>
                    {list}
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    selected: state.tasks.selected,
    criteria: state.tasks.criteria,
    isOpen: state.tasks.estimateDialog.isOpen
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        loadCriteria,
        estimateTask,
        close: closeEstimateDialog
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskEstimateDialog);