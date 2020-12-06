import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorMessage from '../error-message';
import PeoplePage from '../people-page';

import './app.css';

export default class App extends Component {

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

    return (
      <div>
        <Header />
        {planet}
        <button
          onClick={this.toggleRandomPlanet}
          className="btn btn-warning btn-lg mr-3" >Toggle random planet</button>
        <ErrorButton/>
        <PeoplePage/>
      </div>
    );
  }
  
};