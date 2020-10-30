import React, { useReducer, createContext } from "react";
import {
  initialState as toastInitialState,
  reducer as toastReducer,
} from "./ToastContext";
import {
  initialState as profileInitialState,
  reducer as profileReducer,
} from "./UserContext";

import {
  initialState as favInitialState,
  reducer as favReducer,
} from "./FavoriteContext";

import ToastMessage from "../components/ToastMessage"

export const Context = createContext(null);

const ContextProvider = Context.Provider;

const ContextProviderWrapper = ({
  children,
}) => {
  const [toastData, toastDispatch] = useReducer(
    toastReducer,
    toastInitialState
  );
  const [profileData, profileDispatch] = useReducer(
    profileReducer,
    profileInitialState
  );

  const [favData, favDispatch] = useReducer(
    favReducer,
    favInitialState
  );

  const store = {
    Toast: { state: toastData, dispatch: toastDispatch },
    Profile: { state: profileData, dispatch: profileDispatch },
    Favorites: { state: favData, dispatch: favDispatch },
  };

  return (
    <ContextProvider value={store}>
      {children}
      <ToastMessage
        open={toastData.open}
        message={toastData.message}
        severity={toastData.severity}
        seconds={toastData.seconds}
        handleClose={() => toastDispatch({ type: "close", value: "" })}
      />
    </ContextProvider>
  );
};

/* Store needs to be build completely */

export default ContextProviderWrapper;
