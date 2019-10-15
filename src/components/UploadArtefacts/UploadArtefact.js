import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';

// Firebase API
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// The Initial state of al values for an upload Artefact form
const INIT_STATE = {
  artefactName: '',
  currentOwner: null,
  description: '',
  year: null,
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(100),
    padding: theme.spacing(3)

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: primary,
  },
}));

function UploadArtefactForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(INIT_STATE);

  // Updates the values of the state on change
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {
    event.preventDefault();
  };

  // Defines when to enable the ability to upload the artefact
  const isInvalid =
    values.artefactName === '' ||
    values.year === null ||
    values.description === '';

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <TextField
        margin="normal"
        name="artefactName"
        variant="outlined"
        required
        fullWidth
        className={classes.textField}
        id="artefactName"
        lable="Artefact Name"
        autoFocus
        onChange={handleChange("artefactName")}
      />
      <TextField
        margin="normal"
        name=""
        variant="outlined"
        required
        fullWidth
        className={classes.textField}
        id="artefactName"
        lable="Artefact Name"
        autoFocus
        onChange={handleChange("artefactName")}
      />
      <TextField
          id="outlined-multiline-static"
          label="Artefact Description"
          multiline
          fullWidth
          rows="4"
          defaultValue="A little bit about this artefact!"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange("description")}
      />
      <Button
        type="submit"
        fullWidth
        onSubmit={onSubmit}
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isInvalid}
      >
        Submit
      </Button>
    <form />
  );
}

export default withRouter(withFirebase(UploadArtefactForm));
