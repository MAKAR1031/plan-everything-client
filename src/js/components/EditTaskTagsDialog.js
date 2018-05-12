import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {closeEditTagsDialog as close, loadTags, updateTags} from "../actions/tasks_actions";
import {load as loadAllTags} from "../actions/manage_tags_actions";
import TagItem from './TagItem';

class EditTaskTagsDialog extends Component {

    state = {
        init: false,
        availableTags: [],
        currentTags: []
    };

    componentDidMount() {
        this.checkAndLoadData();
    }

    componentDidUpdate() {
        this.checkAndLoadData();
    }

    checkAndLoadData() {
        if (!this.props.allTags && this.props.project) {
            this.props.loadAllTags(this.props.project);
        }
        if (!this.props.tags && this.props.selected) {
            this.props.loadTags(this.props.selected);
        }
        if (this.props.tags && this.props.allTags && this.props.isOpen && !this.state.init) {
            const currentTags = this.props.tags._embedded.tags;
            const availableTags = this.props.allTags._embedded.tags.filter(t => currentTags.every(ct =>
                ct._links.self.href !== t._links.self.href));
            this.setState({
                init: true,
                currentTags,
                availableTags
            });
        }
    }

    onClose = () => this.props.close();

    onMoveToCurrent = (tag) => {
        const availableTags = this.state.availableTags.filter(t => t._links.self.href !== tag._links.self.href);
        const currentTags = [...this.state.currentTags, tag];
        this.setState({availableTags, currentTags});
    };

    onMoveToAvailable = (tag) => {
        const availableTags = [...this.state.availableTags, tag];
        const currentTags = this.state.currentTags.filter(t => t._links.self.href !== tag._links.self.href);
        this.setState({availableTags, currentTags});
    };

    onSave = () => this.props.updateTags(this.props.selected, this.state.currentTags);

    render() {
        const availableList = this.state.availableTags.map(tag =>
            <TagItem tag={tag} key={tag._links.self.href} onClickHandler={this.onMoveToCurrent}/>
        );

        const currentList = this.state.currentTags.map(tag =>
            <TagItem tag={tag} key={tag._links.self.href} onClickHandler={this.onMoveToAvailable}/>
        );

        return (
            <Modal isOpen={this.props.isOpen} fade={true} size='lg'>
                <ModalHeader toggle={this.onClose}>Edit tags</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <h4 className='mb-3'>Available tags</h4>
                            <Container className='tags-container'>
                                {availableList}
                            </Container>
                        </Col>
                        <Col>
                            <h4 className='mb-3'>Task tags</h4>
                            <Container className='tags-container'>
                                {currentList}
                            </Container>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.tasks.editTagsDialog.isOpen,
    project: state.currentProject,
    selected: state.tasks.selected,
    tags: state.tasks.tags,
    allTags: state.tagsManagement.tags
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {close, updateTags, loadTags, loadAllTags},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskTagsDialog);