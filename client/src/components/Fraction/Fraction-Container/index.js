import React, {Component} from 'react';
import './style.css';
import FractionBlock from "../FractionBlock";
import FractionContext from "../Fraction-context";
import MultiplySlider from "../Multiply-Slider";
import MultiplyLayer from "../Multiply-Layer";
class FractionContainer extends Component {
    state = {
      select : false,
      sum: {},
      multiply: 1,
      reset: false,
      imageURL: '',
      dullURL: ''
    }
    reset = () => {
      this.setState({
        select: false,
        sum: {},
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
      let sum = this.state.sum;
      if (fraction > 0) { //positive
        sum[fraction] = (this.state.sum[fraction] || 0 ) + 1
      } else {
        let newVal = sum[-fraction]- 1;
        if (newVal < 1) {
          delete sum[-fraction];
        } else {
          sum[-fraction] = newVal
        }
      }
      console.log(sum);
      this.setState({
        sum
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
  componentDidMount(){
    if(this.props.user.difficulty === 'beginner'){
      this.setState({ 
        imageURL: "url('/images/ET.jpg')",
        dullURL : "url('/images/ET2.jpg')"
      })
    }else if(this.props.user.difficulty=== 'intermediate'){
      this.setState({ 
        imageURL: "url('/images/wallie.png')",
        dullURL : "url('/images/wallie2.png')"
      })
    }else {
      this.setState({ 
        imageURL: "url('/images/yoda.jpeg')",
        dullURL : "url('/images/yoda2.jpg')"
      })
    }
  }
  render() {
    return (
      <div id ="fraction-div">
      <FractionContext.Provider  value={{
        select:this.state.select, 
        addToSum:this.addToSum,
        multiply: this.state.multiply,
        imageURL : this.state.imageURL,
        dullURL : this.state.dullURL,
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
        <div style = {{
          height: this.state.multiply*10
        }}></div>
        <MultiplySlider 
          multiply={this.state.multiply}
          onChange = {this.changeMultiply}
        />

        <div class="btn-div">
        <button id="reset-btn" class=" btn btn-secondary" onClick={this.reset}>Reset</button>
        <button id="select-btn" class=" btn btn-info" onClick={this.select}>Select</button>
        <h3>
          {Object.keys(this.state.sum).map((fraction,index,array) => {
            const num = this.state.sum[fraction] * this.state.multiply;
            return <math>{index > 0 && "+"}<sup>{num}</sup>/<sub>{fraction}</sub></math>
          })}
        </h3>
        </div>

      </FractionContext.Provider>
      </div>

      
    );
  };
}

export default FractionContainer;
