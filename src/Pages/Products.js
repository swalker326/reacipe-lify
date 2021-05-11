import React from 'react'
import { Container } from 'react-bootstrap'
//Local Impots
import Products from '../Components/Products/Products';

const ProductScreen = () => {
return(
   <Container className='ProductScreen' >
     <Products />
   </Container>
 )
}

export default ProductScreen