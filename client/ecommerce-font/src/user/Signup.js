import React, {useState} from 'react';
import Layout from '../core/Layout';
import { API } from "../config"


const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  }) 

const {name, email, password} = values;

const handleChange = name => event => {
   setValues({...values, error:false, [name]: event.target.value});
}

const signup = (user) => {
  fetch(`${API}/signup`,{
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
}

const clickSubmit = (event) => {
  event.preventDefault()
  signup({name, email, password})
  .then(data => {
    if(data.error) {
      setValues({...values, error:data.error, success: false})
    }
  })
}

  const signupForm = () => {
    return(
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input 
        onChange={handleChange('name')} 
        value={name} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')}
        type="email" value={email} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input  value={password} 
        onChange={handleChange('password')} type="password" className="form-control" />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>

    </form>
    )
  }
  return(
  <Layout title="Signup" 
  description="Signup to E-commerce site" 
  className="container col-md-8 offset-md-2">
   {signupForm()}
   {JSON.stringify(values)}
  </Layout>
  )
}

export default Signup;