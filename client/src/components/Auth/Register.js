import React, { Component } from 'react';
import {Mutation } from 'react-apollo';
import {CREATE_USER} from '../../queries/mutations'
import Error from '../Alerts/Error'

import { withRouter } from 'react-router-dom'

const initialState = {
    user: '',
    password: '',
    repeatPassword: '',
}

class Register extends Component {
    state = {
        ...initialState

    }

    updateState = e => {
        const {name, value} = e.target;
        // console.log(value);
        this.setState({
            [name] : value
        })

    }
    validateForm = () => {
        const {user, password, repeatPassword} = this.state;

        const notValid = !user || !password || password !== repeatPassword

        return notValid
    }
    cleanState = () => {
        this.setState({...initialState});
    }

    createRegister = (e, createUser) => {
        e.preventDefault();
        createUser().then(data => {
            console.log(data);
        })
        this.cleanState();

        //redirect to login
        this.props.history.push('/login')
        
    }
  render() {

    const {user, password} = this.state;

    return (
      <>
        <h1 className="text-center mb-5"> New User </h1>
<div className="row  justify-content-center">

<Mutation 
mutation={CREATE_USER}
variables={{user, password}}
>

{(createUser, {loading, error, data}) => {
    return (
    <form onSubmit={e => this.createRegister(e, createUser)}
        className="col-md-8"
    >
        {error && <Error error={error} />}
            <div className="form-group">
                <label>User</label>
                <input 
                    type="text" 
                    name="user" 
                    className="form-control" 
                    placeholder="Username" 
                    onChange={this.updateState}
                    value={this.state.user}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    placeholder="Password"
                    onChange={this.updateState}
                    value={this.state.password}


                />
            </div>
            <div className="form-group">
                <label>Password Confirm </label>
                <input 
                    type="password" 
                    name="repeatPassword" 
                    className="form-control" 
                    placeholder="Repeat your password" 
                    onChange={this.updateState}
                    value={this.state.repeatPassword}


                />
            </div>

            <button 
            disabled={loading || this.validateForm()}
                type="submit" 
                className="btn btn-success float-right">
                    Create User
            </button>
  </form>

    )
}}

  </Mutation>
  </div>
        
      </>
    )
  }
}

export default withRouter(Register);