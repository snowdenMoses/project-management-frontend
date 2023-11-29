import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import ContextApi from './index'

export let GET_CLIENTS;
export let GET_PROJECTS;
function Store({ children }) {
    
    GET_CLIENTS = gql`
            query {
                clients {
                created_at
                last_name
                first_name
                email
                password
                id
                }
            }
        `;
    const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS)
    const clientsDetails = [clientsLoading, clientsError, clientsData]

    GET_PROJECTS = gql`
            query {
                projects {
                id
                name
                description
                duration
                created_at
                status
                client{
                    id
                    first_name
                    last_name
                }
                }
            }
        `;
    const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(GET_PROJECTS)
    const projectsDetails = [projectsLoading, projectsError, projectsData]


    const CURRENT_CLIENT = gql`
            query {
            currentClient {
                first_name
                email
                id
                role
            }
            }
        `;
    const { loading: currentClientLoading, error: currentClientError, data: currentClientData } = useQuery(CURRENT_CLIENT)
    const currentClientDetails = [currentClientLoading, currentClientError, currentClientData]


    return (
        <ContextApi.Provider value={
            {currentClientDetails, projectsDetails, clientsDetails}
            }>
            {children}
        </ContextApi.Provider>
    )
}

export default Store