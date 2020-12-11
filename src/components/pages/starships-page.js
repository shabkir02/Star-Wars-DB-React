import React, { Component } from 'react';

import {StarshipList, StarshipDetails} from '../sw-components';
import Row from '../row';

export default class StarshipPage extends Component {

  state = {
    selectedItem: 2
  }

  onItemSelected = (selectedItem) => {
    this.setState({selectedItem});
  }

  render() {
    const {selectedItem} = this.state;

    return (
      <Row 
        left={<StarshipList onItemSelected={this.onItemSelected} />}
        right={<StarshipDetails itemId={selectedItem}/>} />
    )
  }
}