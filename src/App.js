import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Homepage from "./pages/Homepage"
class App extends Component {
    render() {
        return (
            <Router>
      
                <Route exact path="/" component = {Homepage} />
            </Router>
          );
    }
}
export default App;