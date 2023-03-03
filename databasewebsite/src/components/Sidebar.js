import React, { useState } from "react";
import "../css/Sidebar.css";
import menu from "./menu.png"

const {useEffect} = React;
const Open = (props) => {
  const [isClicked, serIsClicked] = useState(false)
  const buttonHandler = () => {
    serIsClicked(current => !current)
  }
    useEffect( () => {
      console.log(isClicked);
  }, [isClicked]);
  return(
    <>
      <div id={isClicked ? "sidebar-clicked":"sidebar"} >
        <button onClick = {buttonHandler}><img src={menu}/></button>
      </div>
    </>
  );

}
class Sidebar extends React.Component {
  
  render() {
    return <Open/>;
  }
}
export default Sidebar;