import React, { useState, Fragment } from "react";
import { FormGroup, Input, Form } from "reactstrap";
import { createUser } from "../video/ZoomServices";

export default function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setsubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setFirstName(e.target.value);
    setsubmitted(false);
  }

  const handlelastName = (e) => {
    setLastName(e.target.value);
    setsubmitted(false);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setsubmitted(false);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setsubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === '' || lastName === ''|| email === '' || password === '') {
      setError(true);
    } else {
      setsubmitted(true);
      setError(false);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h4>User {firstName} successfully registered!!</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h4>Please enter all the fields</h4>
      </div>
    );
  };

  const onCreateUser = async (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, email };
    console.log("", payload)
    const resp = await createUser(payload);
    console.log("", resp)
  };
    
  return (
    <Fragment>
            <Form onSubmit={(e) => onCreateUser(e)} className='text-center'>
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
                <FormGroup>
                    <Input
                        type="text"
                        name="firstname"
                        placeholder='firstName'
                        value={firstName}
                        onChange={handleName}
                        required
                    />&nbsp; 
                    <Input
                        type="lastname"
                        name="lastname"
                        placeholder='Lastname'
                        value={lastName}
                        onChange={handlelastName}
                        required
                    />&nbsp; <br />
                    <Input
                        type="email"
                        name="email"
                        placeholder='email'
                        value={email}
                        onChange={handleEmail}
                        required
                    />&nbsp; <br />
                    <Input
                        type="password"
                        name="password"
                        placeholder='password'
                        value={password}
                        onChange={handlePassword}
                        required
                    />&nbsp; <br />
                    <button type="submit" className="btn" onClick={handleSubmit}>
                    Create
                    </button>
                    <br />
                </FormGroup>
            </Form>
        </Fragment>
  );
}