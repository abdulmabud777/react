import { createContext, useState, useContext  } from 'react';

const AppContext = createContext();

const AppProvider = ({children})=> {
    const userData = {
        name: 'abdul',
        age: 30
    }
    return <AppContext.Provider value={userData}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }