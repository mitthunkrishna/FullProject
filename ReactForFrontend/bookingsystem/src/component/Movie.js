import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setLastSixMovies } from './LastSixMovieSlice';

const CarouselContainer = styled.div`
  max-width: 1300px;
  max-height: 800px;
  margin: 0 auto;
  overflow: hidden;
  display: flex; 
  align-items: center; 
  justify-content: center; 
`;

const CarouselContainer1 = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  overflow: hidden;
  display: flex; 
  align-items: center; 
  justify-content: center; 
`

const CarouselImage = styled.img`
  width: 250px;
  height: 680px;
`;
// const SlideShowInside = styled.div`
//   width: 200px;
//   height:700px;
// `

// const SlideshowMovie = styled.div`
//   flex: 0 0 20%; /* Display 5 movies in a row */
//   padding: 5px;
// `;

// const SlideshowImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Display 3 movies in a row */
  gap: 20px;
`;

const GridMovie = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const GridImage = styled.img`
  max-width: 100%;
  height: 90%;
  margin-bottom: 10px;
`;

const MoviesList = () => {
  const dispatch = useDispatch();
  // const [movies, setMovies] = useState([]);
  const [slideshowMovies, setSlideShowMovies] = useState([]);
  const [gridMovies, setGridMovies] = useState([]);
  useEffect(() => {
    // Fetch movies from the backend API
    axios.get('/movies')
      .then(response => {
        const data = response.data;
        // setMovies(response.data);
        setSlideShowMovies(data.slice(0, 5));
        if (data.length > 5) {
          setGridMovies(data.slice(5));
          dispatch(setLastSixMovies(data.slice(-6)));
        } else {
          setGridMovies([]);
          dispatch(setLastSixMovies([]));
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div>
      {/* <h2>Movies List</h2> */}
      <CarouselContainer>
      <Carousel autoPlay>
        {slideshowMovies.map((movie) => (
          <div>
          <Link key={movie.Id} to={`/movies/${movie.Id}`}>
            <div>
            <CarouselImage src={movie.Image}/>
            </div>
          </Link>
          <div><h3>{movie.Name}</h3></div>
          </div>
        ))}
      </Carousel>
      </CarouselContainer>
      <CarouselContainer1>
      <Grid className="movies-grid">
        {gridMovies.map((movie) => (
          <GridMovie key={movie.Id} className="movie-card">
            <Link key={movie.Id} to={`/movies/${movie.Id}`}>
            <GridImage src = {movie.Image} />
            </Link>
            <h3>{movie.Name}</h3>
          </GridMovie>
        ))}
      </Grid>
      </CarouselContainer1>
    </div>
  );
};

export default MoviesList;
