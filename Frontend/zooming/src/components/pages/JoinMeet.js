import React, { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import ZoomingModal from '../video/ZoomingModal';

const JoinMeet = (props) => {
    const [form, setForm] = useState({
        meetingId:"",
        name:"",
    });
    

    const onUpdateField = e => {
        const nextFormState = {
            ...form, 
            [e.target.meetingId]:e.target.value,
            [e.target.name]:e.target.value,
        };
        setForm(nextFormState);
    };

    const [ checked, setChecked] = useState(false);
    const handleChange = () => {

        setChecked(!checked);

    };

        return(
            <Fragment>
            <Form>
                <FormGroup>
                    <Input
                        type="text"
                        name="meetingId"
                        placeholder='Enter Meeting ID or personal Link name'
                        value={form.meetingId}
                        onChange={onUpdateField}
                    />&nbsp; 
                    <Input
                        type="text"
                        name="name"
                        placeholder='Enter Your Name'
                        value={form.name}
                        onChange={onUpdateField}
                    />&nbsp; 
                    <div style={{textAlign:"left"}}>
                    <input 
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                    />
                    <Label for="remember">&nbsp;&nbsp;Remember my name for future meetings</Label>
                    <br />
                    <input 
                    type="checkbox"
                    name="connect"
                    onChange={handleChange}
                    />
                    <Label for="connect">&nbsp;&nbsp;Do not connect my audio</Label>
                    <br />
                    <input 
                    type="checkbox"
                    name="video"
                    onChange={handleChange}
                    />
                    <Label for="video">&nbsp;&nbsp;Turn off my video</Label>
                    <br />
                    <p>By clicking "join", you agree to our <span style={{color:'blue'}}>Terms of service</span> and <span style={{color:'blue'}}>Privacy Statement</span></p>
                    </div>
                </FormGroup>
                <ZoomingModal />    &nbsp; &nbsp; 
                <Button onClick={{}} color="light">Cancel</Button>
                </Form>
            </Fragment>

        )
}
export default JoinMeet;