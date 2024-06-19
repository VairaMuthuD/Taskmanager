import React, {useState, createContext} from 'react'
import Createproject from './Createproject';
import App from './App';

const UserDataContext = createContext(null);

const UsersNameContext = ({children}) => {
    const [logInUser, setLogInUser] = useState('')

    const handleLogInUserAcrossComponent = (val)=>{
        setLogInUser(val)
    }

    return (
        <UserDataContext.Provider value={{handleLogInUserAcrossComponent, logInUser}}>
           {children}
        </UserDataContext.Provider>
    )
}

export default {UsersNameContext , UserDataContext }