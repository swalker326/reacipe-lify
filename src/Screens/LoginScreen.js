import React from 'react'
import { Container } from 'react-bootstrap'
import Login from "../components/auth/Login"

//Local Impots

const LoginScreen = () => {
return(
   <Container className='LoginScreen' >
     <Login />
   </Container>
 )
}

export default LoginScreen