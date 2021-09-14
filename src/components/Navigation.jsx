import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggle } from '../actions/generalActions';
import '../styles/navigation.css';
import { signout } from '../actions/userActions';

export default function Navigation() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const setOpenMenu = () => {
        setIsOpen(!isOpen);
        dispatch(toggle(isOpen))
    }

    const signoutHandler = () => {
        dispatch(signout());
    };


    return (
        <aside className={isOpen ? "navigation menu__expanded " : "navigation menu__collapse"}>
            <div className="navigation__header">
                <div className="title">Real Vision Enterprise</div>
                <button className="navigation__btn" onClick={() => setOpenMenu()}><i className='bx bx-menu'></i></button>
            </div>

            
            <div className="navigation__profile">
                <div className="photo">
                    <img src={userInfo.image} alt="" />
                </div>
                <div className="name"><span>{userInfo.name}</span></div>
            </div>

            <div className="navigation__items">
            <details>
                    <summary className="navigation__subtitle">Hardware <i className='bx bx-down-arrow-alt'></i></summary>
                    <div>
                        <Link to="/categories" className="navigation__item">
                            <div className="icon"><i className='bx bx-menu'></i></div>
                            <div className="title">Categories</div>
                        </Link>
                        <Link to="/products" className="navigation__item">
                            <div className="icon"><i className='bx bxl-product-hunt'></i></div>
                            <div className="title">Products</div>
                        </Link>
                        <Link to="computers" className="navigation__item">
                            <div className="icon"><i className='bx bx-desktop' ></i></div>
                            <div className="title">Computers</div>
                        </Link>
                        <h3 className="navigation__subtitle">Sells</h3>
                        <Link to="/quotation" className="navigation__item">
                            <div className="icon"><i className='bx bxs-category' ></i></div>
                            <div className="title">Quotation</div>
                        </Link>
                        <Link to="" className="navigation__item">
                            <div className="icon"><i className='bx bxs-check-square' ></i></div>
                            <div className="title">Quotations</div>
                        </Link>
                        <Link to="" className="navigation__item">
                            <div className="icon"><i className='bx bx-money' ></i></div>
                            <div className="title">Sell</div>
                        </Link>
                        <Link to="" className="navigation__item">
                            <div className="icon"><i className='bx bx-list-ul' ></i></div>
                            <div className="title">Sells</div>
                        </Link>
                    </div>
                </details>
                <Link to="/" onClick={signoutHandler} className="navigation__item end">
                    <div className="icon"><i className='bx bx-log-out' ></i></div>
                    <div className="title">Sign Out</div>
                </Link>
            </div>
        </aside>
    )
}
