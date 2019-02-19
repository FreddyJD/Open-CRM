import mongoose from 'mongoose'; 
import { Clients } from './db'
import { rejects } from 'assert';


export const resolvers = {
    Query: {
        getClients: (root, {limit, offset}) => {
            return Clients.find({}).limit(limit).skip(offset)
        },
        getClient: (root, { id }) => {
            return new Promise((resolve, object) => {
                Clients.findById(id, (err, client) => { 
                    if(err) rejects(err); 
                    else resolve(client); 
                });
            }); 
        },
        totalClients: (root) => {
            return new Promise((resolve, object) => {
                Clients.countDocuments({},(err, count) => { 
                    if(err) rejects(err)
                    else resolve(count)
                })
            })
        }
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
