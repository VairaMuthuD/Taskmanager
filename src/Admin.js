import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Admin = () => {
  return (
    <div>
      <Row className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Col xs={3}>
          <Card style={{ width: '18rem'}}>
            <Card.Body className='d-flex justify-content-center'>
              <Button as={Link} to="/addnewuser" variant="primary">Add User</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={3}>
          <Card style={{ width: '18rem'}}>
            <Card.Body className='d-flex justify-content-center'>
              <Button as={Link} to='/addprojectgroup' variant="primary">Add Project Group</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>



    </div>
  )
}

export default Admin