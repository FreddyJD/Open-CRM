import React, { Component } from 'react'
import { NEW_CLIENT } from '../../queries/mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class NewClient extends Component {
    state = {
      client: {
        name: '',
        lastname: '',
        company: '',
        email: '',
        type: '', 
        age: ''
      },
      error: false,
      emails: []
    }
    newCamp = () => { 
      this.setState({
        emails: this.state.emails.concat([{email: ''}])
      })
    }
    
    readCamp = i => (e) =>  {
      const newEmail = this.state.emails.map((email, index) => {
        if(i !== index) return email;
        return {
          ...email,
          email: e.target.value
        }
      });
      this.setState({
        emails: newEmail
      })
    }

    removeCamp = i => () => {
      this.setState({
        emails: this.state.emails.filter((email, index) => i !== index) 
      })
    }

  render() {

    const idSeller = this.props.session.getUser.id;

    const { error } = this.state
    let errMessage = (error) ? <p className="alert alert-danger p3 text-center">Must fill all filds </p> : '';
    return (
      <>
        <h2 className="text-center">
            New Client
        </h2>
        {errMessage}

        
        <div className="row justify-content-center">
        
        <Mutation 
        mutation={NEW_CLIENT}
        onCompleted={() => this.props.history.push('/clients')}
        >

        { createClient => (

       

      <form className="col-md-8 m-3" 
        onSubmit={ e => {
          e.preventDefault(); 
          const {name, lastname, company, age, type} = this.state.client;

          const { emails } = this.state

          if(name === '' || lastname === '' || company === '' || age === '') {
            this.setState({error: true})
            return;
          }
          this.setState({
            error: false,
          })
          const input = {
              name, 
              lastname,
              company,
              age : Number(age),
              type,
              emails, 
              seller: idSeller,
          }

          createClient({
            variables: {input}
          })
        }}
       
      >
      <div className="form-row">
          <div className="form-group col-md-6">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Name"
                onChange={e => {
                  this.setState(
                    {
                      client: {
                        ...this.state.client,
                        name: e.target.value
                      }
                    }
                  )
                }}
              />
          </div>
          <div className="form-group col-md-6">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Last Name"
                onChange={e => {
                  this.setState(
                    {
                      client: {
                        ...this.state.client,
                        lastname: e.target.value
                      }
                    }
                  )
                }}
              />
          </div>
      </div>
      <div className="form-row">
          <div className="form-group col-md-12">
              <label>Company</label>
              <input type="text" className="form-control" placeholder="Company"
                onChange={e => {
                  this.setState(
                    {
                      client: {
                        ...this.state.client,
                        company: e.target.value
                      }
                    }
                  )
                }}
              />
          </div>
      </div>


      {this.state.emails.map((input, index) => (
        <div key={index} className="form-group col-md-12">
          <label>Email #{index}</label>

          <div className="input-group">
          <input 
            onChange={this.readCamp(index)}
            type="email"
            placeholder="Email"
            className="form-control"
          />
          <div className="input-group-append">
            <button
            onClick={this.removeCamp(index)}
            type="button"
            className="btn btn-danger"
            > &times; Delete </button>
          </div>


          </div>
        </div>
      ))}

      <div className="form-group d-flex justify-content-center col-md-12">
                <button
                onClick={this.newCamp}
                type="button"
                className="btn btn-warning"
                >
                + Add email
                </button>

      </div>

      <div className="form-row">
          <div className="form-group col-md-6">
              <label>Age</label>
              <input type="text" className="form-control" placeholder="Age"
                                onChange={e => {
                  this.setState(
                    {
                      client: {
                        ...this.state.client,
                        age: e.target.value
                      }
                    }
                  )
                }}
              />
          </div>
          <div className="form-group col-md-6">
              <label>Type of the Client</label>  
              <select 
                  onChange={e => {
                  this.setState(
                    {
                      client: {
                        ...this.state.client,
                        type: e.target.value
                      }
                    }
                  )
                }}
              
              className="form-control">
                  <option value="">Choose...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASIC">BASIC</option>
              </select>
          </div>
      </div>
      <button type="submit" className="btn btn-success float-right">Save Client</button>
      </form>
      )}
      </Mutation>
        </div>
    </>
    )
  }
}

export default withRouter(NewClient);