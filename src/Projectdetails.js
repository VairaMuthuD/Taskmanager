import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectContext } from './ProjectNameReducer';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, editProjects, getProjectGroups } from './Redux toolkit/projectSlice';
import { MdEdit } from "react-icons/md";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';



const Projectdetails = () => {

    const { projectId } = useParams();
 
    const [show, setShow] = useState(false);

    const [updatedUserData, setUpdatedUserData] = useState({
        "id": projectId ? projectId : '',
        "projectName": "",
        "projectSummary": "",
        "projectDescription": "",
        "projectgroup": "",
        "projectvisibility": ""
    })

    const values = useSelector((item) => item.projects.projects)

    const projectGroup = useSelector((item) => item.projects.projectGroup)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(getProjectGroups());


        if (!values || values.length === 0) {
            return <p>Loading...</p>; // Handle loading values if needed
        }
    

        if (projectId) {
            setUpdatedUserData((prev) => ({
                ...prev,
                id: projectId
            }));
        }

        console.log(projectId)
    }, [dispatch, projectId]);

    const project = values.filter((item) => item.projectId === Number(projectId))
   

    // const state = useContext(ProjectContext);

    const today = new Date();

    today.setMonth(today.getMonth() + 1)

    const date = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();


    const handleClose = () => setShow(false);
    const handleShow = () => {
        setUpdatedUserData((prev)=>({
            ...prev,
            projectName: project[0].projectName,
            projectSummary: project[0].projectSummary,
            projectDescription: project[0].projectDescription,
            projectgroup: project[0].projectgroup,
            projectvisibility: project[0].projectvisibility
        }));
        setShow(true);
    }

    const handleSubmit = () => {
        // if (updatedUserData.id) {
        //     dispatch(editProjects(updatedUserData));
        //     handleClose();
        // } else {
        //     console.error('Invalid id:', updatedUserData.id);
        //     // Handle invalid id scenario (e.g., show an error message)
        // }

        if (updatedUserData.id) {
            dispatch(editProjects(updatedUserData))
                .then(() => {
                    setShow(false); // Close modal after successful edit
                })
                .catch((error) => {
                    console.error('Error editing project:', error);
                    // Handle error scenario (e.g., show an error message)
                });
        } else {
            console.error('Invalid id:', updatedUserData.id);
            // Handle invalid id scenario (e.g., show an error message)
        }
    }

    return (
        <div>
            {project.map((item, index) => {
                return (
                    <table key={index}>
                        <tr>
                            <th className='d-flex' colSpan={2}><h2>{item.projectName}</h2>  <Button variant="dark" onClick={handleShow}><MdEdit /></Button>
                            </th>
                        </tr>
                        <tr><th>groupUsers: </th> <td>{item.groupUsers}</td></tr>
                        <tr><th>projectDescription: </th> <td>{item.projectDescription}</td></tr>
                        <tr><th>projectId:  </th> <td>{item.projectId}</td></tr>
                        <tr><th>projectSummary: </th> <td>{item.projectSummary}</td></tr>
                        <tr><th>projectgroup: </th> <td>{item.projectgroup}</td></tr>
                    </table>
                )
            })}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-5 justify-content-md-center'>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectName">
                            <Form.Label column sm="2">
                                Project Name
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" maxLength='50' name="projectName" onChange={(e) => setUpdatedUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={updatedUserData.projectName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectSummary">
                            <Form.Label column sm="2">
                                Project Summary
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="projectSummary" onChange={(e) => setUpdatedUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={updatedUserData.projectSummary} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectDescription">
                            <Form.Label column sm="2">
                                Project Description
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="projectDescription" onChange={(e) => setUpdatedUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={updatedUserData.projectDescription} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectGroup">
                            <Form.Label column sm="2">
                                Project Group
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control as="select" name="projectgroup" onChange={(e) => setUpdatedUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={updatedUserData.projectgroup}>
                                    <option value="" disabled>
                                        Select a project group
                                    </option>
                                    {projectGroup.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextOwner">
                            <Form.Label column sm="2">
                                Owner
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="Owner" disabled value="Vaira" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextDateCreated">
                            <Form.Label column sm="2">
                                Date Created
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control type="text" name="DateCreated" disabled value={date} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextOwner">
                            <Form.Label column sm="2">
                                Visibility
                            </Form.Label>
                            <Col sm="8">
                                <div className="d-flex">
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="public-radio-1"
                                        label="Public"
                                        name="Visibility"
                                        value="Public"
                                        checked={updatedUserData.Visibility === "Public"}
                                        onChange={(e) => setUpdatedUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                    />

                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="private-radio-2"
                                        label="Private"
                                        name="Visibility"
                                        value="Private"
                                        checked={updatedUserData.Visibility === "Private"}
                                        onChange={(e) => setUpdatedUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                    />
                                </div>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>



                    </Form>
                </Modal.Body>
           
            </Modal>


        </div>
    )
}

export default Projectdetails