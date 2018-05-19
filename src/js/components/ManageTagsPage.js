import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Card, CardBody, Col, Container, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import {deleteTag, load, openEditDialog, openNewDialog, select} from "../actions/manage_tags_actions";
import TagDialog from './TagDialog';
import alertify from 'alertify.js';
import Search from "./Search";

class ManageTagsPage extends Component {

    state = {
        search: ''
    };

    componentDidUpdate() {
        this.checkAndLoadTags();
    }

    componentDidMount() {
        this.checkAndLoadTags();
    }

    checkAndLoadTags = () => {
        if (!this.props.tags && this.props.project) {
            this.props.load(this.props.project);
        }
    };

    projectName = () => this.props.project ? this.props.project.name : 'Loading...';

    tagsList = () => this.props.tags ? (
        this.state.search ?
            this.props.tags._embedded.tags.filter(t => t.name.includes(this.state.search)) :
            this.props.tags._embedded.tags
    ) : null;

    isCurrent = (tag) => this.props.selected ? this.props.selected._links.self.href === tag._links.self.href : false;

    isSelected = () => this.props.selected != null;

    onSearch = e => this.setState({search: e.target.value});

    onSelect = (tag) => this.props.select(tag);

    onAdd = () => this.props.openNewDialog();

    onEdit = () => this.props.openEditDialog();

    onDelete = () => {
        const tag = this.props.selected;
        alertify
            .okBtn("Yes")
            .cancelBtn("No")
            .confirm(`Delete '${tag.name}' tag?`,
                () => this.props.deleteTag(tag));
    };

    itemStyle = (tag) => ({
        backgroundColor: '#' + tag.color,
        borderRadius: '50%',
        width: '25px',
        height: '25px',
    });

    render() {
        const list = this.tagsList() ? this.tagsList().map(tag => (
            <Card className={'selectable-item mb-3' + (this.isCurrent(tag) ? ' selected' : '')}
                  key={tag.name} onClick={() => this.onSelect(tag)}>
                <CardBody>
                    <Row>
                        <Col sm={1} className='d-flex justify-content-center flex-row align-items-center'>
                            <div style={this.itemStyle(tag)}/>
                        </Col>
                        <Col>{tag.name}</Col>
                    </Row>
                </CardBody>
            </Card>
        )) : (
            <Container>Loading...</Container>
        );

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>Manage tags</h2>
                            <Search placeholder='Search tags...'
                                    query={this.state.search}
                                    onSearchHandler={this.onSearch}/>
                            {list}
                        </Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Container className='info-container'>
                            <Row>
                                <Col>Project name: {this.projectName()}</Col>
                            </Row>
                        </Container>
                        <Container className='actions-container'>
                            <Row>
                                <Col>
                                    <Button color='primary' onClick={this.onAdd}>Add tag</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.isSelected()}
                                            onClick={this.onEdit}>
                                        Edit tag
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.isSelected()}
                                            onClick={this.onDelete}>
                                        Delete tag
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to='/project'>Go back</Link>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <TagDialog/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject,
    tags: state.tagsManagement.tags,
    selected: state.tagsManagement.selected
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, select, openNewDialog, openEditDialog, deleteTag},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageTagsPage);