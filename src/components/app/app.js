import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';
import ErrorMessage from '../error-message';
import Row from '../row';
import ItemDetails, {Record} from '../item-details';
import ItemList from '../item-list';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';


export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 1,
    showRandomPlanet: true,
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  render() {

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    if (this.state.hasError) {
      return <ErrorMessage/>
    }

    const {getPerson, getAllPeople, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>

          <Record field='gender' label='Gender:'/>
          <Record field='birthYear' label='Birth Year:'/>
          <Record field='eyeColor' label='Eye Color:'/>

      </ItemDetails>
    )

    const starshipDetails = (
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}> 

          <Record field='model' label='Model:'/>
          <Record field='length' label='Length:'/>
          <Record field='costInCredits' label='Cost:'/>

        </ItemDetails>
    )

    return (
      <ErrorBoundry>
        <div>
          <Header />

          <PersonDetails itemId={11}/>
          <PlanetDetails itemId={11}/>
          <StarshipDetails itemId={11}/>

          <PersonList/>
          <StarshipList/>
          <PlanetList/>
          
        </div>
      </ErrorBoundry>
    );
  }
  
};