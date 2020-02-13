import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {
state={
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
};

componentDidMount(){
    this.setProducts();
  }

setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {  // Loop through all Store Product and sign the values from that objact in array, than copy them
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem]    // grab the all products, than add single item
   
    })
    this.setState(()=> {
        return {products:tempProducts};
    });
};

// Get the item according to Id
getItem = (id) => {
    const product = this.state.products.find(item=>  item.id == id); // only if the item.id matches the id which we are pressing it, than we gonna return id
    return product;
  }

// When we click (onClick) the image we call this function to get the id of the product
handleDetail = (id) => {
  const product = this.getItem(id);
  this.setState(
    ()=>{
      return {detailProduct: product};
    }
  )
};

  // Adding to the cart 
  addToCart = (id) => {
    let tempProducts = [...this.state.products]; // Going through all products 
    const product = this.getItem(id);
    const index = tempProducts.indexOf(product); // Putting all arrays values into index
    // Changing value of the products
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;  // When we adding something in the total, is equal to the price
    // Changing and adding to the cart
    this.setState(()=>{
      return {products:tempProducts, cart:[...this.state.cart, product]}
    },
    ()=>{
      this.addTotals(); // Run Totals function after adding a product
    });
 }; 

 openModal = (id) => {
  const product = this.getItem(id); // retrieving the product or item which is gonna show on the model
  this.setState(()=>{
    return {modalProduct: product, modalOpen:true};
  })
}

closeModal = () => {
  this.setState(()=>{
      return {modalOpen: false};
  });
};
increment = (id) => {
  let tempCart = [...this.state.cart];
  const selectedProduct = tempCart.find(item=>item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
// changing the value of the product by incrementing with 1, we change the total also
  product.count = product.count + 1;
  product.total = product.count * product.price;
  
  this.setState(
    ()=> {
      return {cart: [...tempCart]};
    },
    ()=> {
      this.addTotals();
    }
  );
}
decrement = (id) => {
  let tempCart = [...this.state.cart];
  const selectedProduct = tempCart.find(item=>item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
  product.count = product.count -1;

  if(product.count === 0){
    this.removeItem(id);
  }else {
    product.total = product.count * product.price;
    this.setState( 
      ()=>{
        return {cart: [...tempCart]};
      },
      ()=>{
        this.addTotals();
      }
    )
  }
}
removeItem = (id) => {
  let tempProducts = [...this.state.products];
  let tempCart = [...this.state.cart];

  tempCart = tempCart.filter(item=>item.id!==id); // Filter the item that doesn`t have id

  const index = tempProducts.indexOf(this.getItem(id)); 
  let removedProduct = tempProducts[index];
  removedProduct.inCart = false;
  removedProduct.count = 0;
  removedProduct.total = 0;

  this.setState(()=>{
    return {
      cart: [...tempCart],
      products: [...tempProducts]
    }
  }, ()=>{
    this.addTotals();
  })
}

clearCart = () => {
  this.setState(()=>{
    return {cart:[]};
  }, ()=>{
    this.setProducts(); // Clear all products and set back to the default
    this.addTotals(); 
  })
}

addTotals = () => {
  let subTotal = 0;
  this.state.cart.map(item => (subTotal += item.total)); // Going through all products than add item in total
  const tempTax= subTotal * 0.2; // Tax is 20%
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  this.setState(()=>{
    return {
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    }
  })
}

    render() {
        return (
          <ProductContext.Provider value={{
              ...this.state,
              handleDetail: this.handleDetail,
              addToCart: this.addToCart,
              openModal: this.openModal,
              closeModal: this.closeModal,
              increment: this.increment,
              decrement: this.decrement,
              removeItem: this.removeItem,
              clearCart: this.clearCart
          }}>
          {this.props.children}
          </ProductContext.Provider>
        )
    }
};


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};