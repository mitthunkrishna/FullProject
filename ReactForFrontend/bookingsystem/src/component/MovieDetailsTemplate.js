import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import BookTicketCardFiller from './BookTicketCardFiller';

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
  margin-left: 200px;
`;
const ButtonStyled = styled.button`
  margin-top : 30px;
  width : 220px;
  height : 40px;
  font-size: 18px;
  border-radius: 5px;
`;
const BookingCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width : 600px;
  height : 600px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: none;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;
`;
const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const MovieBookingTemplate = ({ movie }) => {
    const [isBookingCardOpen, setIsBookingCardOpen] = useState(false);

    const handleOpenBookingCard = () => {
        setIsBookingCardOpen(true);
    };
    
      const handleCloseBookingCard = () => {
        setIsBookingCardOpen(false);
    };

    return (
        <Wrapper>
        <MoviePhoto src={movie.Image} alt={movie.Name} />
        <MovieDetails>
            <p><b>Title</b> : {movie.Name}</p>
            <p><b>Description</b> : {movie.Description}</p>
            <p><b>Rating</b> : {movie.Rating}</p>
            <ButtonStyled onClick={handleOpenBookingCard}>Book Tickets</ButtonStyled>
            <BookingCard id="booking-card" isOpen={isBookingCardOpen}>
                <h2>Booking Information</h2>
                <BookTicketCardFiller movie = {movie}/>
                <button onClick={handleCloseBookingCard}>Close</button>
            </BookingCard>
        </MovieDetails>
        </Wrapper>
    );
};

export default MovieBookingTemplate;