import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorMessage from '../error-message';

import './people-page.css'

export default class PeoplePage extends Component {

  state = {
    selectedPerson: 1,
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
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

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList 
            onItemSelected={this.onPersonSelected}
            getData={this.props.getData}
            renderItem={({name, gender, birthYear}) => `${name}  (${gender},  ${birthYear})`} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    )
  }
}