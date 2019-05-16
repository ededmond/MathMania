import React, {Component} from 'react';
import './style.css';
import FractionBlock from "../FractionBlock";
import FractionContext from "../Fraction-context";
import MultiplySlider from "../Multiply-Slider";
import MultiplyLayer from "../Multiply-Layer";
class FractionContainer extends Component {
    state = {
      select : false,
      sum: 0,
      multiply: 1,
      reset: false
    }
    reset = () => {
      this.setState({
        select: false,
        sum: 0,
        multiply: 1,
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
  changeMultiply = event => {
    this.setState({
      multiply: event.target.value
    })
  }
  layer = () => {
    const multiplyArray = Array.apply(null, Array(parseInt(this.state.multiply))).map(function () {});
    return (<div className = "layers">
      {multiplyArray.map((value,index,array) => {
        return(<MultiplyLayer key = {index}
          height = {500}
          width = {500}
          index = {index + 1}
        />)
      })}
    </div>)
  }
  render() {
    return (
      <div id ="fraction-div">
      <FractionContext.Provider  value={{
        select:this.state.select, 
        addToSum:this.addToSum,
        multiply: this.state.multiply,
        imageURL :"url('/images/mountain.jpg')",
        dullURL : "url('/images/mountain-fade.jpg')",
        reset: this.state.reset
      }}>
        <FractionBlock 
            height= {500}
            width = {500}
            fraction = {1}
            coordinates = {[0,0]}
            
        >
          {this.layer()}
        </FractionBlock>
        <MultiplySlider 
          multiply={this.state.multiply}
          onChange = {this.changeMultiply}
        />

        <div class="btn-div">
        <button id="reset-btn" class=" btn btn-secondary" onClick={this.reset}>Reset</button>
        <button id="select-btn" class=" btn btn-info" onClick={this.select}>Select</button>
        <h3>{this.state.sum * this.state.multiply}</h3>
        </div>

      </FractionContext.Provider>
      </div>

      
    );
  };
}

export default FractionContainer;
