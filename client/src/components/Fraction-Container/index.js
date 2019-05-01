import React, {Component} from 'react';
import './style.css';
import FractionBlock from "../FractionBlock"
class FractionContainer extends Component {
    state = {
        select : false
    }
  render() {
    return (
      <FractionBlock 
        height= {400}
        width = {500}
        fraction = {1}
        select = {this.state.select}
      />
    );
  };
}

export default FractionContainer;
