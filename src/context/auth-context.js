import React from 'react';

export default React.createContext({
    token: null,
    tokenExpiration: null,
    userId: null,
    username: null,
    login: () => {},
    logout: () => {}
});