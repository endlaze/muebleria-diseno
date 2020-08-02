import React, { useContext, useState, useEffect } from 'react'
import { Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { useStore } from '../Store'
import axios from 'axios'
import Cart from '../components/Cart';
import AddressPicker from '../components/AddressPicker';
import Payments from '../components/Payments'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
}));

const Checkout = () => {
  const classes = useStyles();
  const [store, dispatch] = useStore();
  const [address, setAddress] = useState('')

  const placeOrder = () => {
    const id = localStorage.getItem('user')
    axios.post('/order/ord/', {
      delivered: false,
      ord_products: store.cart.map((prod) => ({product_obj: prod.id, quantity: prod.quantity})),
      client: id
    })
  }

  const placeDelivery = (orderId) => {

  }

  return (
    <>
      <Container>
        <Box className={classes.paper}>
          <Typography variant="h2">
            Carrito
        </Typography>
        </Box>
        {store.cart.length > 0 ?
          <div>
            <Cart/>
            <div className={classes.input}>
              <Typography variant="subtitle1">
                Seleccione una direccion
              </Typography>
              <AddressPicker address={address} setter={setAddress}/>
            </div>
            <div className={classes.input}>
              <Typography variant="subtitle1">
                Datos de tarjeta de credito
              </Typography>
              <TextField label="Número de tarjeta" variant="outlined" className={classes.input} />
              <TextField label="Fecha de vencimiento" variant="outlined" className={classes.input} />
              <TextField label="CVV" variant="outlined" className={classes.input} />
              <Payments/>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={()=> placeOrder()}>
                Pagar
              </Button>
            </div>
          </div>
          :
          <Box className={classes.paper}>
            <Typography variant="h4">
              Su carrito esta vacio
          </Typography>
          </Box>
        }




      </Container>
    </>
  );
}

export default Checkout;