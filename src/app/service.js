
// const BASEURL = "http://identifier.us-east-1.elasticbeanstalk.com";
const BASEURL = "https://3a3f-2a01-b740-13d5-100-00-136.ngrok-free.app/";

// const BASEURL = "http://127.0.0.1:4040";

export default {
    REGISTER_API: `${BASEURL}/api/user/register`,
    LOGIN_API: `${BASEURL}/api/user/login`,
    UPLOAD_API: `${BASEURL}/api/allergy/check`,
    USER_API: `${BASEURL}/api/user`,
    USER_UPDATE_API: `${BASEURL}/api/user/update`,
}


// For - Node js

// const BASEURL = "http://localhost:8080";

// export default {
//     LOGIN_API: `${BASEURL}/api/login`,
//     UPLOAD_API: `${BASEURL}/api/uploadImage`
// }