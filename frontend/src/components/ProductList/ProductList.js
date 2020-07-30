import React, {useEffect, useState} from 'react'
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
  const [furnitures, setFurnitures] = useState([])
  const productDescription = {id: 1, title: "Mueble", description: "Mueble de madera", price: 60000, available_quantity: 5}

  useEffect(() => {
    axios.get('/product/furniture/').then((fornitures) => {
      setFurnitures(fornitures.data)
    })
  }, [])

  return(
    <>
      <Container className={classes.productContainer}>
        <Typography variant="h2" gutterBottom> Nuestros productos</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
          {furnitures.map((product, index) =>
            <Product key={index} {...product} product={product}></Product>
          )}
        </Box>
      </Container>
    </>
    
  );
}

export default ProductList;