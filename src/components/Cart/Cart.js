import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../../context'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {
            value => {
              const {cart} = value;
              if(cart.length>0){  // If the cart is bigger than 0 than we gonna display something
                return (
                  <React.Fragment>
                    <Title name="your" title="cart"/>
                    <CartColumns/>
                    <CartList value={value}/>
                    <CartTotals value={value} history={this.props.history}/> {/*// Passing a history object from CartTotals component into each route as a prop. This history object lets us manually control history of the browser*/}
                  </React.Fragment>
                );
              }else{
                  return <EmptyCart/>;
              }
            }
          }
        </ProductConsumer>
        
      </section>
    )
  }
}