import React, {useState} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail, validatePhone, validatePassword, validatePasswordRegex } from './Utils/utility';


const CardWrapper = styled.div`
  width: 350px; 
  height: 600px; 
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
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [retypePassword, setRetypePassword] = useState(''); // New state for retyped password
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setMessage('');
        if(!validateEmail(Email)) {
            setEmailError('Invalid email address');
            return;
        }
        if (!validatePhone(Phone)) {
            setPhoneError('Invalid phone number');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }
        if(!validatePasswordRegex(password)) {
            setPasswordError('Password must follow the pattern can only have small-case, upper-case and a number from 0-30');
            return;
        }
        if (password !== retypePassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/register/User', { Name, Phone, Email, password, username});
            if (response.status === 201) {
                console.log('Registration successful');
                setMessage('Successful Registered');
                setTimeout(() => navigate('/signIn'), 2000);
            }
            else if(response.status === 401) {
                console.log('Registration failed');
                setError('The User or Email is already in use');
            }
            else {
                setError('Try after sometime');
            }

        } catch (error) {
            console.log("An error occured while registering", error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred during registration.');
            } else {
                setError('An error occurred during login.');
            }
        }
    }
    return (
    <CardWrapper className="Register-card">
        <Title>Register</Title>
        <Form>
        <Label>Name:</Label>
        <Input type="text" placeholder='name' value={Name} onChange={(e) => setName(e.target.value)}/>

        <Label>Email:</Label>
        <Input type="text" placeholder='abc@gmail.com' value={Email} onChange={(e) => setEmail(e.target.value)}/>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <Label>Phone:</Label>
        <Input type="tel" placeholder='10-digit mobile number' value={Phone} onChange={(e) => setPhone(e.target.value)}/>
        {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

        <Label>Username:</Label>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <Label>Password:</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

        <Label>Retype Password:</Label>
        <Input type="Retype Password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="button" onClick={handleRegister}>Register</Button>
        <div>
        {message && <SuccessMessage>{message}</SuccessMessage>}
        </div>
        </Form>
        <div>Already have an account? 
        <StyledLink to="/signIn"> Sign-In</StyledLink>
        </div>
    </CardWrapper>
    );
};


const Register = () => {
  return (
    <LoginCard/>
  );
};

export default Register;