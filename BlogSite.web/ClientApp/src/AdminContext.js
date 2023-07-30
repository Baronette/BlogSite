import React, { useState, useContext, createContext } from 'react';

const AdminContext = createContext();
const AdminContextComponent = ({ children }) => {
    const [admin, setAdmin] = useState();
    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}
const useAdmin = () => {
    return useContext(AdminContext);
}
export { AdminContextComponent, useAdmin }