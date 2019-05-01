import React, {Component} from 'react';
import './style.css';

import FractionContext from "../Fraction-context";

class FractionBlock extends Component {
    state = {
        pieces: 1,
        selected :false
    }
    recursion = ({width,height,fraction},state) => {
        if (this.state.pieces > 1) {
            if (width > height) {
                const cols = this.state.pieces == 2 ? "col-6" : "col-4"
                console.log(this.state.pieces);
                return (
                    <div className="row row-align">
                        <div>
                            <FractionBlock 
                                height= {height}
                                width = {(width / this.state.pieces)}
                                fraction = {fraction * this.state.pieces}
                            />
                        </div>
                        <div>
                            <FractionBlock 
                                height= {height}
                                width = {(width / this.state.pieces)}
                                fraction = {fraction * this.state.pieces}
                            />
                        </div>
                        {(state.pieces == 3) && <div >
                            <FractionBlock 
                                height= {height}
                                width = {(width / this.state.pieces)}
                                fraction = {fraction * this.state.pieces}
                            />
                        </div>}
                    </div>
                )
            } else {
                return (
                    <div className="col-12">
                        <div className = "row">
                            <FractionBlock 
                                height= {height / this.state.pieces}
                                width = {width}
                                fraction = {fraction * this.state.pieces}
                            />
                        </div>
                        <div className = "row">
                            <FractionBlock 
                                height= {height / this.state.pieces}
                                width = {width}
                                fraction = {fraction * this.state.pieces}
                            />
                        </div>
                        {state.pieces == 3 && <div className = "row">
                            <FractionBlock 
                                height= {height / this.state.pieces}
                                width = {width}
                                fraction = {fraction * this.state.pieces}
                            />
                        </div>}
                    </div>
                )
            }
        } else {
            return <p>1/{fraction}</p>
        }
    }

    // Are we simply selecting the block? Or dividing it?
    click = (select,props,addToSum) => {
        if (this.state.pieces === 1) {
            if (select) {
                const fraction = this.state.selected ? -props.fraction : props.fraction;
                this.setState({
                    selected : !this.state.selected
                })
                addToSum(fraction);
            } else {
                const pieces =prompt("How many pieces would you like to divide?",1);
                if (this.state.selected) {
                    addToSum(-props.fraction);
                }
                this.setState({
                    pieces
                })
            }
        }
    }

  render(props) {
    return (
        <FractionContext.Consumer>
      {({select,addToSum}) => <div className = {"card fraction-block " + (this.state.selected && " selected") +(this.state.pieces == 1 && " shown")}
        style = {{height:this.props.height || "500px", width: this.props.width || "500px"}}
        onClick = {() => this.click(select,this.props,addToSum)} >
        {this.recursion(this.props,this.state)}
      </div>}
      </FractionContext.Consumer>
    );
  };
}

export default FractionBlock;
