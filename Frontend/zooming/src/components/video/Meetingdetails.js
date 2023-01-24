import React from 'react';
import { Link } from 'react-router-dom';

function JoinMeeting() {
    const detail = localStorage.getItem('data')
    const details = JSON.parse(detail)
    const url = details.url
    console.log(url)
    const id = details.id
    console.log(id)
    const passcode = details.passcode
    console.log(passcode)
    return(
        <div>
            <h4>Create Meeting detail</h4>
            <p>To join meeting here is the link: <Link to="#">{url}</Link></p>
            <p>Meeting Id : <h4>{id}</h4></p>
            <p>Passcode: <h4>{passcode}</h4></p>
        </div>
    )

};

export default JoinMeeting;