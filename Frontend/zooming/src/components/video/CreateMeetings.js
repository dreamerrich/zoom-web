import React, { useContext,useState} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import AuthContext from '../../login/AuthContext';
// import { createMeeting } from './ZoomServices';

function CreateMeeting() {
    
    const [topic, setTopic] = useState("");
   
    const [start_time, setDate] = useState("");
   
    const [duration, setDuration] = useState("");
    
    const { CreateMeeting } = useContext(AuthContext);

    const handleSubmit = async e => {
      e.preventDefault();
      CreateMeeting( topic, start_time, duration );
  };
    return (
        <div>
        <p>Schedule</p>
        <Form style={{textAlign:"left"}} onSubmit={handleSubmit}>
            <FormGroup>
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
                    name="start_time"
                    id="start_time"
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
                <Button type='submit'>Create Meeting</Button>
            </FormGroup>
        </Form>
      </div>  
    )
    
}

export default CreateMeeting;