import mongoose from 'mongoose'; 
import { Clients, Products } from './db'
import { rejects, throws } from 'assert';


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
        },
        getProducts : (root, {limit, offset}) => { 
            return Products.find({}).limit(limit).skip(offset); 
        },
        getProduct : (root, {id}) =>  {
            return new Promise((resolve, object) => {
                Products.findById(id, (err, product) => { 
                    if(err) rejects(err);
                    else resolve(product); 
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
        },
        createProduct : (root, {input}) => {
            const createProduct = new Products({
                name: input.name,
                price: input.price, 
                stock: input.stock
            });

            createProduct.id = createProduct._id
            
            // We put our new object in our promise 
            return new Promise((resolve, object) => { 
                createProduct.save((err) =>  {
                    if(err) rejects(err);
                    else resolve(createProduct); 
                })
            });
        },
        updateProduct : (root, {input}) => { 
            return new Promise((resolve, product) => { 
                Products.findOneAndUpdate({_id: input.id}, input, {new: true}, (err, product) => {
                    if(err) rejects(err); 
                    else resolve(product)
                });
            })
        },
        deleteProduct : (root, {id}) => { 
            return new Promise((resolve, object) =>  { 
                Products.findOneAndRemove({_id: id}, (err) => { 
                    if(err) rejects(err); 
                    else resolve("Product deleted")
                })
            })
        },
    },
}
