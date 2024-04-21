const initialState = {
  isAuthenticated: true,
  user: {
    "id": 1,
    "name": "admin",    
    "password": "123"
  },
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // Update user state with received data
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
