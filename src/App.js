import React, { Component } from "react";
import { render } from "react-dom";

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
}

render(<App />, document.getElementById("root"));

export default App;