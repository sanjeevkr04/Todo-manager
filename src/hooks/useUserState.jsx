import React, { createContext, useContext, useReducer } from "react";
import reducer, {initialState} from '../reducer';

export const StateContext = createContext();
export const useUserState = () => useContext(StateContext);

function UserStateProvider({children}){
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export default UserStateProvider;