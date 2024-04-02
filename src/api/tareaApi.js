import axios from "axios";

export const tareaApi = axios.create({
    baseURL: './php'
})