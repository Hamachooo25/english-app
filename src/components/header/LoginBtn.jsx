import React from 'react'
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
      <div className="header-login">
      <Link to="/signup">
        <button className='header-start'>SignUp</button>
      </Link>
      <Link to="/login">
        <button className='loginbtn'>Login</button>
      </Link>
      </div>

  )
}

export default LoginBtn
