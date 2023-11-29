import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';



const cache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                clients:{
                    merge(existing, incoming){
                        return incoming
                    }
                },
                projects:{
                    merge(existing, incoming){
                        return incoming
                    }
                }
            }
        }
    }
})
const jwtToken = localStorage.getItem('jwtToken');
const httpLink = createUploadLink({
    // uri: "http://localhost:5002/api/",
    // uri: "/api/",
    uri: "https://project-management-server-production.up.railway.app/",
    headers: {
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    }
});

const client = new ApolloClient({
    link: httpLink,
    cache: cache,
});

export default client

