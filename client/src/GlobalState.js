import { createContext } from "react";
import productAPI from "./api/productAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children, value }) => {
    productAPI(); 

    return (
        <GlobalState.Provider value={value}>
            {children}
        </GlobalState.Provider>
    );
};
