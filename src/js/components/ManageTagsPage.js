import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Container, Row, Button, Card, CardBody} from 'reactstrap';
import {Link} from "react-router-dom";
import {load, select, openNewDialog, openEditDialog, deleteTag} from "../actions/manage_tags_actions";
import TagDialog from './TagDialog';

class ManageTagsPage extends Component {

    componentDidUpdate() {
        this.onComponentUpdate();
    }

    componentDidMount() {
        this.onComponentUpdate();
    }

    onComponentUpdate = () => {
        if (!this.props.isAuthorized) {
            this.props.history.push('/');
        }
        if (!this.props.tags && this.props.project) {
            this.props.load(this.props.project);
        }
    };

    projectName = () => this.props.project ? this.props.project.name : 'Loading...';

    tagsList = () => this.props.tags ? this.props.tags._embedded.tags : null;

    onSelect = (tag) => this.props.select(tag);

    onAdd = () => this.props.openNewDialog();

    onEdit = () => this.props.openEditDialog();

    onDelete = () => this.props.deleteTag(this.props.selected);

    render() {
        const list = this.tagsList() ? this.tagsList().map(tag => (
            <Card className='selectable-item mb-3' key={tag.name} onClick={() => this.onSelect(tag)}>
                <CardBody>
                    <Row>
                        <Col>{tag.name}</Col>
                        <Col>{tag.color}</Col>
                    </Row>
                </CardBody>
            </Card>
        )) : (
            <Container>Loading...</Container>
        );

        const editButton = this.props.selected ? (
                <Row>
                    <Col>
                        <Button color='primary' onClick={this.onEdit}>Edit tag</Button>
                    </Col>
                </Row>
        ) : '';

        const deleteButton = this.props.selected ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onDelete}>Delete tag</Button>
                </Col>
            </Row>
        ) : '';

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>Manage tags</h2>
                        {list}
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>
                                Project name: {this.projectName()}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color='primary' onClick={this.onAdd}>Add tag</Button>
                            </Col>
                        </Row>
                        {editButton}
                        {deleteButton}
                        <Row>
                            <Col>
                                <Link to='/project'>Go back</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <TagDialog/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    project: state.currentProject,
    tags: state.tagsManagement.tags,
    selected: state.tagsManagement.selected
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, select, openNewDialog, openEditDialog, deleteTag},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageTagsPage);