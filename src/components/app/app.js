import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorMessage from '../error-message';
import {SwapiServiceProvider} from '../swapi-service-contex';

import { 
  LoginPage,
  SecretPage,
  PeoplePage, 
  PlanetPage, 
  StarshipPage 
} from '../pages';

import './app.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    hasError: false,
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }


  render() {

    const {hasError, isLoggedIn} = this.state;

    if (hasError) {
      return <ErrorMessage/>
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService} >
          <Router>
            <div>
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet/>

              <Switch>
                <Route path="/" 
                      render={() => <h2>Welcome to StarBD</h2>}
                      exact />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" exact component={StarshipPage} />
                <Route path="/starships/:id" 
                      render={({match}) => {
                            const {id} = match.params;
                            return <StarshipDetails itemId={id} />
                        }} />
                <Route path="/login"
                      render={() => (
                        <LoginPage 
                            isLoggedIn={isLoggedIn}
                            onLogin={this.onLogin} />
                      )} />
                <Route path="/secret"
                      render={() => (
                        <SecretPage isLoggedIn={isLoggedIn}/>
                      )} />

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
  
};