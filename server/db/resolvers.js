import mongoose from 'mongoose'; 
import { Clients, Products, Orders, Users } from './db';
import { rejects, throws } from 'assert';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

import jwt from 'jsonwebtoken';

const createToken = (userlog, secret, expiresIn) => {

    const {user} = userlog; 

    return jwt.sign({user}, secret, {expiresIn})
}


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
        getProducts : (root, {limit, offset, stock}) => {
            let filter; 
            if(stock) {
                filter= { stock: {$gt: 0}}
            } 
            return Products.find(filter).limit(limit).skip(offset); 
        },
        getProduct : (root, {id}) =>  {
            return new Promise((resolve, object) => {
                Products.findById(id, (err, product) => { 
                    if(err) rejects(err);
                    else resolve(product); 
                })
            })
        },
        totalProducts: (root) => {
            return new Promise((resolve, object) => {
                Products.countDocuments({},(err, count) => { 
                    if(err) rejects(err)
                    else resolve(count)
                })
            })
        },
        getOrders: (root, {client}) => { 
            return new Promise((resolve, object) => {
                Orders.find({client: client}, (err, order) => { 
                    if(err) rejects(err);
                    else resolve(order) 
                })
            })
        },
        topClients : (root) => {
            return new Promise((resolve, rejects) => { 
                Orders.aggregate([
                    {
                        $match : { status : "COMPLETED" }
                    },
                    {
                        $group : {
                            _id : "$client",
                            total: { $sum : "$total" }
                        }
                    },
                    {
                        $lookup : {
                            from: "clients",
                            localField : '_id',
                            foreignField: '_id',
                            as : 'client'
                        }
                    }, 
                    {
                        $sort : {total : -1} 
                    },
                    {
                        $limit: 10
                    }
                ], (err, results) => {
                    if(err) rejects(err);
                    else resolve(results);
                });
            })
        },
        getUser : async (root, args, {getUser}) => {
            if(!getUser) {
                return null;
            }

            // Get the from the req. JWT verified
            const user = await Users.findOne({user: getUser.user});
            console.log(user)
            return user;
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
        createOrder : (root, {input}) => { 
            const createOrder = new Orders({
                order: input.order,
                total: input.total,
                date: input.date,
                client: input.client,
                status: "PENDING"

            });
            createOrder.id = createOrder._id;

            return new Promise((resolve, object) => {
                
                // Loop over the Orders and update it 
                input.order.forEach(order => {
                    // We have to take the value from the Products and reduce it from there
                    Products.updateOne({_id : order.id}, 
                        { "$inc" : 
                            { "stock": -order.quantity }
                        }, function(err) {
                            if(err) return new Error(err)
                        }
                    )
                });

                createOrder.save((err) => {
                    if(err) rejects(err);
                    else resolve(createOrder);
                })
            });
        },
        updateStatus : (root, {input}) => { 

            const { status } = input 

            let instruction;
            if(status === 'COMPLETED') {
                instruction = '-'
            }
            else if (status === 'CANCELLED') {
                instruction = '+'
            }
            else if (status === 'PENDING') {
                instruction = '+'
            }

            input.order.forEach(order => {
                // We have to take the value from the Products and reduce it from there
                Products.updateOne({_id : order.id}, 
                    { "$inc" : 
                        { "stock": `${instruction}${order.quantity}` }
                    }, function(err) {
                        if(err) return new Error(err)
                    }
                )
            });


            return new Promise((resolve, object) => {
                Orders.findOneAndUpdate({
                    _id : input.id
                }, input, {new: true}, (err) => {
                    if(err) rejects(err);
                    else resolve('Updated')
                })
            })
        },
        createUser : async(root, {user, password}) => { 
            // Check if a user have this password 
            const userExist = await Users.findOne({user});

            if(userExist) {
                throw new Error('Username already registed')
            }


            const newUser = await new Users({
                user,
                password
            }).save();



            return "Created user"
        },
        authUser : async(root, {user, password}) => { 
            const nameOfUser = await Users.findOne({user}); 
            if(!nameOfUser) {
                throw new Error('User not found');
            }
            const passwordCorrect = await bcrypt.compare(password, nameOfUser.password);

            // If the password is wrong 
            if(!passwordCorrect){
                throw new Error('Incorrect password')
            } 
                return{
                    token: createToken(nameOfUser, process.env.SECRET, '10hr')
                }
                
        

        }
    }
}
