import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import {useStore} from '../Store'
const useStyles = makeStyles({
  product: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
});

const Product = ({title, description, price, available_quantity, product, selling_price}, props) => {
  const [store, dispatch] = useStore();
  const classes = useStyles();
  return (
    <Card className={classes.product} {...props}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={product.picture || "https://politify.us/wp-content/uploads/2018/11/mesas-de-madera-para-comedor-arquitectura-casas.jpg"}
          title={title}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {product.id}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {price}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {selling_price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body2" component="p">
            Cantidad disponible: {available_quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
        onClick={()=> dispatch({type: 'add-to-cart', furniture: product})}
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCart/>}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;