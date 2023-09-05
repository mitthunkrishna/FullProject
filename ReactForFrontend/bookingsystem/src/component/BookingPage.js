import React, {useState, useEffect} from 'react';
import { useActionData, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  padding: 20px;
`;

const BookingHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ShowInfoContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 15px;
`;

const Showtime = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const BookingButton = styled.button`
  background-color: ${props => props.disabled ? '#ccc' : '#007bff'};
  color: ${props => props.disabled ? '#999' : '#fff'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const MoviePhoto = styled.img`
  height: 600px;
  width: 800px;
`;

const MovieDetails = styled.div`
  flex: 1;
  margin-top: 10px;
  margin-left: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: -7px;
  margin-bottom : 5px;
`;

const BookingPage = () => {
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState(''); 
    const [tickets, setTickets] = useState(1);
    const [showtimeReq, setShowtimeReq] = useState('');
    const [movieId, setMovieId] = useState('');
    const [theaterId, setTheaterId] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const { showtimeId } = useParams();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [showDetails, setShowDetails] = useState([]);
    const fetchShowDetails = async () => {
        try {
          const response = await axios.get(`/shows/${showtimeId}`);
          setShowDetails(response.data);
          setShowtimeReq(response.data.showdate);
          setMovieId(response.data.MovieId);
          setTheaterId(response.data.TheaterId);
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
        fetchShowDetails();
    }, [ showtimeId ]);

    const bookTickets = async() => {
        await axios.post(`/theaters/${theaterId}/movies/${movieId}/book-ticket`, {showtimeReq, tickets});
    }
    return (
        <div>
        {showDetails.length != 0  &&
        <div key={showDetails.Id}>
            <Wrapper>
            <MoviePhoto src={showDetails.Movie.Image} alt={showDetails.Movie.Name} />
            <MovieDetails>
            <Showtime>Date : {moment(showDetails.showdate).format('dddd, D MMMM YYYY')}</Showtime>
            <Showtime> ShowTime : {moment(showDetails.showdate).format('h:mm A')}</Showtime>
            <Form>
            {!loggedIn && <>
                <Label>Name:</Label>
                <Input type="text" placeholder='name' value={Name} onChange={(e) => setName(e.target.value)}/>

                <Label>Email:</Label>
                <Input type="text" placeholder='abc@gmail.com' value={Email} onChange={(e) => setEmail(e.target.value)}/>
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                <Label>Phone:</Label>
                <Input type="tel" placeholder='10-digit mobile number' value={Phone} onChange={(e) => setPhone(e.target.value)}/>
                {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
                </>}
            <Label>Number Of Tickets:</Label>
            <Input type="number" placeholder='1' value={tickets} onChange={(e) => setTickets(e.target.value)}/>
            </Form>
            <BookingButton disabled={tickets == 0} onClick={bookTickets}>
                Book Tickets
            </BookingButton>
            </MovieDetails>
            </Wrapper>
        </div>
      }
        </div>
    );
};

export default BookingPage;