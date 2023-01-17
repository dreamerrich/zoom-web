import React, { useEffect, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { createMeeting } from './ZoomServices';

const successMsg = "Meeting successfully created!";
const errorMsg = "Ops.!! Something went wrong.";

const partialPayload = {
    settings : {
        host_video: false,
        participant_video: false,
        join_before_host: false,
        mute_upon_entry: true,
        use_pmi: false,
        approval_type: 0
    }
};

const initialFormState = {
    agenda: null,
    type: 1,
    topic: "",
    password: null,
    start_time: null
};

export default function CreateMeeting() {
    const { userId: userIdQS } = useQuery();
    const [ userId, setUserId ] = useState(userIdQS);
    const [notification, setNotification] = useState({});
    const [form, setForm ] = useState(initialFormState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const cleanUp = () => {
        setForm(initialFormState);
        setUserId(null);
    };

    const showNotification = (error) => {
        const notiobj = error
        ? {msg : errorMsg, type: "danger"}
        : {msg : successMsg, type: "success"};
        setNotification(notiobj);
        setTimeout(() => {
            setNotification({});
        }, 5000);
     };

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ enableSubmit, setEnableSubmit ] = useState(false);
    
    useEffect(() => {
        if(form.agenda && form.type && form.topic && userId) {
            if((form.type === 2 && form.start_time) || form.type === 1) {
                setEnableSubmit(true);
            } else {
                setEnableSubmit(false);
            }
        } else {
            setEnableSubmit(true);
        }
    }, [form, userId]);

    const onCreateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {...form, ...partialPayload };
        const resp = await createMeeting(userId, payload);
        showNotification(resp.err);
        cleanUp();
        setLoading(false);
    };
    return (
        <div>
        <p>Schedule</p>
        <Form style={{textAlign:"left"}} onSubmit={(e) => onCreateUser(e)}>
            <FormGroup>
                <h2>Topic</h2>
                <Input 
                    type='text'
                    name="name"
                    value={userId}
                    placeholder=' Zooming meeting'
                /><br/>
                <div style={{display:"flex"}}>
                    <Label for='start'>start</Label>&nbsp;&nbsp;
                    <Input 
                        type='date'
                        name="date"
                        
                        placeholder='date'
                    />&nbsp; &nbsp;
                    <Input 
                        type='time'
                        name="name"
                        placeholder='time'
                    />&nbsp; &nbsp;
                </div><br/>
                <div style={{display:"flex"}}>
                    <Label for="Duration">Duration</Label>&nbsp; &nbsp;
                    <Input 
                        type='number'
                        name="hours"
                        placeholder='hours'
                    />&nbsp; &nbsp;
                    <Input 
                        type='number'
                        name="min"
                        placeholder='minutes'
                    />&nbsp; &nbsp;
                </div><br/>
                <div style={{display:"flex"}}>
                    <Label for="timezone">Time Zone</Label>&nbsp; &nbsp;
                    <Input 
                        type='timezone'
                        name="timezone"
                        placeholder='timezone'
                    />
                </div><br/>
                <Input 
                    type='checkbox'
                    name="re-meet"
                />&nbsp; &nbsp;
                <Label for="re-meet">Recurring meet</Label>
                <hr/>
                <h2>Meeting ID</h2>
                <Input 
                    type='radio'
                    value="Ge-auto"
                    name="meeting-id"
                /> &nbsp; Generate Automatically &nbsp; &nbsp; &nbsp; &nbsp;
                <Input 
                    type='radio'
                    name="meeting-id"
                    value="id"
                />&nbsp; Personal Meeting Id 48339000284
                <hr />
                <h2>Security</h2>
                <Input 
                    type='checkbox'
                    name="passcode"
                />
                <Label for="passcode">Passcode</Label>
                <Input 
                    type='text'
                    name='password'
                />
                <Input 
                    type='checkbox'
                    name="waiting"
                />
                <Label for="waiting">Waiting Room</Label>
                <hr/>
                <h2>Video</h2>
                <Label for="host">Host : </Label>&nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="host"
                    name="voice"
                /> &nbsp; On &nbsp; &nbsp; &nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="host"
                    name="voice"
                /> &nbsp; Off &nbsp; &nbsp; &nbsp; &nbsp;
                <Label for="host2">Participants : </Label>&nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="host"
                    name="host2"
                /> &nbsp; On &nbsp; &nbsp; &nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="host"
                    name="host2"
                /> &nbsp; Off &nbsp; &nbsp; &nbsp; &nbsp;
                <hr />
                <h2>Audio</h2>
                <Input 
                    type='radio'
                    value="audio"
                    name="computer audio"
                /> &nbsp; Computer Audio &nbsp; &nbsp; &nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="audio"
                    name="computer audio"
                /> &nbsp; Telephone &nbsp; &nbsp; &nbsp; &nbsp;
                <hr />
                <h2>Calender</h2>
                <Input 
                    type='radio'
                    value="default"
                    name="cal"
                /> &nbsp; Default Mail Client &nbsp; &nbsp; &nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="google"
                    name="cal"
                /> &nbsp; Google Calender &nbsp; &nbsp; &nbsp; &nbsp;
                <Input 
                    type='radio'
                    value="other"
                    name="cal"
                /> &nbsp; Other Calender &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type='submit'>Create</Button>
            </FormGroup>
        </Form>
      </div>  
    )
    
}