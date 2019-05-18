import React from "react";
import "./style.css"

const MultiplySlider = props => {
    return(<div className="slidecontainer">
    Slide to multiply: {props.multiply}
        <input type="range" min="1" max="10" value={props.multiply} onChange={props.onChange}className="slider" id="multiply-slider" />
    </div>)
}
export default MultiplySlider;