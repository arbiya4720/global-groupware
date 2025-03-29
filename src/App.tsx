import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import UserList from "./Components/UserList";
import EditUser from "./Components/EditUser";
const App = () => {
  return (
    <>
      <div className="container-fluid">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/user-list" element={<UserList/>}/>
          <Route path="/edit-users/:id" element={<EditUser/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
