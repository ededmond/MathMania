import React , {useState, useEffect} from "react";
import io from "socket.io-client/dist/socket.io";
import "./alert.css";
const socket = io();

const TeacherAlert = props => {
    const [state,setState] = useState({
        msg: "",
        shown: "hidden-alert"
    })
    socket.on(props.user._id, msg => {
        setState({
            shown: "shown-alert",
            msg
        })
    })

    useEffect(() => {
        //set timer for hidding book
        const timer = setTimeout(() => setState({...state,shown:"hidden-alert"}),3000)
        // remove timer if get another book
        return () => {clearTimeout(timer)};
    },[state])
    return <div className = {`alert ${state.shown}`}>{state.msg}</div>
}


export default TeacherAlert;