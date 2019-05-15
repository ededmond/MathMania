import "./style.css";
import React from "react";

const dilute =(index) => {
    return 230-15*index
}

const MultiplyLayer = props => {
    const width = props.width/2
    return (<div className = "multiply-layer"
        style = {{
            outlineWidth: width,
            top : width + 10*(props.index),
            right: -width +10*(props.index),
            zIndex: -props.index,
            outlineColor: `rgb(${dilute(props.index)}, ${dilute(props.index)}, ${dilute(props.index)})`
        }}
    >

    </div>)
}

export default MultiplyLayer;