import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import {connect} from "react-redux";

class Header extends Component {

    constructor(props, context) {
        super(props, context);

        this.isLoggedIn = this.props.isLoggedIn || false;

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.history.push('/');
        this.props.dispatchLogout();
    }

    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={this.props.isLoggedIn ? '/default' : '/'}>My Awesome App</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                { this.props.isLoggedIn &&
                <Navbar.Text>
                    Signed in as: <Navbar.Link onClick={this.logout}>Admin</Navbar.Link>
                </Navbar.Text>}
                <Nav pullRight>
                    { !this.props.isLoggedIn &&
                    <NavItem eventKey={1}>
                        <Link to='/'>
                            Login
                        </Link>
                    </NavItem>}
                    <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}><Link to='/data-gen'>Data Generation</Link></MenuItem>
                        <MenuItem eventKey={3.2}><Link to='/aggreg'>Aggregation Time</Link></MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogout : () => dispatch({
            type : 'SET_LOGGED_OUT'
        })
    }
};

Header = withRouter(Header)

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Header);