import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, FormControl, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 1000,
  },
  button: {
    marginLeft: 20
  }
}));

const Promotion = () => {
  const classes = useStyles();

  const [grades] = useState([
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "7" },
      { value: "8" },
      { value: "9" },
      { value: "10" },
    ])
  const [grade, setGrade] = useState('')

  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const comment = useInput('')

  const submitReview = () => {
      axios.post(/*DIRECCION DEL POST DE LA REVIEW ,*/ {
          comment: comment.value,
          grade: grade,
      }).then(() => {
          setSnack({ open: true, severity: 'success', message: 'Reseña envada.' })
      })
  }

  const handleChange = (setter, value) => {
    setter(value)
  }

  const validateForm = () => {
    return (comment.value && grade) || false
  }

  return (
    <Container>
      <div noValidate autoComplete="off">

        <FormControl className={classes.input}>
            <InputLabel>Nota</InputLabel>
            <Select
                value={grade}
                onChange={e => handleChange(setGrade, e.target.value)}
            >
                {grades.map(grade => 
                    <MenuItem key={grade.value} value={grade.value}>{grade.value}</MenuItem>
                )}
            </Select>
        </FormControl>

        <TextField label="Comentario" variant="outlined" {...comment} className={classes.input} />

      </div>
      <div>
        <Button onClick={() => submitReview()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={validateForm() ? false : true}
        >
          Enviar reseña
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

export default Promotion;