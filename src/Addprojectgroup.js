import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Dropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createNewProjectGroup } from './Redux toolkit/projectSlice';


const Addprojectgroup = () => {

  const [userList, setUserList] = useState([])
  const [projectUsers, setprojectUsers] = useState([])
  const [groupName, setGroupName] = useState('')

  const dispatch = useDispatch();


  useEffect(() => {
    axios
      .get('https://taskmanager-api.azurewebsites.net/api/Admin/GetAllUsersList', {
        headers: {
          "CurrentUser": 'Vaira',
          "CurrentRole": "Administrator"
        }
      })
      .then((res) => {
        setUserList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    console.log(projectUsers)
    console.log(groupName)
  }, [projectUsers, groupName])

  const handleUserSelect = (user) => {
    if (projectUsers.includes(user)) {
      setprojectUsers(projectUsers.filter((item) => item !== user))
    }
    else {
      setprojectUsers([...projectUsers, user])
    }
  }

  const handleCreateProjectGroup = () => {
    let newuserGroup = {
      "groupName": groupName ,
      "users": projectUsers
    }

    dispatch(createNewProjectGroup(newuserGroup))

    setprojectUsers([])
    setGroupName('')

  }

  return (
    <div>
      <table style={{ margin: '50px' }}>
        <tr>
          <td style={{ paddingBottom: '50px' }}>Select Users</td>
          <td style={{ paddingBottom: '50px' }}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Users
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {userList.map((item, index) => (
                  <Dropdown.Item key={index}>
                    <Form.Check
                      type='checkbox'
                      id={`user-${index}`}
                      label={item}
                      checked={projectUsers.includes(item)}
                      onChange={() => handleUserSelect(item)}
                    />
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>

        <tr>
          <td>Group Name</td>
          <td>
            <Form.Control
              md={5}
              type="text"
              value={groupName}
              id="inputGroupName"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </td>
        </tr>
      </table>

      <Button onClick={handleCreateProjectGroup} variant="primary">Create project group</Button>{' '}
    </div>
  )
}

export default Addprojectgroup