import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#"><h2>Plan everything</h2></a>
            </nav>
        )
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Header);