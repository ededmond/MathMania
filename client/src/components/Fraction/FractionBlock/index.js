import React, {Component,useState,useContext,useEffect} from 'react';
import './style.css';

import FractionContext from "../Fraction-context";

const FractionBlock = props => {
    const {select,addToSum,imageURL,dullURL,reset} = useContext(FractionContext);
    const [state,setState] = useState({
        pieces: 1,
        selected :false
    });

    //whenever reset changes, reset the block
    useEffect(()=>{
        setState({
            pieces: 1,
            selected:false
        })
    },[reset])
    
    //  This creates blocks within blocks depending on how many pieces it has been divided into
    const recursion = ({width,height,fraction,coordinates},state) => {
        console.log(coordinates);
        if (state.pieces > 1) {
            if (width > height) {
                const cols = state.pieces == 2 ? "col-6" : "col-4";
                return (
                    <div className="row row-align">
                        <div>
                            <FractionBlock 
                                height= {height}
                                width = {(width / state.pieces)}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0],coordinates[1]]}
                            />
                        </div>
                        <div>
                            <FractionBlock 
                                height= {height}
                                width = {(width / state.pieces)}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0]-((width/state.pieces)),coordinates[1]]}
                            />
                        </div>
                        {(state.pieces == 3) && <div >
                            <FractionBlock 
                                height= {height}
                                width = {(width / state.pieces)}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0]-2*(width/state.pieces),coordinates[1]]}
                            />
                        </div>}
                    </div>
                )
            } else {
                return (
                    <div className="col-12">
                        <div className = "row">
                            <FractionBlock 
                                height= {height / state.pieces}
                                width = {width}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0],coordinates[1]]}
                            />
                        </div>
                        <div className = "row">
                            <FractionBlock 
                                height= {height / state.pieces}
                                width = {width}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0],coordinates[1]-(height/state.pieces)]}
                            />
                        </div>
                        {state.pieces == 3 && <div className = "row">
                            <FractionBlock 
                                height= {height / state.pieces}
                                width = {width}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0],coordinates[1]-2*(height/state.pieces)]}
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
    const click = (select,props,addToSum) => {
        if (state.pieces === 1) {
            if (select) {
                const fraction = state.selected ? -props.fraction : props.fraction;
                setState({
                    ...state,
                    selected : !state.selected
                })
                addToSum(fraction);
            } else {
                const pieces =prompt("How many pieces would you like to divide?",1);
                if (state.selected) {
                    addToSum(-props.fraction);
                }
                setState({
                    ...state,
                    pieces
                })
            }
        }
    }

    return <div className = {"card fraction-block " + (state.selected && " selected") +(state.pieces == 1 && " shown")}
            style = {{
                height:props.height || "500px", 
                width: props.width || "500px",
                backgroundPositionX: props.coordinates[0] || 0,
                backgroundPositionY: props.coordinates[1] || 0,
                backgroundImage: state.selected ? imageURL : dullURL
            }}
            onClick = {() => click(select,props,addToSum)} >
            {recursion(props,state)}
        </div>
}

export default FractionBlock;
