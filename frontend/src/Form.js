import React from "react";


const getCards = event => {
  event.preventDefault();
  console.log(event.target.value)
}

class Form extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
              <form style={{display: 'inline'}} onSubmit={this.props.getCards}>
                <label>API Key: </label>
                <input type='password' id='apiKey'></input>
                <button type='submit'>submit</button>
              </form>
              <span> | </span>
              <button onClick={()=>this.props.setView('graph')}>Graph View</button>&nbsp; 
              <button onClick={()=>this.props.setView('charts')}>Charts</button>
              <span>{ this.props.loading ? ' loading...' : '' }</span>
                <span>{ 
                  this.props.cards.length === 100 ? 
                  `Max of ${this.props.cards.length} cards reached` : 
                  !this.props.loading & this.props.cards.length > 0 ? ` ${this.props.cards.length} cards loaded.` : ''
                  }
                </span>
                <span>{ this.props.error ? ' oops, something went wrong.' : '' }</span>
            </div>
        );
    }
  
}

export default Form;
