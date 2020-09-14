import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (filterType)=>{
    this.setState({
      ...this.state,
      filters:{
        type: filterType
      }
    })
  }

  fetchPets = async ()=>{
    let filterType = this.state.filters.type;
    filterType = filterType === "all"? "" : "?type=" + filterType;
    const petsJson = await fetch(`/api/pets${filterType}`);
    const pets = await petsJson.json();
     console.log(pets)
    this.setState({
      ...this.state,
      pets: pets
    })
  }

  adoptPet = (id) => {
    const petIndex = this.state.pets.findIndex(pet=>pet.id === id);
    this.state.pets[petIndex].isAdopted = true;
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets = {this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
