import React, { useEffect, useState } from 'react'
import { Grid, Typography, Container, makeStyles, Box, Paper, Button } from '@material-ui/core'
import store from 'store'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({

  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  order: {
    margin: theme.spacing(1, 0)
  },
  product: {
    margin: theme.spacing(0, 1)
  }

}));


const Orders = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    orders: []
  })

  useEffect(()=> {
    getOrders('/order/online/')
  }, [])

  const getOrders = (route) => {
    const { id } = store.get('user')

    axios.get(route).then((res) => {
      const orders = res.data.filter((order) => { return parseInt(order.client) === parseInt(id) })
      setState({...state, orders})
    })

  }

  return(
    <Container>
      <Box className={classes.paper}>
          <Typography variant="h2">
            Ordenes
        </Typography>
        </Box>
      {state.orders.map((order, index) =>
        <Paper key={index} className={classes.order}>
          <Typography variant="h4">
            Orden : {order.id}
          </Typography>
          <Typography variant="caption">
            {order.date}
          </Typography>
          <Grid  container >
            {order.ord_products.map((prod, key) => 
              <Grid className={classes.product} item key={key}>
                  <Typography>Titulo de producto: {prod.product.title}</Typography>
                  <Typography>Cantidad pedida: {prod.quantity}</Typography>
                  <Typography>Cantidad en backorder: {prod.backorder_quantity}</Typography>
                  <Typography color="primary">Escribir una review</Typography>
                  
              </Grid> 
            )}
            
          </Grid>
          
        </Paper>
        
      )}
    </Container>
  );
}

export default Orders;