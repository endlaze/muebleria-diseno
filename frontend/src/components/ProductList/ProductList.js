import React, {useEffect} from 'react'
import './ProductList.css'
import Product from '../Product/Product'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles({
  productContainer: {
    marginTop: '50px'
  },
  product: {
    margin: 'auto',
    marginTop: '20px'
  }
})

const ProductList = () => {
  const classes = useStyles();
  const productDescription = {title: "Mueble", description: "Mueble de madera", price: 60000, available_quantity: 5}
  // useEffect(() => {
  //   axios.get('/product/furniture/').then((forniture) => {
  //     productList = forniture.data
  //   })
  // })
  const productList = [] 
  for (let index = 0; index < 10; index++) {
    productList.push(productDescription)
  }

  const productsflex = productList.map((product, index) =>
    <Product key={index} {...product} product={product}></Product>
  );

  return(
    <>
      <Container className={classes.productContainer}>
        <Typography variant="h2" gutterBottom> Nuestros productos</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
            {productsflex}
        </Box>
      </Container>
    </>
    
  );
}

export default ProductList;