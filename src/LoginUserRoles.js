import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import { handleSelectedUserRole } from './Redux toolkit/projectSlice';
import { useNavigate } from 'react-router-dom';


const LoginUserRoles = () => {

    const roles = useSelector((item) => item.projects.userRoles)

    const selectedRole = useSelector((item) => item.projects.selectedUserRole )

    const dispatch = useDispatch();

    const navigate = useNavigate();

    console.log(roles)

    useEffect(() => {
        if (roles.length === 1 || roles.includes('Administrator')) {
            dispatch(handleSelectedUserRole(roles[0]));
        }

        if(selectedRole === 'Administrator'){
            navigate('/admin')
        }

    }, [selectedRole]);

    const handleUserRoleChange = (event) => {
        const selectedRole = event.target.value;
        dispatch(handleSelectedUserRole(selectedRole));
      };

    return (
        <div>
            <Form.Select onChange={handleUserRoleChange} defaultValue={roles[0]}>
                {roles.length >= 1 ?

                    <>
                        {roles.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </>
                    :
                    <option value="">
                        {roles[0]}
                    </option>

                }


            </Form.Select>
        </div>
    )
}

export default LoginUserRoles