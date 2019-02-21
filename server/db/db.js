import mongoose, { mongo } from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clients', {useNewUrlParser: true});

mongoose.set('setFindAndModify', false); 

const clientSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    company: String,
    age: String,
    type: String,
    orders: Array,
    emails: Array,
    
});
const Clients = mongoose.model('client', clientSchema); 


const productSchema = new mongoose.Schema({
    name: String,
    price: Number, 
    stock: Number, 
});
const Products = mongoose.model('Products', productSchema)

// Orders
const ordersSchema = new mongoose.Schema({
    order: Array, 
    total: Number,
    date: String, 
    client: mongoose.Types.ObjectId,
    status: String
});

const Orders =  mongoose.model('Orders', ordersSchema)


export { Clients, Products, Orders }; 
