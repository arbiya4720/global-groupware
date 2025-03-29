import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userList,deleteUser } from "../Services/services"
import Swal from "sweetalert2"

const UserList = () => {
    const [users, setUsers] = useState([])
    const [page,setPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [limit,setLimit]=useState()
    const [total,setTotal]=useState()
    const navi = useNavigate()


    const fetchData=async()=>{
        const tok:any=JSON.parse(localStorage.getItem("token"))
        if(tok){
            const result= await userList(page)
            
            if (result.status==200){
                setUsers(result.data.data)
                setPage(result.data.page)
                setTotalPage(result.data.total_pages)
                setLimit(result.data.per_page)
                setTotal(result.data.total)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }else{
            navi("/")
        }
      
    }
    const deleteFun=async(id:any,index1:any)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res=await deleteUser(id)
                if(res.status==204){
                    const newUsers=users.filter((item:any,index:any)=> index!= index1 )
                setUsers(newUsers)
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                }else{
                    Swal.fire({
                        title: "Deleted!",
                        text: "Deletion Failed.",
                        icon: "error"
                    })
                }
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your record is safe :)",
                icon: "error"
              });
            }
          });
      }
      const edit=async(item:any)=>{
        navi(`/edit-users/${item.id}`, {state:item})
      }
      
    useEffect(() => {
        fetchData()
        }, [page,totalPage])

       
  return (
    <>
      <div className="row login">
        <div className="col-sm-10 mx-auto">
            <h1 className="text-center my-5 text-muted">List Of All Users</h1>
            <table className="table text-center table-border">
                <thead className="">
                    <tr>
                        <th><h4>Id</h4></th>
                        <th><h4>Profile Pic</h4></th>
                        <th><h4>First Name</h4></th>
                        <th><h4>Last Name</h4></th>
                        <th><h4>Action</h4></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user:any,index:any)=>(<>
                    <tr>
                        <td>{user.id}</td>
                        <td><img src={user.avatar} className="rounded-circle" height={"85px"} /></td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td> 
                            <button className="btn btn-outline-danger me-3 mb-2" onClick={()=>deleteFun(user.id,index)}>Del</button>
                            <button className="btn btn-outline-info mb-2" onClick={()=>edit(user)}>Edit</button>
                        </td>
                    </tr>
                    </>))}
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                       
                            <nav className="d-flex justify-content-center align-items-center" aria-label="Page navigation example">
  <ul className="pagination">
  <div className="record mt-2 me-3">
                            <span>Records : {(page-1)*limit+1} - {Math.min(page*limit,total)} of {total}</span>
                        </div>
    <li className={`page-item ${page<=1?"disabled":""}`}>
      <a className="page-link" onClick={()=>setPage(page-1)} aria-label="Previous">
        <span aria-hidden="true">Previous</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">{page}</a></li>
    <li className={`page-item ${ page >= totalPage ?"disabled":""}`}>
      <a className="page-link" onClick={()=>setPage(page+1)} aria-label="Next">
        <span aria-hidden="true">Next</span>
      </a>
    </li>
  </ul>
</nav>
</td>
                    </tr>
                </tfoot>
            </table>
        </div>
      </div>
    </>
  )
}

export default UserList
