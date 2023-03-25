import axios from "axios";
const BASE_URL = 'http://localhost:8085/api';

export default axios.create({
    baseURL: BASE_URL
});