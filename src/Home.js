import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Link, Routes, Route } from 'react-router-dom';
import Createproject from './Createproject';
import Offcanvas from 'react-bootstrap/Offcanvas';


const Home = ({show, setShow}) => {


  const handleClose = () => setShow(false);

  return (
    <div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PROJECTS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <Button variant="primary" as={Link} to="/createproject">Create Project</Button>{' '}

        </Offcanvas.Body>
      </Offcanvas>

    </div>
  )
}

export default Home