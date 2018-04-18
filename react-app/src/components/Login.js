import React, { Component } from "react";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Grid, Row, Col} from 'react-bootstrap'

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isCorrectPassword = this.isCorrectPassword.bind(this);
        this.isCorrectUsername = this.isCorrectUsername.bind(this);

        props.dispatchUser();

        this.state = {
            correctPassword: null,
            correctUsername: null,
            username: '',
            password: ''
        };
    }

    getValidationState() {
        if(this.state.correctPassword === 'error') {
            return 'error';
        }
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value, correctUsername: null});
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value, correctPassword: null});
    }

    handleSubmit(event) {
        if(!this.isCorrectPassword() || !this.isCorrectUsername()) {
            event.preventDefault();
            this.setState ({ correctPassword: 'error', correctUsername: 'error'});
            return;
        }

        event.preventDefault();
        fetch('http://localhost:3000/conn', {
            method: 'get',
            headers: new Headers({
                "Accept": 'application/json'
            })
           })
            .then(response => response.json())
            .then((data) => {
                if( data !== null && data.connected) {
                    this.props.history.push('/default');
                    this.props.dispatchLogin();
                } else {
                    event.preventDefault();
                }
            });
    }

    isCorrectPassword() {
        return this.props.userCredentials.password === this.state.password;
    }

    isCorrectUsername() {
        return this.props.userCredentials.username === this.state.username;
    }

    render() {
        return <Grid>
            <Row>
                <Col sm={8} md={6} smOffset={2} mdOffset={3}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formControlsUsername" validationState={this.state.correctUsername}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                            <FormControl.Feedback />
                            {this.state.correctUsername && <HelpBlock>Incorrect username.</HelpBlock>}
                        </FormGroup>
                        <FormGroup controlId="formControlsPassword"
                                   validationState={this.getValidationState()}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" value={this.state.password}
                                         onChange={this.handlePasswordChange}/>
                            <FormControl.Feedback />
                            {this.state.correctPassword && <HelpBlock>Incorrect password.</HelpBlock>}
                        </FormGroup>
                        <Button bsStyle="success" type="submit">Login</Button>
                    </form>
                </Col>
            </Row>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        userCredentials: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser : () => dispatch({
            type : 'GET_ADMIN_USER'
        })
        ,
        dispatchLogin : () => dispatch({
            type : 'SET_LOGGED_IN'
        })
    }
};

Login = withRouter(Login);

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Login);
