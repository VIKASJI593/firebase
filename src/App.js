import React from "react";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    console.log('constructor');

  }
componentDidMount(){
  console.log('componentDidMount');

}

  render (){
    console.log('render');
    return(
 
    <div className="App">
      
    </div>
  );
}
}  
export default App;
