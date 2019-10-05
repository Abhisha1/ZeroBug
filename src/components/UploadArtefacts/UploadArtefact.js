import React from 'react';

// Firebase API
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// The Initial state of al values for an upload Artefact form
const INIT_STATE = {
  artifactID: '',
  name: '',
  origin: '',
  currentOwner: null,
  description: '',
  year: null,
};

function UploadArtefact(props) {
  const = useStyles();
  const [values, setValues] = React.useState(INIT_STATE);

  // Updates the values of the state on change
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handles submission of a new created artefact to Firebase
  const onSubmit = event => {

  };

  return (

  );
}

export default withRouter(withFirebase(UploadArtefact));
