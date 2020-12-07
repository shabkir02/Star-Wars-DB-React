import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorMessage from '../error-message';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {

  state = {
    selectedPerson: 1
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList 
            onItemSelected={this.onPersonSelected}
            getData={this.props.getData}
            renderItem={({name, gender, birthYear}) => `${name}  (${gender},  ${birthYear})`} >
      </ItemList>
    )

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    )

    return (
       <Row left={itemList} right={personDetails} />
    )
  }
}