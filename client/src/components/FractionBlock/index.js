import React, {Component} from 'react';
import './style.css';
class FractionBlock extends Component {
    state = {
        pieces: 1,
        selected :true
    }
    recursion ({width,height,fraction,select},state) {
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
                                select = {select}
                            />
                        </div>
                        <div>
                            <FractionBlock 
                                height= {height}
                                width = {(width / this.state.pieces)}
                                fraction = {fraction * this.state.pieces}
                                select = {select}
                            />
                        </div>
                        {(state.pieces == 3) && <div >
                            <FractionBlock 
                                height= {height}
                                width = {(width / this.state.pieces)}
                                fraction = {fraction * this.state.pieces}
                                select = {select}
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
                                select = {select}
                            />
                        </div>
                        <div className = "row">
                            <FractionBlock 
                                height= {height / this.state.pieces}
                                width = {width}
                                fraction = {fraction * this.state.pieces}
                                select = {select}
                            />
                        </div>
                        {state.pieces == 3 && <div className = "row">
                            <FractionBlock 
                                height= {height / this.state.pieces}
                                width = {width}
                                fraction = {fraction * this.state.pieces}
                                select = {select}
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
    click(select) {
        if (this.state.pieces === 1) {
            if (select) {
                this.setState({
                    selected : !this.state.selected
                })
            } else {
                const pieces =prompt("How many pieces would you like to divide?",1);
                console.log(pieces);
                this.setState({
                    pieces
                })
            }
        }
    }

  render(props) {
      console.log(this.props);
    return (
      <div className = {"card fraction-block" + (this.state.selected && " selected") +(this.state.pieces == 1 && " shown")}
        style = {{height:this.props.height || "500px", width: this.props.width || "500px"}}
        onClick = {() => this.click(this.props.select)} >
        {this.recursion(this.props,this.state)}
      </div>
    );
  };
}

export default FractionBlock;
