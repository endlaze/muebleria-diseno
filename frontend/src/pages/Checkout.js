import React, { useContext, useState, useEffect } from 'react'
import { Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStore } from '../Store'


const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 20px 0 20px',
    minWidth: 200,
  },
  button: {
    marginLeft: 20
  },
  image: {
    margin: '20px 20px 20px 20px',
    maxWidth: 200
  },
  deleteContainer: {
  },
  deteleButton: {
    margin: 0,
    top: ' 50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    margin: theme.spacing(3, 0),
  }
}));

const Checkout = () => {
  const classes = useStyles();

  const [store, dispatch] = useStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0
    store.cart.forEach(product => {
      tot += parseInt(product.price) * parseInt(product.quantity)
    });
    setTotal(tot)
  }, [store])

  const handleProductChange = (value, id) => {
    dispatch({ type: 'change-quantity', quantity: value, id: id })
  }

  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'Titulo', },
    { title: 'Descripcion', },
    { title: 'Cantidad', },
    { title: 'Precio' },
    { title: 'Eliminar', },

  ])

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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {itemsTCols.map(itemCol => {
                    return <TableCell>{itemCol.title}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {store.cart.map((product, index) =>
                  <TableRow>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{ inputProps: { min: 1 } }}
                        type="number"
                        value={product.quantity}
                        onChange={e => handleProductChange(e.target.value, product.id)}
                        label="Cantidad" variant="outlined" className={classes.input} />
                    </TableCell>
                    <TableCell>
                      {parseInt(product.price) * parseInt(product.quantity)}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => dispatch({ type: 'delete-from-cart', id: product.id })}
                        variant="contained"
                        color="secondary"
                      >
                        <DeleteIcon className={classes.deleteIcon}></DeleteIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div>
              <Typography variant="h4">
                Total {total}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1">
                Seleccione una direccion
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1">
                Datos de tarjeta de credito
              </Typography>
              <TextField label="Número de tarjeta" variant="outlined" className={classes.input} />
              <TextField label="Fecha de vencimiento" variant="outlined" className={classes.input} />
              <TextField label="CVV" variant="outlined" className={classes.input} />
            </div>
            <div>
              <Button variant="contained" color="primary">
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