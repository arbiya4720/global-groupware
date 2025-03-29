import * as yup from "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginService } from "../Services/services"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const Schema=yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
})
const Login = () => {
    const navi=useNavigate()
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(Schema)
    })
    const login=async(data:any)=>{
       const result=await loginService(data)
       console.log(result);
       
       if(result.status===200){
        Swal.fire({
            icon:"success",
            title:"Login Success",
            text:"Welcome to our website",
        })
        localStorage.setItem("token", JSON.stringify(result.data.token))
        navi("/user-list")
       }else{
        Swal.fire({
            icon:"error",
            title:"Login Failed",
            text: result.error,
        })
       }
    }
  return (
    <>
      <div className="row login px-5 ">
        <div className="col-md-4 p-5 rounded-3 login-container mx-auto my-auto">
            <h2 className="text-center mb-3">Login <span className="text-primary">Here</span></h2>
            <form onSubmit={handleSubmit((d)=>login(d))}>
                <div className="form-group mb-3">
                    <label className="text-primary" for="email">Email address</label>
                    <input type="text" {...register("email")} placeholder="Enter your email" className="form-control my-1"/>
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <label className="text-primary" for="password">Password</label>
                    <input type="password" {...register("password")} placeholder="Enter your password" className="form-control my-1"/>
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
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

export default Login
