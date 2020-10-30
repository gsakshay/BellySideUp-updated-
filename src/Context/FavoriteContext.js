export const initialState = {
  favoriteList: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "fav-list":
      return {...state, favoriteList: action.value}
    case "reset":
      return initialState;
    default:
      return state;
  }
};