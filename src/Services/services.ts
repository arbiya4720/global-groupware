import axios from "axios"

const BASEURL=`https://reqres.in`

export const loginService=async(payload:any)=>{
    if(payload.email=="eve.holt@reqres.in"){
        const response=await axios.post(`${BASEURL}/api/login`,payload)
        return response
    }else{
        return {error:"Invalid Credentials",status:401}
    }
}

export const userList=async(page:any)=>{
    const response=await axios.get(`${BASEURL}/api/users?page=${page}`)
    return response
}

export const deleteUser=async(id)=>{
    const response=await axios.delete(`${BASEURL}/api/users/${id}`)
    return response
}

export const editUser=async(id:any,payload:any)=>{
    const response=await axios.put(`${BASEURL}/api/users/${id}`,payload)
    return response
}