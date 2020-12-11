import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorMessage from '../error-message';
import {SwapiServiceProvider} from '../swapi-service-contex';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import './app.css';


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
          <div>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet/>

            <PeoplePage/>
            <PlanetPage/>
            <StarshipPage/>

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
  
};