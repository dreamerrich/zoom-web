import React, { Fragment, useContext, useState } from "react";
import { FormGroup, Input, Form } from "reactstrap";
import AuthContext from '../../login/AuthContext';

  function Register() {
    const [username, setUsername] = useState("");
    console.log("error>>>>>>>", username)
    const [email, setEmail] = useState("");
    console.log("error>>>>>>>",email)
    const [first_name, setFirst_name] = useState("");
    console.log("error>>>>>>>", first_name)
    const [last_name, setLast_name] = useState("");
    console.log("error>>>>>>>",last_name)
    const [password, setPassword] = useState("");
    console.log("error>>>>>>>",password)
    const [password2, setPassword2] = useState("");
    console.log("error>>>>>>>",password2)
    const { registerUser } = useContext(AuthContext);

    const handleSubmit = async e => {
      e.preventDefault();
      registerUser(username, email, first_name, last_name, password, password2);
  };
    
  return (
    <Fragment>
            <Form onSubmit={handleSubmit} className='text-center'>
                <FormGroup>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='userName'
                        onChange={e => setUsername(e.target.value)}
                        required
                    />&nbsp; 
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='email'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />&nbsp; <br />
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder='Firstname'
                        onChange={e => setFirst_name(e.target.value)}
                        required
                    />&nbsp; 
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder='Lastname'
                        onChange={e => setLast_name(e.target.value)}
                        required
                    />&nbsp; <br />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='password'
                        onChange={e => setPassword(e.target.value)}
                        required
                    />&nbsp; <br />
                    <Input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder='re-enter password'
                        onChange={e => setPassword2(e.target.value)}
                        required
                    />&nbsp; {password2 !== password ? "Passwords do not match" : ""}<br />
                    <button type="submit" className="btn" >
                    Create
                    </button>
                    <br />
                </FormGroup>
            </Form>
        </Fragment>
  );
}

export default Register;