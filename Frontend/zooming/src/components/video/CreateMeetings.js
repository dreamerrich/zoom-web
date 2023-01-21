import React, { useContext, useState} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import AuthContext from '../../login/AuthContext';

function CreateMeeting() {
    const [agenda, setAgenda] = useState("");
    
    const [topic, setTopic] = useState("");
   
    const [date, setDate] = useState("");
   
    const [duration, setDuration] = useState("");
    
    const { CreateMeeting } = useContext(AuthContext);

    const handleSubmit = async e => {
      e.preventDefault();
      CreateMeeting(agenda, topic, date, duration );
  };
    return (
        <div>
        <p>Schedule</p>
        <Form style={{textAlign:"left"}} onSubmit={handleSubmit}>
            <FormGroup>
                <h2>Topic</h2>
                <Input
                        type="text"
                        name="agenda"
                        id="agenda"
                        placeholder='agenda'
                        onChange={e => setAgenda(e.target.value)}
                        required
                    />&nbsp; 
                <Input
                    type="text"
                    name="topic"
                    id="topic"
                    placeholder='topic'
                    onChange={e => setTopic(e.target.value)}
                    required
                />&nbsp; 
                <Input
                        type="date"
                        name="date"
                        id="date"
                        placeholder='date'
                        onChange={e => setDate(e.target.value)}
                        required
                />&nbsp; 
                <Input
                        type="time"
                        name="time"
                        id="time"
                        placeholder='duration'
                        onChange={e => setDuration(e.target.value)}
                        required
                />&nbsp; 
                <br />
                <Button type='submit'>Create</Button>
            </FormGroup>
        </Form>
      </div>  
    )
    
}

export default CreateMeeting;