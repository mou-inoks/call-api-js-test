import React, { Component } from 'react';
import './App.css';

const delay = ms => new Promise(res => setTimeout(res, ms));

class Table extends Component{
   
  constructor(props){
    super(props);
    this.state = {
      enclos: [],
      isRefreshDone: false,
      enclosFetchId: 0,
      nouvelEnclos: "",
      enclosFetch: {},
      enclosFetchTruncate: {},
      isLoading: false,
      isError: false,
    } 
  }

  //async fonction get request 

  async componentDidMount() {
    this.setState({isLoading:true})
    const response = await fetch('https://localhost:7003/api/Enclos')

    if(response.ok){
      const enclos = await response.json()
      this.setState({enclos:enclos, isLoading:false,isError:false})
    }else {
      this.setState({isLoading:false, isError:true})
    }
    this.refresh();
  }

  renderTableRows = () => {
    return this.state.enclos.map(enclos => {
      return (
        <tr key={enclos.id}>
          <td>{enclos.id}</td>
          <td>{enclos.type}</td>
          <td><button onClick={ () => this.onClick(enclos.id)}>DELETE</button></td>
        </tr>
      )
    })

  }

    onClick = (enclosId) => {
    this.deleteEnclos(enclosId).then(() => this.refresh())
  }


  refresh () {
      this.getEnclos().then((enclos) => this.setState({enclos: enclos}));
  }


render(){
  const {enclos,isLoading,isError} = this.state

  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Error..</div>
  }
  if(enclos?.length === 0){
    return <div>No Enclos found</div>
  }

  return <>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {this.renderTableRows()} 
      </tbody>
    </table>
    <div>
      <input type="text" value={this.state.enclosFetchId} onChange={(enclos) => this.setState({enclosFetchId: enclos.currentTarget.value})}></input>
      <button onClick={() => this.getEnclosId(this.state.enclosFetchId)}>Go</button>
      <div>{this.state.enclosFetch?.type}</div>
    </div> 
    {/* <div>
      <button onClick={() => this.getTruncateEnclosId(this.state.enclosFetchId)}>Go Truncate</button>
      <div>{this.state.enclosFetchTruncate?.type}</div>
    </div>  */}
    <div>
      <form>
        <h1>Nouvel enclos</h1>
        <label>Nom de l'enclos:  </label>
        <input type="text" value={this.state.nouvelEnclos} onChange={(v) => this.setState({nouvelEnclos: v.currentTarget.value})}></input>
        <button onClick={() => this.postEnclos(this.state.nouvelEnclos)}>Ajouter</button>
      </form>
    </div>
    </>
    
}


// function qui va : 
  //                    Récupréer les données dans notre bases de données 
  //                    convertir ces donées en fichier json et les mettre dans une variables 
  //                    retourne ces données 

  
async getEnclos(){
  var response = await fetch('https://localhost:7003/api/Enclos')
  var enclos = await response.json()
  return enclos
}

  // function qui va : 
  //                    Récupréer les données dans notre bases de données avec un id spécifique auquel on donne comme propriété le delete
async deleteEnclos(id) {
  
  // console.log("call")

  var enclos =  await fetch('https://localhost:7003/api/Enclos/' + id, {method:'DELETE'})

  // console.log("call back")

  // await delay(3000);

  // console.log("await......")

  // await delay(3000);

  // console.log("done")

  return enclos;
}


    // function qui va : 
  //                    Récupréer les données dans notre bases de données avec un id spécifique 
  //                    convertir ces donées en fichier json et les mettre dans une variables 
  //                    mettre la données dans un tableau initialiser dans l'objet state
// async getTruncateEnclosId(id) {
//   console.log("1: " )
//   const response = await fetch('https://localhost:7003/api/Enclos/' + id + "/truncate", {method: 'GET'})
//   console.log("2: ",  response)
//   var enclos = await response.json()
//   console.log("3: " )
//   this.setState({enclosFetch: enclos})
//   console.log("4: " )
// }

async getEnclosId(id) {
  console.log("1: " )
  const response = await fetch('https://localhost:7003/api/Enclos/' + id , {method: 'GET'})
  console.log("2: ",  response)
  var enclos = await response.json()
  console.log("3: " )
  this.setState({enclosFetch: enclos})
  console.log("4: " )
}


async postEnclos(enclos){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: enclos})
};
  const response = await fetch('https://localhost:7003/api/Enclos/', requestOptions);
  const data = await response.json();

  return data

}

}

export default Table;
