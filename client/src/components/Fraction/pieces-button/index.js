import React from "react";
import "./style.css";
const PiecesButton = props => {
    // return(<div className = {props.show ? "show" : "hide"}>
    //     <button onClick={props.piecesReturn} value ={2} >2</button>
    //     <button onClick={props.piecesReturn} value={3}>3</button>
    // </div>)
    return <div className = {props.show ? "show" : 'hide'}>
        <button name = "fraction-button" className = "fraction-button btn btn-success" onClick={props.piecesReturn} value ={2} >2</button>
        <button name = "fraction-button" className = "fraction-button btn btn-success" onClick={props.piecesReturn} value={3}>3</button>
        <button name = "fraction-button" className = "fraction-button btn btn-success" onClick={props.piecesReturn} value ={5} >5</button>
        <button name = "fraction-button" className = "fraction-button btn btn-success" onClick={props.piecesReturn} value={7}>7</button>
        <button name = "fraction-button" className = "fraction-button btn btn-success" onClick={props.piecesReturn} value ={11} >11</button>
        <button name = "fraction-button" className = "fraction-button btn btn-success" onClick={props.piecesReturn} value={13}>13</button>
    </div>
}

export default PiecesButton;