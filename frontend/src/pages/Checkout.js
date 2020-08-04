import React, { useContext, useState, useEffect } from 'react'
import { Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { useStore } from '../Store'
import axios from 'axios'
import Cart from '../components/Cart';
import AddressPicker from '../components/AddressPicker';
import Payments from '../components/Payments'
import browserStore from 'store'
import { useHistory } from 'react-router-dom';

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

  const {login_type} = browserStore.get('user')
  let history = useHistory();

  const placeOrder = () => {
    const { id } = browserStore.get('user')
    axios.post('/order/online/', {
      delivered: false,
      ord_products: store.cart.map((prod) => ({product_obj: prod.id, quantity: prod.quantity})),
      client: id
    }).then((res)=> {
      placeDelivery(res.data.id)
      
    })
  }

  const placeDelivery = (orderId) => {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 2);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + "-" + month + "-" + day;
    axios.post('/order/delivery/', {
      order: orderId,
      delivery_date: newdate,
      status: 1
    }).then((res) => {
      dispatch({type: 'clear-cart'})
      history.replace('/orders');
    })
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
            {login_type === 'client' ? 
              <>
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
                  
                </div>
              </>
              :
              <div className={classes.input}>
                <Payments/>
              </div>
            }
            
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