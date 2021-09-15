import { ApolloServer, gql } from 'apollo-server';
import { CarAPI } from './CarAPI.js';

const typeDefs = gql`
    #This is data type that served by the graphql

    #This is car data type from the api
    type Car {
        id: Int,
        plateNumber: String,
        color: String,
        model: String,
        chasisNumber: String,
        status: String,
        productionYear: Int,
        issueDate: String,
    }

    type Query {
        cars: [Car],
        test: [Car],
        car(plateNumber: String): Car
    }
`

const cars = [
    {
    id: 101,
    plateNumber: "EPE68ET",
    color: "White",
    model: "Toyota Highlander",
    chasisNumber: "7YP0K3EH8AS006555",
    status: "Brand New",
    productionYear: 2015,
    issueDate: "2018-01-14",
    expiryDate: "2019-02-13"
    },
    {
    id: 102,
    plateNumber: "KSF992EF",
    color: "Silver",
    model: "Honda Accord",
    chasisNumber: "5TDYK3IO4WQ006854",
    status: "Fairly Used",
    productionYear: 2010,
    issueDate: "2018-02-12",
    expiryDate: "2019-03-11"
    },
];

const resolvers = {
    Query: {
        test: async () => cars,
        cars: async ( _, __, {dataSources} ) => dataSources.carAPI.getAllCars(),
        car: async (_, {plateNumber}, {dataSources}) => dataSources.carAPI.getACar(plateNumber)
    },
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => ({
        carAPI: new CarAPI()
    })
 });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});