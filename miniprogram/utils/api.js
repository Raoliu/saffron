import {request,uploadFile} from './request';
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const API = {
    getOpenid: (data) => request(POST, `Api/All/Login`,data),
    UserInfo: (data) => request(POST, `Api/All/UserInfo`,data),
    SubmitPersonalInfo: (data) => request(POST, `Api/All/SubmitPersonalInfo`,data),
    GetUserInfo: (data) => request(POST, `Api/All/GetUserInfo`,data),
    PhoneNumber: (data) => request(POST, `Api/All/PhoneNumber`,data),
    SubmitAssess: (data) => request(POST, `Api/All/SubmitAssess`,data),
};
module.exports = {
    API: API
}