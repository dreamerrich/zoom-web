import React, { useEffect, useState} from 'react';

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
    const [ notification, setNotification ] = useState({});
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
        const resp = await CreateMeeting(userId, playload);
        showNotification(resp.err);
        cleanUp();
        setLoading(false);
    };
    return (
        <div>
            
        </div>
    );
}