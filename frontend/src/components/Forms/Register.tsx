import React, { useState } from 'react'
import axios from "axios"
import { useCommerceStore } from "../../store"
import { homeURL } from "../../shared/constants"
import { useHistory } from 'react-router-dom'

function Register() {

    const history = useHistory()

    const { setNames } = useCommerceStore()
    const { setToken } = useCommerceStore()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('');

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between' ,
        gap:'20px' ,
        
    }

    const handleSubmit = async (e: any) => {
        const userData = {
            name,
            email,
            password
        }
        e.preventDefault();
        //     // // localhost:5000/api/v1/users/register
        //     // axios.post(homeURL+'/users/register', userData)
        //     //     .then(function (response) {
        //     //         console.log(response);
        //     //         // const result = await response.json()
        //     //         setToken(response.data.token)
        //     //     })
        //     //     .catch(function (error) {
        //     //         console.log(error);
        //     //     });
        // }

        try {
            const response = await fetch(homeURL + '/users/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                setError('user alredy exist');
            }
            else if (!response.ok) {
                setError('enter  valid credentials!')
            } else {
                const data = await response.json()
                setToken(data.token)
                setNames(data.toke.name)
                alert(data.toke.name)
                history.push('/')

            }
        } catch (error: any) {
            console.error('Error during registration:', error);
            setError('enter  valid credentials!')
        }
    }
    return (
        <form style={formStyle}>
            <span>
                {error && <p>{error}</p>}
                <label htmlFor="user-name">user-name</label>
                <input type="text" name="user-name" id="user-name" value={name} onChange={(e) => { setName(e.target.value) }} />
            </span>

            <span>
                <label htmlFor="register-user-email">register-user-email</label>
                <input type="text" name="register-user-email" id="register-user-email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </span>

            <span>
                <label htmlFor="register-user-pass">register-user-pass</label>
                <input type="password" name="register-user-pass" id="register-user-pass" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </span>

            <span>
                <label htmlFor="confirm-register-user-pass">confirm-register-user-pass</label>
                <input type="password" name="confirm-register-user-pass" id="confirm-register-user-pass" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} />
            </span>

            <button onClick={handleSubmit} type="button">Register</button>
        </form>
    )
}

export default Register