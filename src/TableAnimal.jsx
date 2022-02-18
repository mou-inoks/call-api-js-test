import { Component } from 'react';
import './App.css';

class Table extends Component{
   
  constructor(props){
    super(props);
    this.state = {
      animal: [],
      animalIdValeur: 0,
      animalFetch: {},
      isLoading: false,
      isError: false,
    } 
  }

  //async fonction get request 


  async componentDidMount(){
    this.setState({isLoading:true})

    const response = await fetch('https://localhost:7003/api/Animal')
    console.log(response)
    if(response.ok){
      const animal = await response.json()
      this.setState({animal:animal,isLoading:false})
    }
    else {
      this.setState({isError:true,isLoading:false})
    }
    //Ceci reste a la fin
    this.refresh();
  }

  

  renderTableRows = () => {
    return this.state.animal.map(animals => {
      return ( 
      <tr key={animals.id}>
        <td>{animals.id}</td>
        <td>{animals.nom}</td>
        <td>{animals.age}</td>
        <td> <button onClick={() => this.deleteAnimals(animals.id)}>Delete</button></td>
      </tr>
      )
    })

  
  }

  render(){
    
    const {animals, isLoading, isError} = this.state

    

    if(isLoading){
      return<div>Loading...</div>
    }
    if(isError){
      return <div>Error...</div>
    }
    if(animals?.length === 0){
      return <div>No animals found</div>
    }
    
   
    return <>
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Age</td>
        </tr>
      </thead>
      <tbody>
        {this.renderTableRows()} 
      </tbody>
    </table>
    <div>
      <input type="text" value={this.state.animalIdValeur} onChange={(change) => this.setState({animalIdValeur: change.currentTarget.value})} />
      <button onClick={() => this.getAnimalsById(this.state.animalIdValeur)}>Find Animal</button>
      <div>{this.state.animalFetch?.nom}</div>
    </div>
    </>

    
  }

  
  async refresh () {
      while(true)
      {
            await new Promise(resolve => setTimeout(resolve, 120000))   
      }
  }

  // function qui va : 
  //                    Récupréer les données dans notre bases de données 
  //                    convertir ces donées en fichier json et les mettre dans une variables 
  //                    retourne ces données 

  async getAnimals() {

    var getAnimals = await fetch('https://localhost:7003/api/Animal/')

    const animals = await getAnimals.json()

    return animals;
  }

  // function qui va : 
  //                    Récupréer les données dans notre bases de données avec un id spécifique auquel on donne comme propriété le delete

  async deleteAnimals(id) {
    var getAnimal = await  fetch('https://localhost:7003/api/Animal/' + id, {method: 'DELETE'})
  }

    // function qui va : 
  //                    Récupréer les données dans notre bases de données avec un id spécifique 
  //                    convertir ces donées en fichier json et les mettre dans une variables 
  //                    retourne ces données 

  async getAnimalsById(id) {
    var getAnimalsById = await fetch('https://localhost:7003/api/Animal/' + id, {method: 'GET'})
    var animal = await getAnimalsById.json()
    this.setState({animalFetch: animal})
  }




}




export default Table;
