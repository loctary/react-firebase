import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
// HOCs
import { withFirebase } from '../../../../components/Firebase';
// consts
import * as ROUTES from '../../../../consts/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      state: { email, passwordOne },
      props: { firebase, history },
    } = this;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
        <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
        <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignUpForm.propTypes = {
  firebase: PropTypes.shape({
    doCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  withFirebase
)(SignUpForm);
