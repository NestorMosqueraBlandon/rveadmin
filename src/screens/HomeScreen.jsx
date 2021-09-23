import React from 'react';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <div className="clean__card">
      <div className="card__header">
        <h2 className="home__title">
          Hi {userInfo.name} <br />{' '}
          <span className="home__subtitle"> Welcome Back </span>
        </h2>
      </div>
    </div>
  );
}
