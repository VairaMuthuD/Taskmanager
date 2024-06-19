import React, {createContext, useState} from 'react'



const UserDataContext = createContext(null);


const UserNameContext = ({children}) => {

    const [logInUser, setLogInUser] = useState('')

  return (
    <UserDataContext.Provider value={}>
        
    </UserDataContext.Provider>
  )
}

export default {UserNameContext, UserDataContext}