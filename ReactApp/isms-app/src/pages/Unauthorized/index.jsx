import React from 'react'
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = ()=> navigate('/');

  return (
    <div>
      <h1>Unauthorized</h1>
      <br/>
      <p>You do not have access to requested page.</p>
      <div className='flexGrow'>
        <button onClick={goBack}>Go Home</button>
      </div>
    </div>
  )
}

export default Unauthorized;