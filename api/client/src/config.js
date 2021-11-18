import axios from "axios" 


export const axiosInstance = axios.create({
     baseURL : "https://shane-mern-social-app.herokuapp.com/api"
})