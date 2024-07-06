import {React, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import { handleSelectedUserRole } from './Redux toolkit/projectSlice';


const LoginUserRoles = () => {

    const roles = useSelector((item) => item.projects.userRoles)

    const dispatch = useDispatch();

    console.log(roles)


  useEffect(() => {
    if (roles.length === 1) {
      dispatch(handleSelectedUserRole(roles[0]));
    }
  }, [dispatch, roles]);

    const handleUserRoleChange = (event) => {
        dispatch(handleSelectedUserRole(event.target.value));
      };

    return (
        <div>
            <Form.Select onChange={handleUserRoleChange} defaultValue={ dispatch(handleSelectedUserRole(roles[0]))}>
                {roles.length > 1 ?

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