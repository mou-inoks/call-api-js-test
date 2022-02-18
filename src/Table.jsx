import { Component } from 'react';
import './App.css';

class Table extends Component{
   
  constructor(props){
    super(props);
    this.state = {
      animalType: [],
      idFetchByid: 0,
      animalFetch: {}, 
      isLoading: false,
      isError: false,
    } 
  }

  //async fonction get request 


  async componentDidMount(){
    this.setState({isLoading:true})
    
    const response = await fetch('https://localhost:7003/api/AnimalType')

    if(response.ok){
      const animalType = await response.json()
      this.setState({animalType:animalType,isLoading:false})
    }
    else {
      this.setState({isError:true,isLoading:false})
    }
    this.refresh()
  }

  

  renderTableRows = () => {

    return this.state.animalType.map(items =>  {
      return (
        <tr key={items.id}>
            <td>{items.id}</td>
            <td>{items.race}</td>
            <td> <button onClick={() => this.deleteAnimalType(items.id)}>Delete</button></td>
        </tr>
        
       

      )
    })
  }
  render(){
    
    const {animalType, isLoading, isError} = this.state

    

    if(isLoading){
      return<div>Loading...</div>
    }
    if(isError){
      return <div>Error...</div>
    }
    
    if(animalType?.length === 0 )
      return <div>No animals</div>

     
    return <>
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {this.renderTableRows()} 
      </tbody>
    </table>
    <div>
        <input type="text" value={this.state.idFetchByid} onChange={(v) => this.setState({idFetchByid: v.currentTarget.value})}/>
        <button onClick={() => this.getAnimalTypeById(this.state.idFetchByid)}>Go</button>
        <div>{this.state.animalFetch?.race}</div>
    </div>
    </>

    
  }

  async getAnimalType (){

    let getAnimalsType = await fetch('https://localhost:7003/api/AnimalType')
    const animalType = await getAnimalsType.json()
    return animalType;

  }

  async deleteAnimalType(id) {
 
    await fetch('https://localhost:7003/api/AnimalType/' + id , { method: 'DELETE' })

  }

  async refresh () {
      while(true)
      {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let animals = await this.getAnimal();
            this.setState({animalType: animals})
      }
  }

  async getAnimalTypeById(id) {
      let response = await fetch('https://localhost:7003/api/AnimalType/' + id, {method: 'GET'})
      let animal = await response.json();
      this.setState({animalFetch: animal})
  }



}




export default Table;
