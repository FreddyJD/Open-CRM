import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clients', {useNewUrlParser: true});

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

export { Clients }; 
