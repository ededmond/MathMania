import React from "react";
import "./style.css";
const PiecesButton = props => {
    return(<div className = {props.show ? "show" : "hide"}>
        <button onClick={props.piecesReturn} value ={2} >2</button>
        <button onClick={props.piecesReturn} value={3}>3</button>
    </div>)
}

export default PiecesButton;