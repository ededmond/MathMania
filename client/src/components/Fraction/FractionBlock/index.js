import React, {Component,useState,useContext,useEffect} from 'react';
import './style.css';

import FractionContext from "../Fraction-context";
import PiecesButton from "../pieces-button";
const FractionBlock = props => {
    const {select,addToSum,imageURL,dullURL,reset} = useContext(FractionContext);
    const [state,setState] = useState({
        pieces: 1,
        selected :false,
        showChoice: false
    });

    //whenever reset changes, reset the block
    useEffect(()=>{
        setState({
            pieces: 1,
            selected:false,
            showChoice: false
        })
    },[reset])
    
    //  This creates blocks within blocks depending on how many pieces it has been divided into
    const recursion = ({width,height,fraction,coordinates},state) => {
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

    const recursion2 = ({width,height,fraction,coordinates},state) => {
        if (state.pieces > 1) {
            //  columns can only divide in certain circumstances
            const columnsOK = (state.pieces === '3') || (state.pieces === '2');
            if (width > height && columnsOK) {
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
                //dividing the rows
                let fractionArray = Array.apply(null, Array(parseInt(state.pieces))).map(function () {});
                console.log(fractionArray);
                return (
                    <div className="col-12">
                        {fractionArray.map((item,index,fractionArray) => {
                            return (<div className="row" key ={index}>
                                <FractionBlock 
                                height= {height / state.pieces}
                                width = {width}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0],coordinates[1]-index*(height/state.pieces)]}
                                />
                            </div>)
                        })}
                    </div>
                )
            }
        } else {
            return <p>1/{fraction}</p>
        }
    }

    // Are we simply selecting the block? Or dividing it?
    const click = (select,props,addToSum,event) => {
        if (event.target.className.includes("fraction-block") && state.pieces === 1) {
            if (select) {
                const fraction = state.selected ? -props.fraction : props.fraction;
                setState({
                    ...state,
                    selected : !state.selected,
                    showChoice: false
                })
                addToSum(fraction);
            } else {
                setState({
                    ...state,
                    showChoice: true
                })
            }
        }
    }

    const piecesReturn = event => {
        if (state.selected) {
            addToSum(-props.fraction);
        }
        const pieces = event.target.value;
        if (state.pieces ===1) {
            setState({
                ...state,
                selected: false,
                showChoice: false,
                pieces: pieces
            })
        } else {
            setState({
                ...state,
                showChoice:false,
                selected: false
            })
        }
        
    }

    return (<div name ="fractionblock" className = {"card fraction-block " + (state.selected && " selected") +(state.pieces == 1 && " shown")}
            style = {{
                height:props.height || "500px", 
                width: props.width || "500px",
                backgroundPositionX: props.coordinates[0] || 0,
                backgroundPositionY: props.coordinates[1] || 0,
                backgroundImage: state.selected ? imageURL : dullURL
            }}
            onClick = {event => click(select,props,addToSum,event)} >
            {recursion2(props,state)}
            <div className = {state.pieces==1 && state.showChoice ? "show" : "hide"}>
                <button className = "fraction-button btn btn-success" onClick={piecesReturn} value ={2} >2</button>
                <button className = "fraction-button btn btn-success" onClick={piecesReturn} value={3}>3</button>
                <button className = "fraction-button btn btn-success" onClick={piecesReturn} value ={5} >5</button>
                <button className = "fraction-button btn btn-success" onClick={piecesReturn} value={7}>7</button>
                <button className = "fraction-button btn btn-success" onClick={piecesReturn} value ={11} >11</button>
                <button className = "fraction-button btn btn-success" onClick={piecesReturn} value={13}>13</button>
            </div>
        </div>)
}

export default FractionBlock;
