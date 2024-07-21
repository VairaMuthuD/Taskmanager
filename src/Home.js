import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ProjectContext } from './ProjectNameReducer';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjects } from './Redux toolkit/projectSlice';

const Home = ({ show, setShow }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch])

  const values = useSelector((state) => state.projects.projects)

  console.log(values)

  // const state = useContext(ProjectContext);

  // console.log(state)

  const handleClose = () => setShow(false);

  return (
    <div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PROJECTS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>


            {values && values.length ?
              <>
                {values.map((item, index) => {
                  return (
                    <li  key={index} style={{listStyle:'none', paddingInlineStart: '0px !important', marginLeft: '0px'}}>
                      <Button
                        variant='link'
                        key={index}
                        as={Link}
                        to={`/Projectdetails/${item.projectId}`}>
                        {index} {item.projectName}
                      </Button>
                    </li>

                  )
                })}
              </> : 'NO'}
          </ul>
          <Button variant="primary" as={Link} to="/createproject">Create Project</Button>

        </Offcanvas.Body>
      </Offcanvas>

    </div>
  )
}

export default Home