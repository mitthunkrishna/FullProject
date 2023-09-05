import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './AuthContext';

const CardWrapper = styled.div`
  width: 350px; 
  height: 300px; 
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  background-color: #ffffff;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  margin-bottom: 10px;
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

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  margin-bottom: 10px;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: -7px;
  margin-bottom : 5px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top:-7px;
  margin-bottom:5px;
`

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setError('');
    setMessage('');
  
    try {
      const response = await axios.post('/login', { username, password});
      if (response.status === 201) {
          console.log('SignIn successful');
          setMessage('Successful Login');
          dispatch(login());
          setTimeout(()=>navigate('/home'), 1000);

      }
      else if(response.status === 401) {
          console.log('Sign-In Failed');
          setError('The User or Email is already in use');
      }
      else {
          setError('Try after sometime');
      }

  } catch (error) {
      console.log("An error occured while login", error);
      if (error.response && error.response.data) {
          setError(error.response.data.message || 'An error occurred during login.');
      } else {
          setError('An error occurred during login.');
      }
    }
  }
  return (
    <CardWrapper className="login-card">
      <Title>Login</Title>
      <Form>
        <Label>Username:</Label>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <Label>Password:</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>


        <Button type="button" onClick={handleLogin}>Login</Button>
      </Form>
      <div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {message && <SuccessMessage>{message}</SuccessMessage>}
      </div>
      <div>
        <div> Don't have an account? 
        <StyledLink to="/register/user"> Register</StyledLink>
        </div>
        <StyledLink to="/forgot-password"> Forgot Password?</StyledLink>
      </div>
    </CardWrapper>
  );
};


const SignIn = () => {
  return (
    <LoginCard/>
  );
};

export default SignIn;