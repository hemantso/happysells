import React, {useState} from 'react';
import { Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin, authenticate} from '../auth/index'


const Signin = () => {
  const [values, setValues] = useState({
    email: 'hsoni322@yahoo.com',
    password: 'Happy283476',
    error: '',
    loading: false,
    redirectToReferrer: false,
  }) 

const {email, password, error, loading, redirectToReferrer} = values;

const handleChange = name => event => {
   setValues({...values, error:false, [name]: event.target.value});
}



const clickSubmit = (event) => {
  event.preventDefault();
  setValues({...values, error: false, loading: true});
  signin({email, password})
  .then(data => {
    console.log("data", data)
    if(data.error) {
      setValues({...values, error: data.error, loading: false})
    } else {
      authenticate(data, () => {
        setValues({
          ...values,
          redirectToReferrer: true
        })
      })
    }
  })
}

  const signupForm = () => {
    return(
    <form>
      
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

const showError = () => {
  return(
  <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
    {error}
  </div>
  )
}
const showLoading = () => {
  return(
  
    loading && (<div className="alert alert-info">
    <h2>Loading...</h2>
  </div>)
  )
}

const redirectUser = () => {
  if(redirectToReferrer) {
    return <Redirect to="/" />
  }
}

  return(
  <Layout title="Signin" 
  description="Signin to E-commerce site" 
  className="container col-md-8 offset-md-2">
    {showLoading()}
    {showError()}
   {signupForm()}
   {redirectUser()}
  </Layout>
  )
}

export default Signin;