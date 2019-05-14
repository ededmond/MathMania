import React, {Component} from 'react';
import './style.css';
import FractionBlock from "../FractionBlock";
import FractionContext from "../Fraction-context";
class FractionContainer extends Component {
    state = {
      select : false,
      sum: 0,
      reset: false
    }
    reset = () => {
      this.setState({
        select: false,
        sum: 0,
        reset: !this.state.reset
      });
    }
    select = () => {
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
      <FractionContext.Provider  value={{
        select:this.state.select, 
        addToSum:this.addToSum,
        imageURL :"url('/images/mountain.jpg')",
        dullURL : "url('/images/mountain-fade.jpg')",
        reset: this.state.reset
      }}>
        <FractionBlock 
            height= {500}
            width = {500}
            fraction = {1}
            coordinates = {[0,0]}
        />
        <div class="btn-div">
        <button id="reset-btn" class=" btn btn-secondary" onClick={this.reset}>Reset</button>
        <button id="select-btn" class=" btn btn-info" onClick={this.select}>Select</button>
        <h3>{this.state.sum}</h3>
        </div>

      </FractionContext.Provider>
      
    );
  };
}

export default FractionContainer;
