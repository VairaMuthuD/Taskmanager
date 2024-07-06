import React, { useContext, useEffect, useState } from 'react'
import { Form, InputGroup, Button, Card } from 'react-bootstrap';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {UserDataContext} from './UsersNameContext'
import { useDispatch } from 'react-redux';
import { handleLogInUserAcrossComponent, handleUserRoles } from './Redux toolkit/projectSlice';

const Login = ({user}) => {
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const {handleLogInUserAcrossComponent, logInUser} = useContext(UserDataContext);

    const[userName, setUserName] = useState('')
    const[passWord, setPassWord] = useState('')
    const[redirectpage, setRedirectPage] = useState(false)
 

    const logInCredentials = () => {
        axios
            .post('https://taskmanager-api.azurewebsites.net/api/UserInfo/SetUserLogin',
                {
                    "UserName": userName,
                    "Password": passWord
                },{
                    headers:{
                        "isLogin": true,
                        "Content-Type": "application/json"
                    }
                })
            .then((res) => {
                user(res.data.userName)
                dispatch(handleLogInUserAcrossComponent(res.data.userName))
                dispatch(handleUserRoles(res.data.userRoles))
                console.log(res);
                console.log(res.data);
                setRedirectPage(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const togglePasswordVisibility = () => {
        setShowPassword(prev => { console.log(!prev); return !prev })
        console.log('vaira deepu')
    }

    useEffect(() => {
        if(redirectpage) {
            navigate('/');
        }
    }, [redirectpage, navigate]);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', height: 'auto', width: 'auto' }}>
            <Card style={{ width: '50rem', height: '250px' }}>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter User Name</Form.Label>
                            <Form.Control type="text" value={userName}  onChange={((e)=>setUserName(e.target.value))}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlPassword">
                            <Form.Label>Enter your Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'} value={passWord} onChange={((e)=>setPassWord(e.target.value))}
                                />
                                <Button variant='secondary' onClick={togglePasswordVisibility}>
                                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Button variant='primary' onClick={logInCredentials}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login