import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    FormGroup,
    Input,
    Container,
    FormFeedback
} from "reactstrap";
import {closeAssignDialog, assign} from "../actions/tasks_actions";
import {load} from "../actions/manage_members_actions";

class AssignTaskDialog extends Component {

    state = {
        memberId: '',
        isInvalid: false
    };

    componentDidMount() {
        this.checkAndLoadMembers();
    }

    componentDidUpdate() {
        this.checkAndLoadMembers();
    }

    checkAndLoadMembers = () => {
        if (!this.props.members && this.props.project) {
            this.props.loadMembers(this.props.project);
        }
    };

    taskName = () => this.props.selected ? this.props.selected.name : '';

    membersList = () => this.props.members ? this.props.members._embedded.projectMembers : null;

    onClose = () => this.props.close();

    onChange = e => this.setState({memberId: e.target.value, isInvalid: false});

    onSave = () => {
        let valid = true;
        if (!this.state.memberId) {
            this.setState({isInvalid: true});
            valid = false;
        }
        if (valid) {
            this.props.assign(this.props.selected, this.state.memberId);
            this.props.close();
        }
    };

    render() {
        const memberList = this.membersList() ? (
            <FormGroup>
                <Input id="member"
                       type="select"
                       value={this.state.memberId}
                       invalid={this.state.isInvalid}
                       onChange={this.onChange}>
                    <option/>
                    {this.membersList().map(member => (
                        <option value={member.id} key={member.id}>{member.account.fullName}</option>
                    ))}
                </Input>
                <FormFeedback>You must select a member</FormFeedback>
            </FormGroup>
        ) : <Container>'Loading...'</Container>;

        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Assign task</ModalHeader>
                <ModalBody>
                    <Container>
                        <p>Task: {this.taskName()}</p>
                    </Container>
                    <Container className='mt-3'>
                        {memberList}
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject,
    selected: state.tasks.selected,
    isOpen: state.tasks.assignDialog.isOpen,
    members: state.membersManagement.members
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        close: closeAssignDialog,
        loadMembers: load,
        assign
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AssignTaskDialog);