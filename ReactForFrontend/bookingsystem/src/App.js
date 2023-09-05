import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './component/NavigationBar';
import Home from './component/Home';
import Contact from './component/Contact';
import Movie from './component/Movie';
import SignIn from './component/SignIn';
import Register from './component/Register';
import MyShows from './component/MyShows';
import MovieDetails from './component/MovieDetails';
import BookingPage from './component/BookingPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/Movies' element={<Movie/>}/>
        <Route path='/contact' element ={<Contact/>} />
        <Route path='/signIn' element = {<SignIn/>}/>
        <Route path='/register/user' element = {<Register/>}/>
        <Route path='/MyShows' element = {<MyShows/>}/>
        <Route path='/movies/:id' element = {<MovieDetails/>}/>
        <Route path="/book-tickets/:showtimeId" element={<BookingPage/>} />
      </Routes>
    </Router>

  );
}

export default App;
