import React, { Component } from 'react';
import {UPDATE_CLIENT} from '../queries/mutations';
import { Mutation } from 'react-apollo'; 


class FormEditClient extends Component {

    state =  {
        client: this.props.client,
        emails: this.props.client.emails,
    }

    newCamp = () => {
        this.setState({
            emails: this.state.emails.concat([{email:''}])
        })
    }

    readCamp = i => e => {
        const newEmail = this.state.emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        this.setState({ emails: newEmail });
    }

    removeCamp = i => () => {
        this.setState({
            emails: this.state.emails.filter((s, index) => i !== index)
        });
    }



    render() { 
        const {name, lastname, company, age, type} = this.state.client

            const {emails} = this.state;
           
            return (
                <Mutation mutation={UPDATE_CLIENT}
                onCompleted={ () => this.props.history.push('/')}
                >

                {updateThisClient => (

                   <form className="col-md-8 m-3" onSubmit={e => {
                       e.preventDefault();

                       const { name, lastname, company, age, type, id } = this.state.client
                       const {emails} = this.state; 
                       
                       const input = { 
                           id,
                           name,
                           lastname,
                           company,
                           type,
                           age
                       }
                       updateThisClient({
                           variables: {input}
                       })
                   }}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Name </label>
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={name}
                                        onChange={e => {
                                            this.setState({

                                                client: {
                                                ...this.state.client,
                                                name: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={lastname}
                                        onChange={e => {
                                            this.setState({

                                                client: {
                                                ...this.state.client,
                                                lastname: e.target.value
                                                }
                                            })
                                        }}

                                     />
                                </div>
                            </div>
                          
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Company </label>
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={company}
                                        onChange={e => {
                                            this.setState({

                                                client: {
                                                ...this.state.client,
                                                company: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>

                                {emails.map((input, index) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label>Email {index + 1} : </label>
                                        <div className="input-group">
                                        
                                            <input 
                                                type="email"
                                                placeholder={`Email`}
                                                className="form-control" 
                                                onChange={this.readCamp(index)}
                                                defaultValue={input.email}
                                            />
                                            <div className="input-group-append">
                                                <button 
                                                    className="btn btn-danger" 
                                                    type="button" 
                                                    onClick={this.removeCamp(index)}> 
                                                    &times; Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button 
                                        onClick={this.newCamp}
                                        type="button" 
                                        className="btn btn-warning"
                                    >+ Add Email</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Age</label>
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={age}
                                        onChange={e => {
                                            this.setState({

                                                client: {
                                                ...this.state.client,
                                                age: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Type of Client </label>  
                                    <select 
                                        className="form-control"
                                        value={type}
                                        onChange={e => {
                                            this.setState({

                                                client: {
                                                ...this.state.client,
                                                type: e.target.value
                                                }
                                            })
                                        }}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASIC">BASIC</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                        </form>
                        )}
                </Mutation>
            )      
    }
}
 

export default FormEditClient;