import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const AuthorizationComponent = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('No token found');
            return;
        }
        try {
            setAuthenticated(true);
        } catch (err) {
            setError(err.message);
        }
    }, [error]);
    if (error) {
        return <Redirect to='/sign-in' />
    }
    if (authenticated) {
        return props.children;
    }
}
export default AuthorizationComponent;
