import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, FormControl, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  },
  button: {
    marginLeft: 20
  }
}));

const Furniture = () => {
  const classes = useStyles();

  const [furnitureTypes, setFurnitureTypes] = useState([])
  const [materials, setMaterials] = useState([])

  const [material, setMaterial] = useState('')
  const [furnitureType, setFurnitureType] = useState('')

  const [worplaces, setWorkplaces] = useState([])
  const [workplace, setWorkplace] = useState('')

  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const title = useInput('')
  const description = useInput('')
  const price = useInput('')
  const availableQuantity = useInput('')


  useEffect(() => {
    getMany(setMaterials, 'product/material/')
    getMany(setFurnitureTypes, 'product/furniture_type/')
    getMany(setWorkplaces, '/location/workplace/')
  }, [])

  const getMany = (setter, route) => {
    axios.get(route).then((res) => {
      setter(res.data)
    })
  }

  const submitFurniture = () => {
    axios.post('/account/employee/', {
      title: title.value,
      description: description.value,
      price: price.value,
      available_quantity: availableQuantity.value,
    }).then(() => {
      setSnack({ open: true, severity: 'success', message: 'Empleado creado.' })
    })

  }

  const handleChange = (setter, value) => {
    setter(value)
  }

  const validateForm = () => {
    return (title.value && description.value && price.value &&
      availableQuantity.value && furnitureType && material) || false
  }

  return (
    <Container>
      <div noValidate autoComplete="off">
        <TextField label="Titulo" variant="outlined" {...title} className={classes.input} />
        <TextField label="Descripcion" variant="outlined" {...description} className={classes.input} />
        <TextField label="Precio" variant="outlined" {...price} className={classes.input} />
        <TextField label="Cantidad disponible" variant="outlined" {...availableQuantity} className={classes.input} />
        <FormControl className={classes.input}>
          <InputLabel>Material</InputLabel>
          <Select
            value={material}
            onChange={e => handleChange(setMaterial, e.target.value)}
          >
            {materials.map((material, index) =>
              <MenuItem key={index} value={material.id}>{material.description}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel>Tipo de mueble</InputLabel>
          <Select
            value={furnitureType}
            onChange={e => handleChange(setFurnitureType, e.target.value)}
          >
            {furnitureTypes.map((type, index) =>
              <MenuItem key={index} value={type.id}>{type.description}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel>Tienda</InputLabel>
          <Select
            value={workplace}
            onChange={e => handleChange(setWorkplace, e.target.value)}
          >
            {worplaces.map((wp, index) =>
              <MenuItem key={index} value={wp.id}>{wp.wp_type === "1" ? "Sucursal " : "Taller "}{wp.state.name}</MenuItem>
            )}
          </Select>
        </FormControl>

      </div>
      <div>
        <Button onClick={() => submitFurniture()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={validateForm() ? false : true}
        >
          Agregar mueble
        </Button>
      </div>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>


    </Container>

  );
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value: value,
    onChange: handleChange
  }
}

export default Furniture;