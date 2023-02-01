import React, { useContext,useState} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import AuthContext from '../../login/AuthContext';

function CreateMeeting() {
    
    const [topic, setTopic] = useState("");
   
    const [start_time, setDate] = useState("");
   
    const [duration, setDuration] = useState("");
    
    const { CreateMeeting } = useContext(AuthContext);
    const token = localStorage.getItem("authTokens");

    const handleSubmit = async e => {
      e.preventDefault();
      CreateMeeting( topic, start_time, duration );
  };
    return (
        <div>
        { token ?
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
                    type="datetime-local"
                    name="start_time"
                    id="start_time"
                    placeholder='date'
                    onChange={e => setDate(e.target.value)}
                    required
                />&nbsp;
                <Input
                        type="minutes"
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
        :
            <h4>Please Login</h4>
    }
      </div>  
    )
    
}

export default CreateMeeting;