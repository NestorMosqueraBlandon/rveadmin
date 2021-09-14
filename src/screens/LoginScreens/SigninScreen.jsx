import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import '../../styles/signin.css'
import { signin } from '../../actions/userActions';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

export default function SigninScreen(props) {
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
        if(username.length === 0 && password.length === 0)
        {
            swal('The fields cannot be empty', {
                icon: "error",
                dangerMode: true,
            })
        }else if(username.length === 0){
            swal('The username cannot be empty', {
                icon: "error",
                dangerMode: true,
            })
        }else if(password.length === 0){
            swal('The password cannot be empty', {
                icon: "error",
                dangerMode: true,
            })
        }else{
            dispatch(signin(username.toLowerCase(), password));
        }
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
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {loading?  <LoadingBox></LoadingBox> : (
                        <>
                    <img src="./img/logo.png" alt="Logo Real Vision Enterprise"/>
                    <div className="form-group">
                        <i className='bx bxs-user'></i>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <i className='bx bxs-lock' ></i>
                        <input type={passwordVisibility? "password" : "text"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span onClick={() => {setPasswordVisibility(!passwordVisibility)}}><i className='bx bxs-low-vision'></i></span>
                    </div>
                    <input type="submit" value="Login" />
                        </>
                    )}
                </form>

                <div className="form__text">
                    <h2>Welcome</h2>
                    <p>Be the best version of yoursef.</p>
                </div>
            </div>
        </div>
    )
}
