import React, { useEffect, useState } from 'react'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { createNewUser } from './Redux toolkit/projectSlice'
import { useDispatch } from 'react-redux'

const AddNewUser = () => {

    const [newUserCredential, setNewUserCredential] = useState({
        "userName": "",
        "password": "",
        "userRoles": []
    })

    const roles = ["Administrator", "Stakeholder", "Developer", "Viewer"]

    const dispatch = useDispatch();

    const handleUserRoleSelect = (item) => {
        if (newUserCredential.userRoles.includes(item)) {
            setNewUserCredential((prev) => ({
                ...prev,
                userRoles: prev.userRoles.filter((val) => val !== item)
            }))
        }
        else {
            setNewUserCredential((prev) => ({
                ...prev,
                userRoles: [...prev.userRoles, item]
            }))
        }
    }

    useEffect(() => {
        console.log(newUserCredential)
    }, [newUserCredential])

    const handleCreateNewUser = () => {
        dispatch(createNewUser(newUserCredential))

        console.log(newUserCredential)

        setNewUserCredential({
            "userName": "",
            "password": "",
            "userRoles": []
        })
    }

    return (
        <div>
            <table style={{ margin: '50px' }}>
                <tr>
                    <td style={{ paddingBottom: '30px' }}>Enter User Name</td>
                    <td style={{ paddingBottom: '30px' }}>
                        <Form.Control
                            md={5}
                            type="text"
                            name="userName"
                            value={newUserCredential.userName}
                            id="inputGroupName"
                            onChange={(e) => setNewUserCredential((prev) => ({
                                ...prev,
                                userName: e.target.value
                            }))}
                        />
                    </td>
                </tr>

                <tr>
                    <td style={{ paddingBottom: '30px' }}>Enter Password</td>
                    <td style={{ paddingBottom: '30px' }}>
                        <Form.Control
                            md={5}
                            type="text"
                            name="password"
                            value={newUserCredential.password}
                            id="inputGroupName"
                            onChange={(e) => setNewUserCredential((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))}
                        />
                    </td>
                </tr>

                <tr>
                    <td style={{ paddingBottom: '10px' }}>Enter UserRole</td>
                    <td style={{ paddingBottom: '10px' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Select User Roles
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                               

                                {roles.map((item, index) => (
                                    <Dropdown.Item key={index}>
                                        <Form.Check
                                            type='checkbox'
                                            id={`user-${index}`}
                                            label={item}
                                            checked={newUserCredential.userRoles.includes(item)}
                                            onChange={() => handleUserRoleSelect(item)}
                                        />
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>

                        </Dropdown>
                    </td>
                </tr>
            </table>

      <Button onClick={handleCreateNewUser} variant="primary">Create new user</Button>{' '}
            

        </div>
    )
}

export default AddNewUser