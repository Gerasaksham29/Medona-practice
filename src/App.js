import React, { Component } from "react";
import { render } from "react-dom";

import Map from "./components/Map";
//import Demo1 from "./components/Demo1";

class App extends Component {
  constructor(props) {

    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
        <Map />
        {/*<Demo1 />*/}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

export default App;