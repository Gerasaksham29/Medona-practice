import React, { Component } from "react";
import { render } from "react-dom";
<<<<<<< HEAD

import MapContainer from "./components/Storelocator";


class App extends Component {
  constructor(props) {

    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <div>
        
        <MapContainer />

      </div>
    );
  }
=======
import Header from "./components/Header";
import "./components/Header.css";
import Footer from "./components/Footer";
import "./components/Footer.css";
import HomeScreen from "./screens/HomeScreen";
import "./screens/Homescreen.css"
import "./App.css";
import About from "./components/aboutus";
import bg from "./components/bg.jpg"
import zIndex from "@material-ui/core/styles/zIndex";
//import Map from "./components/Map";
//import Demo1 from "./components/Demo1";

class App extends Component {
    constructor(props) {

        super(props);
        this.state = {

        };
    }



    render() {
        return ( 
        <div style={{  
            backgroundImage: "url("+bg+")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex:'-1', overflowX:'hidden'
          }}>
            {/*<h4 > Using geolocation JavaScript API in React </h4> }
            {/*<Map />} { /*<Demo1 />*/ } 
            <Header/>
            <HomeScreen/>
            <About/>
            <div className='Foot'>
            <Footer/>
            </div>
            
        </div>
        );
    }
>>>>>>> a45be4f0d8e64c205f640a9aed891dca04cae6e3
}

render( < App / > , document.getElementById("root"));

export default App