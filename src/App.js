import React from "react";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    console.log('constructor');
this.state = {count:0}
  }
componentDidMount(){
  console.log('componentDidMount');

}

componentDidUpdate(){
  console.log('componentDidUpdate');
}


handleClick = () => {
  this.setState((prevState) => {
return{
  count: prevState.count + 1
}
  })
}

  render (){
    console.log('render');
    return(
 
    <div className="App">
      {this.state.count}
      <button onClick ={this.handleClick}>Inc count</button>
      
    </div>
  );
}
}  
export default App;
