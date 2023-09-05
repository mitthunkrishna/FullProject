import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getWhetherLoggedOrNot = async() => {

  try {
    const response = await axios.get('/SignedInOrNot');
    if(response.data.validate === true) {
      return true;
    }
    else {
      return false;
    }
    } catch(err) {
      console.log("Some error Occured");
    }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: await getWhetherLoggedOrNot(),
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
