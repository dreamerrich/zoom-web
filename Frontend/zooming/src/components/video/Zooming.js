import React from 'react';
import { ZoomMtg } from '@zoomus/websdk'
import { useEffect } from "react";
import { Buffer } from 'buffer';

const crypto = require('crypto-browserify')

function generateSignature(apiKey, apiSecret, meetingNumber) {
    return new Promise((res, rej) => {
        const timestamp = new Date().getTime - 3000;
        const msg = Buffer.from(apiKey + meetingNumber + timestamp).toString('base64');
        const hash = crypto.createHmac('sha256',apiSecret).update(msg).digest('base64');
        const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${hash}`).toString('base64');

        res(signature);
    });
}

// var signatureEndpoint = "http://localhost:4000";
var apiKey = "deKFN9a1RpeljvuMxanI-g";
var apiSecret = "Jm4DQjLBSrJyxppzBn5LUWastqvnwSL39Zwu";
var meetingNumber = 123456789;
// var role = 0;
var leaveUrl = "http://localhost:3000";
var userName = "test1";
var userEmail = "";
var password = "";

var signature = '';
generateSignature(apiKey, apiSecret, meetingNumber).then((res) => {
    signature = res;
});

const Zoom = () => {
    useEffect(() => {
      showZoomDiv();
      ZoomMtg.setZoomJSLib('https://source.zoom.us/{VERSION_NUMBER}/lib', '/av');
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      ZoomMtg.i18n.load('en-US');
      ZoomMtg.i18n.reload('en-US');
      initiateMeeting();
    }, [])
    
    const showZoomDiv = () => {
        document.getElementById('zmmtg-root').style.display = 'block';
    }

    const initiateMeeting = () => {
        ZoomMtg.init({
            leaveUrl: leaveUrl,
            isSupportAV: true,
            success: (success) => {
                console.log(success)

                ZoomMtg.join({
                    signature: generateSignature,
                    meetingNumber: meetingNumber,
                    userName: userName,
                    apiKey: apiKey,
                    userEmail: userEmail,
                    password: password,
                    success: (success) => {
                        console.log(success)
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    return <div className="App">Zooming</div>;
};

export default Zoom;

// sdk key = eVa3P73v2j28holT9l6BYCZQXVOtcPkKlpLZ
// sdk secret = U1gZPQzVEkZG0xAFuJdloe1T8o8cM1PRx0ub
// api key = deKFN9a1RpeljvuMxanI-g
// api-secret = Jm4DQjLBSrJyxppzBn5LUWastqvnwSL39Zwu
// jwt-token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImRlS0ZOOWExUnBlbGp2dU14YW5JLWciLCJleHAiOjE2NzIyMDE3MzAsImlhdCI6MTY3MjExNTMzMH0.-619Uo0ymulWW3VW4qS6J4Y-u_31WSWY-hY5pPtzcVw X