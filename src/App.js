import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import "./index.css";
import { firestore } from "./firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    //this.db = firebase.firestore();
  }
  componentDidMount() {
    firestore
      .collection("products")

      //---------------------Querying the data----------------------

      //.where('price', '==',900)
      // .where('price', '>=',100)
      //.where('title', '==','watch')
      //  .orderBy('price')
      // .orderBy('price','desc')
      .orderBy("price", "asc")

      .get()
      .then((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ products: products });
      });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = firestore.collection("products").doc(products[index].id);
    console.log(products, index, docRef);
    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then("updated sucessfully")
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = firestore.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then("updated sucessfully")
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  handleDeleteProduct = (id) => {
    //const { products } = this.state;

    const docRef = firestore.collection("products").doc(id);

    docRef
      .delete()

      .then("deleted sucessfully")
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  addProduct = () => {
    firestore
      .collection("products")
      .add({
        img: "https://www.tradeinn.com/f/13819/138199658/teka-wmt-40720-wh-front-loading-washing-machine.jpg",
        price: 900,
        qty: 3,
        title: "washing machine",
      })
      .then((docRef) => {
        console.log("product has been added", docRef);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a product
        </button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL: {this.getCartTotal()}{" "}
        </div>
      </div>
    );
  }
}

export default App;
