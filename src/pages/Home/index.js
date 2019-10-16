
import React from "react";
import {Link} from 'react-router-dom';
import { withAuthorization } from "./../../components/Session";

const HomePage = () => (
  <div>
    <h1>HOME! TEST!</h1>
    <Link
    to={{ pathname: '/family/Rabbit', state: { name: 'Rabbit'} }}
    >TEST VIEW FAM</Link>
    <Link
    to={{ pathname: '/artefact/Test1', state: { name: 'Test1'} }}
    >TEST VIEW ARTEFACT</Link>
  </div>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);

