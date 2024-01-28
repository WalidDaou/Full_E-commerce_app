import axios from "axios"
import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { homeURL } from "../../shared/constants"
import { useHistory, Link, HashRouter as Router } from 'react-router-dom'

function Login() {

  const history = useHistory()
  const {
    setToken
  } = useCommerceStore()
  const {
    setNames
  } = useCommerceStore()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }


  const handleSubmit = (e: any) => {
    const userData = {
      email,
      password
    }
    // localhost:5000/api/v1/users/register
    axios.post(homeURL + '/users/login', userData)
      .then(function (response) {
        console.log(response);
        // const result = await response.json()
        setToken(response.data.token);
        setNames(response.data.name);
   
        history.push('/')

      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.log(error.response.data); // This will give you the error message from the server
          setError('Invalid email or password. Please try again.');
        } else if (error.request) {
          // The request was made, but no response was received
          console.log(error.request);
          setError('No response from the server. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setError('An unexpected error occurred. Please try again.');
        }
      });

  }
  return (
    <form style={formStyle}>
      {error && <p>{error}</p>}
      <span>
        <label htmlFor="login-user-email">login-user-email</label>
        <input type="text" name="login-user-email" id="login-user-email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </span>

      <span>
        <label htmlFor="login-user-pass">login-user-pass</label>
        <input type="password" name="login-user-pass" id="login-user-pass" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </span>

      <button onClick={handleSubmit} type="button">Login</button>
      <div className="flex ">
        <p>New here? </p>
        <Router>
          <Link to={"/register"}>Sign up</Link>
        </Router>
      </div>
    </form>
  )
}

export default Login