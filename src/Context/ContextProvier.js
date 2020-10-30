import React, { useReducer, createContext } from "react";
/* import {
  initialState as toastInitialState,
  reducer as toastReducer,
} from "./toast"; */
import {
  initialState as profileInitialState,
  reducer as profileReducer,
} from "./UserContext";

/* import ToastMessage from "../Components/ToastMessage/ToastMessage"; */

export const Context = createContext(null);

const ContextProvider = Context.Provider;

const ContextProviderWrapper = ({
  children,
}) => {
  /* const [toastData, toastDispatch] = useReducer(
    toastReducer,
    toastInitialState
  ); */
  const [profileData, profileDispatch] = useReducer(
    profileReducer,
    profileInitialState
  );

  const store = {
    /* Toast: { state: toastData, dispatch: toastDispatch }, */
    Profile: { state: profileData, dispatch: profileDispatch },
  };

  return (
    <ContextProvider value={store}>
      {children}
    </ContextProvider>
  );
};

/* Store needs to be build completely */

export default ContextProviderWrapper;
