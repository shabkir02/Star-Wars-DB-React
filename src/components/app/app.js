import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorMessage from '../error-message';
import {SwapiServiceProvider} from '../swapi-service-contex';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import './app.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }


  render() {

    if (this.state.hasError) {
      return <ErrorMessage/>
    }


    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService} >
          <Router>
            <div>
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet/>

              <Route path="/" 
                     render={() => <h2>Welcome to StarBD</h2>}
                     exact />
              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" component={StarshipPage} />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
  
};