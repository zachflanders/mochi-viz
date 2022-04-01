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
            <form onSubmit={this.props.getCards}>
              <label>API Key: </label>
              <input type='password' id='apiKey'></input>
              <button type='submit'>submit</button>
              <span>{ this.props.loading ? ' loading...' : '' }</span>
              <span>{ 
                this.props.cards.length === 100 ? 
                `Max of ${this.props.cards.length} cards reached` : 
                !this.props.loading & this.props.cards.length > 0 ? ` ${this.props.cards.length} cards loaded.` : ''
                }
              </span>
              <span>{ this.props.error ? ' oops, something went wrong.' : '' }</span>

            </form>
        );
    }
  
}

export default Form;
