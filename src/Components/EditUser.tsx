import * as yup from "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { editUser } from "../Services/services"
import Swal from "sweetalert2"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const Schema=yup.object().shape({
    first_name:yup.string().required(),
    last_name:yup.string().required(),
    email: yup.string().email().required(),
})

const EditUser = () => {
    const navi=useNavigate()
    const {id}=useParams()
    const {state}=useLocation()
    const {register,handleSubmit,setValue,formState:{errors}}=useForm({
        resolver:yupResolver(Schema)
    })

    const updateFun=async(data:any)=>{
        const res=await editUser(id,data)
        console.log(res);
       if(res.status===200){
        Swal.fire({
            icon:"success",
            title:"Update",
            text:"Record Update Successful",
        })
        navi("/user-list")
       }else{
        Swal.fire({
            icon:"error",
            title:"Login Failed",
            text: "Record Update process failed ",
        })
       }
    }

    useEffect(()=>{
        setValue("email",state.email),
        setValue("first_name",state.first_name),
        setValue("last_name",state.last_name)
    },[])
  return (
    <>
      <div className="row login px-5 ">
        <div className="col-md-4 p-5 rounded-3 login-container mx-auto my-auto">
            <h2 className="text-center mb-3">Login <span className="text-primary">Here</span></h2>
            <form onSubmit={handleSubmit((d)=>updateFun(d))}>
            <div className="form-group mb-3">
                    <label className="text-primary" for="first_name">First Name</label>
                    <input type="text" {...register("first_name")} placeholder="Enter your first name" className="form-control my-1"/>
                    {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <label className="text-primary" for="email">Last Name</label>
                    <input type="text" {...register("last_name")} placeholder="Enter your last name" className="form-control my-1"/>
                    {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <label className="text-primary" for="email">Email address</label>
                    <input type="text" {...register("email")} placeholder="Enter your email" className="form-control my-1"/>
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn mt-1 btn-primary w-100">Login</button>
                </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default EditUser
