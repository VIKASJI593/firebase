import React from 'react';

const CartItem = (props) => {
  //console.log('this.props', this.props);
  const { price, title, qty ,img} = props.product;
  console.log(props)
  const {
    product,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onDeleteProduct
  } = props;
  return (
      <div className="cart-item">

      <div className="left-block">
      <img style={styles.image} alt = ""  
         src={img }/> 
        </div>
        <div className="right-block">
          <div style={ { fontSize: 25 } }>{title}</div>
          <div style={ { color: '#777' } }>Rs {price} </div>
          <div style={ { color: '#777' } }>Qty: {qty} </div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img
              alt="increase"
              className="action-icons"
              src="https://img.icons8.com/ios-glyphs/30/000000/plus.png"
              onClick={() => onIncreaseQuantity(product)}
            />
            <img
              alt="decrease"
              className="action-icons"
              src="https://img.icons8.com/ios-glyphs/30/000000/minus.png"
              onClick={() => onDecreaseQuantity(product)}
            />
            <img
              alt="delete"
              className="action-icons"
              src="https://img.icons8.com/carbon-copy/100/000000/filled-trash.png"
              onClick={() => onDeleteProduct(product.id)}
            />
        </div>
      </div>
    </div>
  );
}

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: '#ccc'
  }
}


export default CartItem;