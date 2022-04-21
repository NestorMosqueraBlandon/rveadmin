import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart } from 'recharts';

export default function HomeScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const data = []


  return (
    <div className="clean__card">
      <div className="card__header">
        <h2 className="home__title">
          Hi {userInfo.name} <br />{' '}
          <span className="home__subtitle"> Welcome Back </span>
        </h2>
      </div>

      <div className="list__card">
        <div className="card">
          <BarChart width={400} height={400} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}> 
        
          </BarChart>
        </div>
      </div>
    </div>
  );
}
