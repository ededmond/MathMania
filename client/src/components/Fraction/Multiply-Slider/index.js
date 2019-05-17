import React from "react";
import "./style.css"

const MultiplySlider = props => {
    return(<div class="slidecontainer">
    Slide to multiply: {props.multiply}
        <input type="range" min="1" max="10" value={props.multiply} onChange={props.onChange}class="slider" id="multiply-slider" />
    </div>)
}
export default MultiplySlider;