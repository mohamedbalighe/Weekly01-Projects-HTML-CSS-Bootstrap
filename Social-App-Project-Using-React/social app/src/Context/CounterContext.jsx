import { createContext } from "react";
import { RouterProvider } from 'react-router-dom';

export let CounterContext = createContext();

export default function counterContextProvider({children}){

    return <CounterContext.Provider value={children}>
        {children}
    
    </CounterContext.Provider>

}