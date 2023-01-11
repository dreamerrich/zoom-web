import React, { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const SignIn = () => {
    const [ formData, setFormData ] = useState({
        Email: "",
        password: ""
    });

    const { email, password } = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault(); 
    };

    function saveJWT(response) {
        localStorage.setItem('jwt_token', response.headers.authorization)
    }

    return(
        <Fragment>
            <Form onSubmit={e => onSubmit(e)} className='text-center'>
                <FormGroup>
                    <Input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />&nbsp; 
                    <Input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />&nbsp; <br />
                    <Button color="light">SignIn</Button> &nbsp; &nbsp; <br/>
                    <br />
                    <input 
                    type="checkbox"
                    name="remember"
                    />
                    <Label for="remember">&nbsp;&nbsp;Keep me signed in</Label>
                    <br />
                </FormGroup>
                    &nbsp; &nbsp; 
                    <Button variant="text">Back</Button>
            </Form>
        </Fragment>
    )

   }
    
export default SignIn;