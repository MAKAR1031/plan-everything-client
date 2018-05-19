import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class Search extends Component {

    onSearch = e => this.props.onSearchHandler(e);

    render() {
        const placeholder = this.props.placeholder ? this.props.placeholder : '';

        return (
            <InputGroup className='mb-4'>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <FontAwesome name='search'/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder={placeholder}
                    value={this.props.query}
                    onChange={this.onSearch}/>
            </InputGroup>
        );
    }
}

Search.propTypes = {
    placeholder: PropTypes.string,
    query: PropTypes.string.isRequired,
    onSearchHandler: PropTypes.func.isRequired
};

export default Search;