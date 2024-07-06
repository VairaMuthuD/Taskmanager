import React, { useState, useReducer, useEffect, createContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Projectdetails from './Projectdetails';

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return action.payload;
        default:
            return state;
    }
};

const ProjectContext = createContext()

const ProjectNameReducer = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        axios
            .get('https://taskmanager-api.azurewebsites.net/api/ProjectInfo/GetAllProjectDetails', {
                headers: {
                    "CurrentUser": 'Vaira',
                    "CurrentRole": "Administrator"
                }
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: 'initialize', payload: res.data });
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <ProjectContext.Provider value={state}>
                {children}
            </ProjectContext.Provider>
           
        </div>
    )
}

export { ProjectNameReducer, ProjectContext };
