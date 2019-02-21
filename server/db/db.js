import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';


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

const Orders =  mongoose.model('Orders', ordersSchema);

// User authentication
const userSchema = new mongoose.Schema({
    user: String,
    password: String
});

// We want to hash the password before we save it in our database
userSchema.pre('save', function(next){
    // If the password is already hashed - go to next function 
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
})

const Users = mongoose.model('users', userSchema);


export { Clients, Products, Orders, Users }; 
