import React, {useState,useContext,useEffect} from 'react';
import './style.css';

import FractionContext from "../Fraction-context";
import PiecesButton from "../pieces-button";
const FractionBlock = props => {
    const {select,addToSum,multiply,imageURL,dullURL,reset} = useContext(FractionContext);
    const [state,setState] = useState({
        pieces: 1,
        selected :false,
        showChoice: false
    });

    //  whenever reset changes, reset the block
    useEffect(()=>{
        setState({
            ...state,
            pieces: 1,
            selected:false,
            showChoice: false
        })
    },[reset])

    const simplify = (num, den) => {
        var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
        };
      gcd = gcd(num,den);
      return <math><sup>{num/gcd}</sup>/<sub>{den/gcd}</sub></math>
    }
    

    //  This creates blocks within blocks depending on how many pieces it has been divided into
    const recursion2 = ({width,height,fraction,coordinates},state) => {
        if (state.pieces > 1) {
            //  columns can only divide in certain circumstances
            const fractionArray = Array.apply(null, Array(parseInt(state.pieces))).map(function () {});

            if (width > height) {
                // const cols = state.pieces == 2 ? "col-6" : "col-4";
                return (
                    <div className="row row-align">
                    {fractionArray.map((item,index,fractionArray) => {
                        return (<div>
                            <FractionBlock 
                                height= {height}
                                width = {(width / state.pieces)}
                                fraction = {fraction * state.pieces}
                                coordinates = {[coordinates[0]-index*(width/state.pieces),coordinates[1]]}
                            />
                        </div>)
                    })}
                    </div>
                )
            } else {
                //dividing the rows
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
            return <p>{simplify(multiply,fraction)}</p>
        }
    }

    // Are we simply selecting the block? Or dividing it?
    const click = (select,props,addToSum,event) => {
        //only runs if not clicking button 
        if (event.target.name !=="fraction-button" && state.pieces === 1) {
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
        console.log(event.target.name);
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
            {props.children}
            {recursion2(props,state)}
            <PiecesButton show = {state.pieces==1 && state.showChoice} piecesReturn = {piecesReturn} />
        </div>)
}

export default FractionBlock;
