import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import ProductTable from './ProductTable'

function Dashboard() {
  const nanigate = useNavigate();
  

  const handleLogout = () => {
    logout();
    nanigate('/login');
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center bg-blue-500 text-4xl font-bold text-white'>
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
      <p>Welcome to my dashboard</p>
      </div>
     
      <ProductTable />
      <button className='p-2 bg-red-800 m-5 rounded-md text-white font-bold cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
