import React, { useContext, createContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [loadingLogin, setLoadingLogin] = useState(false);

    return (
        <StateContext.Provider
            value={{
                loadingLogin,
                setLoadingLogin,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
