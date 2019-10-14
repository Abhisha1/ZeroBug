import React from "react";
import {Link} from 'react-router-dom';
import { withAuthorization } from "./../../components/Session";

const HomePage = () => (
  <div>
    <h1>HOME! TEST!</h1>
    <Link
    to={{ pathname: '/family/Monkees', state: { name: 'Monkees'} }}
    >TEST VIEW FAM</Link>
  </div>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
