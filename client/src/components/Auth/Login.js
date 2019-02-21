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

    userAuthenetication = async (e, authUser) => {
        e.preventDefault();

        const user = await authUser(); 

        localStorage.setItem('token', user.data.authUser.token);

        await this.props.refetch();

        this.cleanState();

        setTimeout(() => {
            this.props.history.push('/panel');
        }, 3000);


     }

     validateForm = () => {
        const {user, password} = this.state;
        const notValid = !user || !password;

        // console.log(notValid);
        return notValid;
     }
    render() { 

        const {user, password} = this.state;
        const { refetch } = this.props
      
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
                                onSubmit={ e => this.userAuthenetication(e, authUser)} 
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