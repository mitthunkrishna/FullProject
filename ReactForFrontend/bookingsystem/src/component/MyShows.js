import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import ShowCard from './ShowCard';
import { setData, setApiCalled } from './myShowsSlice';

const fetchMyShows = () => async (dispatch) => {
    try {
        const response = await axios.get('/user/moviesBooked');
        const showsData = response.data.data;

        dispatch(setData(showsData));
        dispatch(setApiCalled(true));
    } catch (error) {
        console.error('Error Fetching shows:', error);
    }
};

const MyShows = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const myShows = useSelector((state) => state.myShows.data);
    const apiCalled = useSelector((state) => state.myShows.apiCalled);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn) {
           navigate('./signIn');
        }
        if (loggedIn && !apiCalled) {
            dispatch(fetchMyShows());
        }
    }, [dispatch, loggedIn, apiCalled]);

    return(
        <div>
        <h2>My Shows</h2>
        <div className="show-list">{myShows.map(show => (<ShowCard key={show.Id} show={show} />))}</div>
        </div>
    );
}


export default MyShows;