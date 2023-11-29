import { useQuery, gql } from '@apollo/client';
import { Button } from '@mui/base';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextApi from './contextApi';
import CustomizedSnackbars from './CustomizedSnackbar';

const ClientDashboard = () => {
  // const history = useHistory()
  // const location = useLocation()
  // const client_id = location.state.client_id

  // const handleLogOut = () => {

  //   localStorage.setItem("jwtToken", null)
  //   history.push("/")
  // }
  

  // const GET_CLIENT = gql`
  // query client($client_id: String){
  //   client(id: $client_id) {
  //   first_name
  //   id
  //   }
  // }
  // `;

  // const { loading, error, data } = useQuery(GET_CLIENT, {
  //   variables: {
  //     client_id
  //   }
  // })

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error!!</p>;
  
  return (
    // <>
    //   <Button onClick={handleLogOut}>Log Out</Button>
    //   <div>
    //     <h1 key={data.client.id}> Welcome {data.client.first_name}</h1>
    //   </div>
    // </>
    <div>Hello</div>
  );
}

export default ClientDashboard
