import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import '../../styles/signin.css'

export default function SignupScreen(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true)

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, username, password));
    };

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);

    return (
        <div className="signin__container">
            <div className="signin__form">
                <form onSubmit={submitHandler}>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <h2 className="title">Real Vision Enterprise</h2>
                    <div className="form-group">
                        <i className='bx bxs-user'></i>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <i className='bx bxs-user'></i>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <i className='bx bxs-lock' ></i>
                        <input type={passwordVisibility? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span onClick={() => {setPasswordVisibility(!passwordVisibility)}}><i className='bx bxs-low-vision'></i></span>
                    </div>
                    <input type="submit" value="Login" />
                </form>

                <div className="form__text">
                    <h2>Welcome</h2>
                    <p>Be the best version of yourself.</p>
                </div>
            </div>

        </div>
    )
}
