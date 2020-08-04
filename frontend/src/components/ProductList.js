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
  const [stock, setStock] = useState([])
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    axios.get('/product/furniture/').then((fornitures) => {
      setStock(fornitures.data)
    })
    axios.get('/product/promotion/').then((promotions) => {
      setPromotions(promotions.data)
    })
  }, [])


  useEffect(() => {
    if(stock.length !== 0) {
      applyDiscounts()
    }
  }, [stock, promotions])


  const applyDiscounts = () => {
    setFurnitures(stock.map((furniture) => { 
      let furn =   applyDiscount(furniture) 
      return furn
      }))
  }

  const applyDiscount = (furniture) => {
    let discount = 0
    let selling = parseInt(furniture.price)
    let promotion = promotions.find((promotion) => parseInt(promotion.product) === parseInt(furniture.id) &&
    new Date(promotion.final_date + "T00:00:00") >= new Date())

    if (promotion !== undefined) {
      discount = parseFloat(promotion.discount)
      selling = selling * (1 - discount)
    } 

    return {...furniture, discount: discount, selling_price: selling}

  }

  return(
    <>
      <Container className={classes.productContainer}>
        <Typography variant="h2" gutterBottom> Nuestros productos</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
          {furnitures.map((product, index) =>
            <Product key={index} {...product} product={product} selling_price={product.selling_price}></Product>
          )}
        </Box>
      </Container>
    </>
    
  );
}

export default ProductList;