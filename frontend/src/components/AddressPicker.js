import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  }
}));

const AddressPicker = ({ address, setter }) => {
  const classes = useStyles()
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    console.log(address)
    getMany(setAddresses, 'account/client/')
  }, [])

  const getMany = (setter, route) => {
    const id = localStorage.getItem('user')
    axios.get(route).then((res) => {
      const user = res.data.filter((user) => { return parseInt(user.id) === parseInt(id) })
      setter(user[0].addresses)
    })
  }

  const handleChange = (setter, value) => {
    setter(value);
  }

  return (
    <div className>
      <FormControl className={classes.input}>
        <InputLabel>Dirección</InputLabel>
        <Select
          value={address}
          onChange={e => handleChange(setter, e.target.value)}
        >
          {addresses.map((address, index) =>
            <MenuItem key={index} value={address.id}>{address.address_line}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}



export default AddressPicker