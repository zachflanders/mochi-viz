import React from 'react';
import './App.css';
import Form from './Form';
import Graph from './Graph';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      links: []
    }    
  }

  getCards = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('api_key', event.currentTarget.elements.apiKey.value);
    fetch('/api/cards', {
        method:'POST', 
        body:formData
    }).then(
        response => response.json()
    ).then(        
        data=>{
          this.setState({cards: data['cards'], links: data['links']})
        }
    )
  }

  render() {
    return (
      <div className="App">
        <Form getCards={this.getCards} />
        <Graph cards={this.state.cards} links={this.state.links} />
      </div>
    );
  }
  
}

export default App;
