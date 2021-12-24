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
            </form>
        );
    }
  
}

export default Form;
