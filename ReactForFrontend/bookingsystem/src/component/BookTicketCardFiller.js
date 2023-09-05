import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-au';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const ScrollableContainer = styled.div`
  max-height: 500px; /* Adjust the max-height as needed */
  overflow-y: auto;
`;
const StyledButtonLink = styled(Link)`
  display: inline-block;
  padding: 5px 10px;
  
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BookTicketCardFiller = ({movie}) => {
    const [theaterData, setTheaterData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const Id = movie.Id;
    const fetchTheaterDetailsWithShowTime = async() => {
        try {
            const response = await axios.get(`/movie/${Id}/FetchAllDetails`);
            const theaterDetails = response.data;

            const now = moment();
            const nextThreeDays = [now, now.clone().add(1, 'days'), now.clone().add(2, 'days')];
            const filteredTheaterData = theaterDetails.filter(item =>
                nextThreeDays.some(day => moment(item.showdate).isSame(day, 'day'))
            );
            const groupedByDateTheater = {};
            filteredTheaterData.forEach((item) => {
                const showdate = moment(item.showdate).format('YYYY-MM-DD');
                if (!groupedByDateTheater[showdate]) {
                    groupedByDateTheater[showdate] = {};
                }
                if (!groupedByDateTheater[showdate][item.Theater.Id]) {
                    groupedByDateTheater[showdate][item.Theater.Id] = {
                    theater: item.Theater,
                    showtimes: []
                    };
                }
                groupedByDateTheater[showdate][item.Theater.Id].showtimes.push({
                    showtime: item.showtime,
                    seatsAvailable: item.TicketsAvailable,
                    showId: item.Id,
                });
            });
            setTheaterData(groupedByDateTheater);
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchTheaterDetailsWithShowTime();
    }, [movie]);
    // const handleShowtimeClick = (showId) => {
        // const bookingUrl = `/book-tickets/${showId}`;
        // Link to ;x
        // Handle the booking logic here, e.g. redirect to booking page with theaterId and showtime
        // console.log(`Booking tickets for theater ${theaterId} at ${showtime}`);
    // };

    return(<div>
        {/* <ScrollableContainer> */}
        <ScrollableContainer>
            {theaterData &&
                Object.keys(theaterData).length > 0 &&
                Object.keys(theaterData).map((date) => (
                <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    style={{
                        backgroundColor: selectedDate === date ? 'blue' : 'transparent',
                        color: selectedDate === date ? 'white' : 'black',
                        border: '1px solid #ccc',
                        margin: '5px',
                        padding: '5px',
                        cursor: 'pointer',
                    }}
                >
                {moment(date).format('MMMM D')}
                </button>
            ))}
            {selectedDate &&
                theaterData[selectedDate] &&
                Object.values(theaterData[selectedDate]).map((theater) => (
                <div key={theater.theater.Id}>
                <h4>{theater.theater.Name}</h4>
                <ul>
                    {theater.showtimes.map((showtime) => (
                        <li key={showtime.showtime}>
                            {moment(showtime.showtime).format('h:mm A')}
                            <StyledButtonLink to={`/book-tickets/${showtime.showId}`}>
                                Book Tickets
                            </StyledButtonLink>
                        </li>
                    ))}
                </ul>
                </div>
            ))}
      </ScrollableContainer>
    </div>);
};

export default BookTicketCardFiller;