import SignIn from './components/Authentication/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Addproject from './components/AddProject';
import clients from './components/Clients';
import AuthorizationComponent from './components/Authorization/AuthorizationRoute';
import ClientDashboard from './components/ClientDashboard';
import './App.css';
import Store from './components/contextApi/store';
import HomePage from './components/HomePage';
import ContextTestingComp from './components/ContextTestingComp';
// import {Context2} from './components/contextApi/store2';

function App() {
  return (
    <Container>
      <Store>
        {/* <Context2> */}
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/testing'>
              <ContextTestingComp />
            </Route>
            <Route path='/sign-in'>
              <SignIn />
            </Route>
            <Route path='/client-dashboard'>
              <ClientDashboard />
            </Route>
            <Route path='*'>
              <ClientDashboard /> 
            </Route>
            <AuthorizationComponent>
              
              <Route path='/add-project'>
                <Addproject />
              </Route>
            </AuthorizationComponent>
          </Switch>
        </Router>
        {/* </Context2> */}
      </Store>
    </Container>
  );
}

export default App;
