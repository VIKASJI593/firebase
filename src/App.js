/*
import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import "./index.css";
import { firestore } from "./firebase";
//import * as firebase from "firebase";

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    //firebase
      firestore
      .collection('products')
      .get()
      .then(snapshot => {snapshot.doc.map((doc)=>{
        console.log(doc.data())
      })
      console.log(snapshot);
                 
        })
      }
  handleIncreaseQuantity = (product) => {
    
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;
    //console.log('Heyy please inc the qty of ', product);
    this.setState({
      products
    })
  }
  handleDecreaseQuantity = (product) => {
    
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;
    //console.log('Heyy please decrease the qty of ', product);
    this.setState({
      products
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if(product.qty>0){
      cartTotal = cartTotal + product.qty * product.price
    }
    return '';
   } )

    return cartTotal;
  }
  render () {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
*/









import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import "./index.css";
import { firestore } from "./firebase";
//import * as firebase from "firebase";

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    firestore
      .collection("products")
      .get()
      .then(snapshot => {
        const products = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ products: products  });
      });
  }
  handleIncreaseQuantity = (product) => {
    
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;
    //console.log('Heyy please inc the qty of ', product);
    this.setState({
      products
    })
  }
  handleDecreaseQuantity = (product) => {
    
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;
    //console.log('Heyy please decrease the qty of ', product);
    this.setState({
      products
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if(product.qty>0){
      cartTotal = cartTotal + product.qty * product.price
    }
    return '';
   } )

    return cartTotal;
  }
  render () {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;


