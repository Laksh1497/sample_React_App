import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Department from './Department/Department';
import Employee from './Employee/Employee';
import Navigation from './Navigation/Navigation';

import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <h3 className = "m-3 d-flex justify-content-center">
        React.js Tutorial
      </h3>
      <Navigation/>
      <Switch>
        <Route path = "/" exact component = {Home}/>
        <Route path = "/department"  component = {Department}/>
        <Route path = "/employee" exact component = {Employee}/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
