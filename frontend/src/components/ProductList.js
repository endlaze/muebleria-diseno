import React, {useEffect, useState} from 'react'
import Product from './Product'
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

  useEffect(() => {
    axios.get('/product/furniture/').then((fornitures) => {
      setFurnitures(fornitures.data)
    })
  }, [])

  const discounts = [{id: 1, product_id: 1, discount_price: 500, finish_date: '2020-12-1'}]

  const applyDiscounts = () => {
    furnitures.map((furniture)=> (applyDiscount(furniture)))
  }

  const applyDiscount = (furniture) => {
    for(let discount in discounts) {
      if (discount.product_id === furniture.id){
        return {...furniture, discount_price: discount.discount_price}
      }
    }
    return furniture
  }

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