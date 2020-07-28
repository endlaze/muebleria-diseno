import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { InputLabel, Container } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  selector: {
    margin: '20px 20px 20px 20px',
    minWidth: 120,
  },
}));

const Workplace = () => {
  const classes = useStyles();

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])

  const [country, setCountry] = useState(0);
  const [state, setSta] = useState(0);

  useEffect(() => {
    getCountries();
  }, [])

  useEffect(() => {
    if (countries.length !== 0) {
      let statos = countries.find(count => count.id === country)
      statos = statos.states
      setStates(statos)
    }
  }, [country])



  const getCountries = () => {
    axios.get('location/country/').then(countries => {
      setCountries(countries.data)
    })
  }


  
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleStateChange = (event) => {
    setSta(event.target.value)
  }
  
  return(
    <>
    <Container>
    <FormControl className={classes.selector}>
        <InputLabel id="demo-simple-select-label">Pais</InputLabel>
        <Select
          value={country}
          onChange={handleCountryChange}
        >
          {countries.map((count, index) => 
            <MenuItem key={index} value={count.id}>{count.name}</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl className={classes.selector} disabled={country? false : true} >
        <InputLabel>Estado</InputLabel>
        <Select
          value={state}
          onChange={handleStateChange}
        >
          {states.map((sta, index) => 
            <MenuItem key={index} value={sta.id}>{sta.name}</MenuItem>
          )}

        </Select>
      </FormControl>
    </Container>
     
    </>
  );
}

export default Workplace;