git branch total-price

git remote -v

git checkout total-price

git add .

git commit -m "Deleting-products-in-Firebase"         

git status

git branch -m Deleting-products-in-Firebase

git branch

Deleting-products-in-Firebase



git push -u origin Deleting-products-in-Firebase

git push -f -u origin Deleting-products-in-Firebase



//----------add------------

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
  }
  componentDidMount() {
    firestore
      .collection("products")
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

    products[index].qty += 1;
    //console.log('Heyy please inc the qty of ', product);
    this.setState({
      products,
    });
  };
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;
    //console.log('Heyy please decrease the qty of ', product);
    this.setState({
      products,
    });
  };
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items,
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
    this.db
      .collection("products")
      .add({
        img: "",
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














//---------------Updating products in firebase--------------


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
  }
  componentDidMount() {
    firestore
      .collection("products")
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

    // products[index].qty += 1;
    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

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

    products[index].qty -= 1;
    //console.log('Heyy please decrease the qty of ', product);
    this.setState({
      products,
    });
  };
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items,
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
    this.db
      .collection("products")
      .add({
        img: "",
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














//------------------Deleting products in Firebase------------

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
  }
  componentDidMount() {
    firestore
      .collection("products")
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

    // products[index].qty += 1;
    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

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

    const docRef = this.db.collection("products").doc(products[index].id);

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
    const { products } = this.state;

    const docRef = this.db.collection("products").doc(id);

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
    this.db
      .collection("products")
      .add({
        img: "",
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











//------------------delete----------------------

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
console.log(products,index,docRef)
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
    const { products } = this.state;

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
        img: "",
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


















