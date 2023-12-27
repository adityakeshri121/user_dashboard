import React, { useState } from 'react'
import './Login.css'
import data from '../../data.json';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../Store/userNameSlice'
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData] = useState(data.users);
    const [userName, setUserName] = useState('');
    const [validUser, setValidUser] = useState(true);
    const [errorData, setErrorData] = useState('');

    const validateUser = () => {
        const validData = userData.filter((a => a.name.toLowerCase() === userName.toLowerCase()));
        if (validData.length === 0 && userName.length === 0) {
            setValidUser(false);
            setErrorData('*Please input something')
            return
        }
        else if (validData.length === 0 && userName.length > 0) {
            setValidUser(false);
            setErrorData('*Invalid user, please try with valid details');

        }
        else {
            dispatch(userLogin(userName))
            navigate('/dashboard');
            setValidUser(true);

        }
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <h2>Login</h2>
                <div className="input-group">
                    <label >Username</label>
                    <input placeholder='username' type="text" id="username" name="username" value={userName} required onChange={(e) => setUserName(e.target.value)} />
                    {validUser ? null : <span className='error-data' style={{ color: 'red' }}>{errorData}</span>}
                </div>

                <button type="submit" onClick={validateUser}>Login</button>
            </form>
        </div>
    )
}

export default Login