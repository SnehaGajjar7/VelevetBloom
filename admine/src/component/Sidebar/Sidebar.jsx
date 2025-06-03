import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h2 className='sidebar-title'>Bloom Admin</h2>
      <div className='sidebar-options'>
        <NavLink to="/add" className='sidebar-option'>
          <img src={assets.add_icon} alt='Add' />
          <span>Add Flowers</span>
        </NavLink>
        <NavLink to="/list" className='sidebar-option'>
          <img src={assets.order_icon} alt='List' />
          <span>Flower List</span>
        </NavLink>
        <NavLink to="/orders" className='sidebar-option'>
          <img src={assets.order_icon} alt='Orders' />
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;