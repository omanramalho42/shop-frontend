import React, { createContext, useReducer } from 'react';
import { ProductsProps } from '../util/data';

interface CartProps {
  shippingAddress: any;
  payamentMethod: String | null;
  cartItems: ProductsProps[];
}

interface StateProps {
  userInfo: any;
  cart: CartProps;
}

interface StoreProviderProps {
  children: React.ReactNode;
}

const initialState:StateProps = {
  userInfo: localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo') || '')
  : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress') || '')
    : {},
    payamentMethod:  localStorage.getItem('payamentMethod')
    ? localStorage.getItem('payamentMethod' || '')
    : '',
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
    : [],
  },
};

export const Store = createContext<any>({});

const reducer = (state: StateProps, action: any) => {
  switch(action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: {...state.cart, cartItems: [] }}
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return { 
        ...state, 
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          payamentMethod: ""
        } 
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload
        }
      }
    case 'SAVE_PAYAMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          payamentMethod: action.payload
        }
      }
    default:
      return state;
  }
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer<any>(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      { children }
    </Store.Provider>
  )
}