import React, {Component} from 'react';
import './style.css';
import FractionBlock from "../FractionBlock";
import FractionContext from "../Fraction-context";
class FractionContainer extends Component {
    state = {
      select : false,
      sum: 0
    }
    reset = () =>{
        
    }
    select = () =>{
      console.log(this.state);
      this.setState({
        select: !this.state.select
      })
    }
    addToSum = (fraction) => {
      this.setState({
        sum : this.state.sum +(1/fraction)
      })
    }
  render() {
    return (
      <FractionContext.Provider value={{select:this.state.select, addToSum:this.addToSum}}>
        <FractionBlock 
            height= {400}
            width = {500}
            fraction = {1}
            select = {this.state.select}
        />
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.select}>Select</button>
        <h3>{this.state.sum}</h3>
      </FractionContext.Provider>
      
    );
  };
}

export default FractionContainer;
