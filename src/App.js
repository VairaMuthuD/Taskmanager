import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Routes, Route, BrowserRouter as Router, Link, Navigate } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Createproject from './Createproject';
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import Projectdetails from './Projectdetails';
import LoginUserRoles from './LoginUserRoles';
import Admin from './Admin';
import Addprojectgroup from './Addprojectgroup';
import AddNewUser from './AddNewUser';

const App = () => {

  // const [isLogin, setIsLogin] = useState(true)

  const [loggedInUser, setLoggedInUser] = useState('')

  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  const handleLogInUser = (data) => {
    setLoggedInUser(data)

  }

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }
    console.log(loggedInUser)
  }, [loggedInUser])

  // const handleShow = () => { setShow(true); console.log(show) }

  return (
    <div>

      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          {loggedInUser ?
          <Navbar.Brand className='justify-content-start'>
            <Button style={{ height: '40px', color: 'black' }} onClick={()=>{setShow(!show)}}>
              <IoMenu />
            </Button>
          </Navbar.Brand>
          : ''}


          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {loggedInUser ? <LoginUserRoles /> : '' }
            </Nav>
            <Nav>

              {loggedInUser ? (
                <NavDropdown title={
                  <>
                    Welcome {loggedInUser}{' '} <FaUserLarge />
                  </>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Button variant="secondary" onClick={() => setLoggedInUser('')}>Log Out</Button>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button variant="secondary" as={Link} to="/Login">Log In</Button>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path="/Login" element={<Login user={handleLogInUser} />} />

        <Route path="/" element={loggedInUser ? <Home show={show} setShow={setShow} /> : <Navigate to="/login" />  } />
      
        <Route path="/createproject" element={<Createproject />} />

        <Route path="/projectdetails/:projectId" element={<Projectdetails />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/addprojectgroup" element={<Addprojectgroup />} />

        <Route path="/addnewuser" element={<AddNewUser />} />


      </Routes>


    </div>
  )
}

export default App