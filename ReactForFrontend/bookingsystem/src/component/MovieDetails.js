import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieDetailsTemplate from './MovieDetailsTemplate';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { setLastSixMovies } from './LastSixMovieSlice';



const CenteredH1 = styled.h1`
  margin-left: 350px;
`;

// const SlideContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 600px; /* Adjust as needed */
// `;

// const SlideImage = styled.img`
//   max-height: 100%;
//   width: 200px;
// `;
const SliderContainer = styled.div`
    display: grid;
    margin-top: 50px;
    grid-auto-flow: column;
    overflow-x: scroll;
    white-space: nowrap;
`;

const Slide = styled.div`
  width: 400px;
  height: 300px;
  margin-right: 10px;
  background-color: #f0f0f0;
  display: inline-block;
`;

const SlideImg = styled.img`
  width:400px;
  height:300px;
`;

const fetchMovies = async() => {
    // async function get() {
    const response = await axios.get('/movies'); // Replace with your API endpoint
    return response.data.slice(0, 6);
    // }
    // const listOfMovies = await get().slice(6);
    // return listOfMovies;
};  

function getOnlyFiveMovies(lastSixMovies, idForMovieToBeSkipped) {
    let FinalMovieList = [];
    if(lastSixMovies.length > 0 ) {
        const moviesList = lastSixMovies.filter(movie => movie.Id !== parseInt(idForMovieToBeSkipped));
        FinalMovieList = moviesList;
        if(moviesList.length>5) {
            FinalMovieList = moviesList.slice(0, 5);
        }
    }
    return FinalMovieList;
}

const MovieDetails = () => {
    const { id } = useParams();
    let [movieDetails, setMovieDetails] = useState(null);
    let lastSixMovies = useSelector(state => state.lastSixMovies);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!lastSixMovies.length) {
            fetchMovies()
                .then(data => {
                    dispatch(setLastSixMovies(data));
                    return data;
                })

                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        axios.get(`/movies/${id}`)
        .then(response => {
            setMovieDetails(response.data);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
    }, [id, lastSixMovies, dispatch]);
    lastSixMovies = useSelector(state => state.lastSixMovies);
    let FinalMovieList = getOnlyFiveMovies(lastSixMovies, id);
    lastSixMovies = FinalMovieList;
    if (!movieDetails) {
        return <div>Loading...</div>;
        // movieDetails = 
    }
    return (
        <div>
          <CenteredH1>  {movieDetails.Name}</CenteredH1>
          <MovieDetailsTemplate movie={movieDetails} />
          {/* <Carousel showThumbs={false} showStatus={false} autoPlay> */}
          <SliderContainer>
          {lastSixMovies.map(movie => (
            // <SliderContainer key={movie.Id}>
            //     <SlideImage src={movie.Image} alt={movie.Name} />
            // </SliderContainer>
            <Slide key={movie.id}>
                <Link key={movie.Id} to={`/movies/${movie.Id}`}>
                <SlideImg src={movie.Image} alt={movie.Name} />
                </Link>
                <h3>{movie.Name}</h3>
            </Slide>
        ))}
        </SliderContainer>
    {/* </Carousel> */}
        </div>
    );
}

export default MovieDetails;