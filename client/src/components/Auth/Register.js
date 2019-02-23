import React, { Component } from 'react';
import {Mutation } from 'react-apollo';
import {CREATE_USER} from '../../queries/mutations'
import Error from '../Alerts/Error'

import { withRouter, Redirect} from 'react-router-dom'

const initialState = {
    user: '',
    password: '',
    repeatPassword: '',
    name: '',
    rol: '',
}

class Register extends Component {
    state = {
        ...initialState

    }

    updateState = e => {
        const {name, value} = e.target;

        this.setState({
            [name] : value
        })

    }
    validateForm = () => {
        const {user, password, repeatPassword, rol, name} = this.state;

        const notValid = !user || !password || !name || !rol || password !== repeatPassword

        return notValid
    }
    cleanState = () => {
        this.setState({...initialState});
    }

    createRegister = async (e, createUser) => {
        e.preventDefault();

        
        let data = await createUser(); 

        if(data) {
            this.cleanState();
            this.props.history.push('/')
        } else { 
            return null 
        }
        

        
    }
  render() {

    const {user, password, repeatPassword, name, rol} = this.state;
    const userRol = this.props.session.getUser.rol;

    console.log(userRol);

    const protectRoute = (userRol !== "ADMIN") ? <Redirect to="/clients" /> : "";

    return (
        <>
        {protectRoute}
        <h1 className="text-center mb-5"> New User </h1>
<div className="row  justify-content-center">

<Mutation 
mutation={CREATE_USER}
variables={{user, password, name, rol}}
>

{(createUser, {loading, error, data}) => {
    return (
    <form onSubmit={e => this.createRegister(e, createUser)}
        className="col-md-8"
    >
        {error && <Error error={error} />}

        <div className="form-row">
            <div className="col-md-6">
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
            <small className="text-muted">No special characters.</small>
                </div>

            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="Lastname, Name" 
                        onChange={this.updateState}
                        value={this.state.name}
                    />
                    <small className="text-muted">Enter their full name.</small>
                </div>

            </div>
        </div>
        <br />

            <div className="form-row">
                <div className="col-md-6">
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

                </div>
                <div className="col-md-6">
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
                    
                </div>
                <small className="text-muted">* Password Encryption and Hashing is based of Blowfish cipher. 184 bit.</small>
                
            </div>
        <br />

        <div className="form-group">
            <label>Rol: </label>

            <select className="form-control"
            value={this.state.rol}
            name="rol"
            onChange={this.updateState}
            >
                <option value="">Choose... </option>
                <option value="ADMIN">ADMIN</option>
                <option value="SELLER">SELLER</option>
            </select>
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