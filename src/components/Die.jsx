/* eslint-disable react/prop-types */
export default function Die (props){

    return (
      <button className="dieBtn" style={{backgroundColor: props.isHeld ? "#59E391" : "white"}} onClick={props.hold}>{props.value}</button>
    )
}