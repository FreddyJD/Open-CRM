import mongoose from 'mongoose'; 
import { Clients } from './db'
import { rejects } from 'assert';


class Client { 
    constructor(id, {name, lastname, company, emails, age, type, orders}){
        this.id = id; 
        this.name = name;
        this.lastname = lastname; 
        this.company = company;
        this.age = age; 
        this.type = type;
        this.orders = orders; 
        this.emails = emails; 
    }
}


export const resolvers = {
    Query: {
        getClients: (root, {limit}) => {
            return Clients.find({}).limit(limit)
        },
        getClient: (root, { id }) => {
            return new Promise((resolve, object) => {
                Clients.findById(id, (err, client) => { 
                    if(err) rejects(err); 
                    else resolve(client); 
                });
            }); 
        },
    },
    Mutation: {
        createClient : (root, {input}) => {
            const newClient = new Clients({
                name: input.name,
                lastname: input.lastname,
                company: input.company,
                age: input.age,
                type: input.type,
                orders: input.orders,
                emails: input.emails,
            }) 

            newClient.id = newClient._id; 

            return new Promise((resolve, object) => {
                newClient.save((err) => {
                    if(err) rejects(err);
                    else resolve(newClient); 
                });
            })
        },
        updateClient : (root, {input}) => { 
            return new Promise((resolve, object) => { 
                Clients.findOneAndUpdate({_id : input.id},  input, {new: true}, (err, client) => {
                    if(err) rejects (err);
                    else resolve(client); 
                });
            });
            
        },
        deleteClient : (root, {id}) => { 
            return new Promise((resolve, object) =>  { 
                Clients.findOneAndRemove({_id: id}, (err) => { 
                    if(err) rejects(err); 
                    else resolve("User deleted")
                })
            })
        }
    },
}
