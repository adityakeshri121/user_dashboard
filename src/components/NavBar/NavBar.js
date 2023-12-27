import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../Store/userNameSlice';

const NavBar = () => {
    const currentUser = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(userLogin(""));
    }

    return (
        <div>
            <nav className="navbar">
                <div>
                    <Link to="/" className="button" onClick={logoutUser}>
                        Home
                    </Link>
                </div>
                <div className='button'>{currentUser}</div>
            </nav>
        </div>
    )
}

export default NavBar