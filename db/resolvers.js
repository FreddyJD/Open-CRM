
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

const ClientDB = {}; 


export const resolvers = {
    Query: {
        getClient: ({id}) => {
            return new Client(id, ClientDB[id]); 
        },
    },
    Mutation: {

    createClient : ({input}) => {
        const id = require('crypto').randomBytes(10).toString('hex');
        ClientDB[id] = input 
        return new Client(id, input);
    }

    }
}
