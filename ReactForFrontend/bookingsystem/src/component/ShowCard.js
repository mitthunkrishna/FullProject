import React, {useState} from 'react';
import styled from 'styled-components';

const ShowCardWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
`
const ChummaWrapper = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  flex-direction:row;
`;

const ShowImage = styled.div`
  flex: 1;
  margin-right: 10px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ShowDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieName = styled.h3`
  margin: 0;
`;

const ShowTime = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
`;

const TicketsBooked = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
`;
const TheaterDetails = styled.div`
  padding: 10px;
`;

const Image = styled.img`
  width:250px;
  height:70px;
`;
// const Theaters = styled.div`
//   flex-direction: row; 
//   justify-content: space-between;
// `

const ShowCard = ({ show }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <ShowCardWrapper onClick={toggleExpand}>
      <ChummaWrapper>
      <ShowImage>
        <Image src={show?.Movie?.Image} alt={show?.Movie?.Name} />
      </ShowImage>
      <ShowDetails>
        <MovieName>{show?.Movie?.Name}</MovieName>
        <ShowTime>Show Time: {show?.Show?.showdate}</ShowTime>
        <TicketsBooked>
          Tickets Booked: {show?.Tickets} {show?.Tickets === 1 ? 'ticket' : 'tickets'}
        </TicketsBooked>
      </ShowDetails>
      </ChummaWrapper>
      {/* <Theaters> */}
      <div>
      {(expanded &&
        <TheaterDetails expanded={expanded}>
          <p>Theater: {show.Theater.Name}</p>
          <p>Address: {show.Theater.Address}</p>
        </TheaterDetails>
      )}
      </div>
      {/* </Theaters> */}
      </ShowCardWrapper>
  );
};

export default ShowCard;
