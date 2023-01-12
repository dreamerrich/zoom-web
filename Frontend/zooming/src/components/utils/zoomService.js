import { Http } from "./httpService";

const apiUrl = "https://f6e1418abfff.ngrok.io";
const http = new Http(apiUrl);

export const getSignature = (params) => {
  const url = `zoom/signature`;
  return http
    .post(url, params)
    .then((res) => res)
    .catch((err) => ({
      error: err
    }));
};

export const createUser = (params) => {
  const url = "users";
  return http
    .post(url, params)
    .then((res) => res)
    .catch((err) => ({ err }));
};

export const updateUser = (params) => {
  const url = "users";
  return http
    .post(url, params)
    .then((res) => res)
    .catch((err) => ({ err }));
};

export const deleteUser = (userId) => {
  const url = `users/${userId}`;
  return http
    .delete(url)
    .then((res) => res)
    .catch((err) => ({ err }));
};

export const listUser = () => {
  const url = "users";
  return http
    .get(url)
    .then((res) => res)
    .catch((err) => ({ err }));
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
