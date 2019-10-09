import React from "react";
import {Link} from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>HOME! TEST!</h1>
    <Link
    to={{ pathname: '/family/Monkees', state: { name: 'Monkees'} }}
    >TEST VIEW FAM</Link>
  </div>
);


export default HomePage;
