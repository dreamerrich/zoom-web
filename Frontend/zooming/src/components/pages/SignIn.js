import React, { Fragment, useContext } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import AuthContext from '../../login/AuthContext';


const SignIn = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = async e => {
      const username = e.target.username.value;
      const password = e.target.password.value;
    e.preventDefault();
    loginUser(username, password);
  };

   
    return(
        <Fragment>
            <Form  onSubmit={handleSubmit} className='text-center'>
                <FormGroup>
                    <Input
                        type="text"
                        name="username"
                        placeholder='username'
                        id="username"
                        required
                    />&nbsp; 
                    <Input
                        type="password"
                        name="password"
                        placeholder='Password'
                        id='password'
                        required
                    />&nbsp; <br />
                    <Button color="light" >SignIn</Button> &nbsp; &nbsp; <br/>
                    <br />
                </FormGroup>
                    &nbsp; &nbsp; 
            </Form>
        </Fragment>
    )

   }
    
export default SignIn;