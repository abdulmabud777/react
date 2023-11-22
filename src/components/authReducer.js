// authReducer.js

// Retrieve existing form data from local storage
const userDetails = await JSON.parse(localStorage.getItem('userDetails')) || null;
let initialState = {};

initialState = {
  user: null,
  cart: [],
};

// if (userDetails) {
//   initialState = {
//     user: {
//       "email": userDetails.email,
//       "password": userDetails.password
//     }
//   };
// } else {
//   initialState = {
//     user: null,
//   };
// }



const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default authReducer;
