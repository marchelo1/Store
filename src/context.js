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
    product.total = price;
    // Changing and adding to the cart
    this.setState(()=>{
      return {products:tempProducts, cart:[...this.state.cart, product]}
    },
    ()=>{
      console.log(this.state);
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
  console.log('this is increment method');
}
decrament = (id) => {
  console.log('this is decrament method');
}
removeItem = (id) => {
console.log('item removed');
}
clearCart = (id) => {
  console.log('cart waas cleared');
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