import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    BtnCustomized,
} from './NavBarElements';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from './AuthContext';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      if (response.status === 201) {
        console.log('SignIn successful');
      }
      dispatch(logout());
    } catch(err) {
     console.log("An error occured while logout", err);
  }
};
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to= '/Movies'>
            Movies
          </NavLink>
         {loggedIn ? (<NavLink to='/MyShows'>My Shows</NavLink>) : (<div></div>)}
          <NavLink to='/contact'>
            Contact
          </NavLink>
        </NavMenu>
        {!loggedIn ? (
        <NavBtn>
          <NavBtnLink to='/signIn'>
            Sign In
          </NavBtnLink>
        </NavBtn>
        ) : (<NavBtn onClick={handleLogout}><BtnCustomized>Sign Out</BtnCustomized>
      </NavBtn>)}
      </Nav>
    </>
  );
};

export default NavigationBar;
