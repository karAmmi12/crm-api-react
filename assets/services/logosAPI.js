import axios from "axios";
import { LOGOS_API } from "../config";

function create(formData){
    return axios
        .post(LOGOS_API, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }

          });
}

export default {
    create
}