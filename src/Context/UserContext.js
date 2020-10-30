export const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  phNo: "",
  address: "",
  admin: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "first_name":
      return { ...state, firstName: action.value };
    case "last_name":
      return { ...state, lastName: action.value };
    case "phno":
      return { ...state, phNo: action.value };
    case "username":
      return { ...state, username: action.value };
    case "address":
      return { ...state, address: action.value };
    case "admin":
      return { ...state, admin: action.value };  
    case "reset":
      return initialState;
    case "all":
      return {
        ...state,
        firstName: action.value.firstName,
        lastName: action.value.lastName,
        username: action.value.username,
        phNo: action.value.phno,
        address: action.value.address,
        admin: action.value.admin,
      };
    case "fetch":
      /* getProfile(state, action); */
      break;
    default:
      return state;
  }
};