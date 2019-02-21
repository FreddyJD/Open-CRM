import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import Error from '../Alerts/Error'

import { Mutation } from 'react-apollo';

import { AUTH_USER } from '../../queries/mutations';

const initialState = {
    user : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     updateState = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    cleanState = () => {
         this.setState({...initialState});
    }

    userLogin = (e, authUser) => {
        e.preventDefault();

        authUser().then(async ({data}) => {

            localStorage.setItem('token', data.authUser.token)

            // TODO : Load query with all the "safe zones" 
            

            this.cleanState();
            
        })

     }

     validateForm = () => {
        const {user, password} = this.state;
        const notValid = !user || !password;

        // console.log(notValid);
        return notValid;
     }
    render() { 

        const {user, password} = this.state;
      
        return ( 
            <Fragment>
                 <h1 className="text-center mb-5">Login</h1>
                <div className="row justify-content-center">

                    <Mutation 
                        mutation={ AUTH_USER }
                        variables={{user, password}}    
                    >
                    {( authUser, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.userLogin(e, authUser) } 
                                className="col-md-8"
                            >

                            {error && <Error error={error} />}
                            

                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    onChange={this.updateState} 
                                    value={user}
                                    type="text" 
                                    name="user" 
                                    className="form-control" 
                                    placeholder="Username" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    onChange={this.updateState} 
                                    value={password}
                                    type="password" 
                                    name="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validateForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Login
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(Login);