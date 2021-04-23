import axios from "axios"
import { API } from "../config";

export const getAllCourses = ()=>{
    
  return  axios({
        'method':'GET',
        'url':`${API}/v1/courses`,
        'headers': {
            'content-type':'application/json',
        },
    
    }).then((response)=>{
           return response;
        }).catch(error =>{
            console.log(error)
        })
}