import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { getProjectGroups } from './Redux toolkit/projectSlice';
import { useSelector, useDispatch } from 'react-redux';

import { UserDataContext } from './UsersNameContext';

const Createproject = () => {

    const { logInUser } = useContext(UserDataContext)

    // const [projectGroup, setProjectGroup] = useState([])

    const [projectData, setProjectData] = useState({
        "ProjectName": "",
        "ProjectSummary": "",
        "ProjectDescription": "",
        "ProjectGroup": "",
        "Owner": "",
        "DateCreated": "",
        "Visibility": ""
    })

    const dispatch = useDispatch()

    const projectGroup = useSelector((item)=>item.projects.projectGroup)

    console.log(projectGroup)

    const today = new Date();

    today.setMonth(today.getMonth() + 1)

    const date = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();

    console.log(date)

    const handleSubmit = () => {
        console.log(projectData)

        if (projectData.ProjectName && projectData.ProjectSummary && projectData.ProjectDescription && projectData.ProjectGroup && projectData.Visibility) {

            axios
                .post('https://taskmanager-api.azurewebsites.net/api/ProjectInfo/SaveNewProject',

                    {
                        "projectName": projectData.ProjectName,
                        "projectSummary": projectData.ProjectSummary,
                        "projectDescription": projectData.ProjectDescription,
                        "projectgroup": projectData.ProjectGroup,
                        "projectvisibility": projectData.Visibility,
                    }, {
                    headers: {
                        "CurrentUser": logInUser,
                        "CurrentRole": "Administrator"
                    }
                }

                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })


            // setProjectList((prev)=>[...prev,projectData])
        }
        setProjectData({
            "ProjectName": "",
            "ProjectSummary": "",
            "ProjectDescription": "",
            "ProjectGroup": "",
            "Owner": "",
            "DateCreated": "",
            "Visibility": ""
        })
    }

    useEffect(() => {
        dispatch(getProjectGroups());
    }, [dispatch]);

   




    return (
        <div className='container'>
            <Form className='p-5 justify-content-md-center'>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectName">
                    <Form.Label column sm="2">
                        Project Name
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control type="text" maxLength='50' name="ProjectName" onChange={(e) => setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={projectData.ProjectName} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectSummary">
                    <Form.Label column sm="2">
                        Project Summary
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control type="text" name="ProjectSummary" onChange={(e) => setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={projectData.ProjectSummary} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectDescription">
                    <Form.Label column sm="2">
                        Project Description
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control type="text" name="ProjectDescription" onChange={(e) => setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={projectData.ProjectDescription} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextProjectGroup">
                    <Form.Label column sm="2">
                        Project Group
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control as="select" name="ProjectGroup" onChange={(e) => setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} value={projectData.ProjectGroup}>
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
                        <Form.Control type="text" name="Owner" disabled value={logInUser} />
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
                                checked={projectData.Visibility === "Public"}
                                onChange={(e) => setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            />

                            <Form.Check
                                inline
                                type="radio"
                                id="private-radio-2"
                                label="Private"
                                name="Visibility"
                                value="Private"
                                checked={projectData.Visibility === "Private"}
                                onChange={(e) => setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            />
                        </div>
                    </Col>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>Submit</Button>



            </Form>



        </div>
    )
}

export default Createproject