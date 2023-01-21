import { Http } from "./httpService";

const apiUrl = "https://api.zoom.us/v2/";
const http = new Http(apiUrl);
var qs = require('qs');
var axios = require('axios');

export const getSignature = (params) => {
  const url = `zoom/signature`;
  return http
    .post(url, params)
    .then((res) => res)
    .catch((err) => ({
      error: err
    }));
};

export const createMeeting = (userId, params) => {
  const url = `users/${userId}/meetings`;
  return http
    .post(url, params)
    .then((res) => res)
    .catch((err) => ({ err }));
};

export const listMeetings = (userId) => {
  const url = `users/${userId}/meetings`;
  return http
    .get(url)
    .then((res) => res)
    .catch((err) => ({ err }));
};

const authorize = () => {
  return `https://zoom.us/oauth/authorize?response_type=code&client_id=56cqnjWXS4CoW7KG76zvgg&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fzoom%2Faouthredirect}`;
}

const redirect = async (code) => {
  var data = qs.stringify({
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000'
  });

  var config = {
    method: 'post',
    url: "https://zoom.us/oauth/token",
    headers: {
      "content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_SECRET}`).toString('base64')
    },
    data: data
  };

  var result = await axios(config)
    .then(function(response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });

    return result;
} 

const meetings= async () => {
  let meetingList=await axios({
    url:'https://api.zoom.com/v2/users/me/meetings',
    headers: 
    {
      Authorization:sessionStorage.getItem('zoomtoken')
    }
  }).then(response=> {
    return response;
  }).catch(error=>{
    return error;
  });

  return meetingList.data;
  
}

module.export = {
  authorize, 
  redirect
}