export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

export const cartReducer = (state, action) => {
  //Transforma el estado a partir de la accion y calcula un nuevo estado
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case "ADD_TO_CART": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);
      if (productInCartIndex >= 0) {
        //Una forma es con structured clone
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      } else {
        const newState = [
          ...state,
          {
            ...actionPayload, //Product
            quantity: 1,
          },
        ];
        updateLocalStorage(newState);
        return newState;
      }
    }
    case "REMOVE_FROM_CART": {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }
    case "CLEAR_CART": {
      updateLocalStorage([]);
      return [];
    }
  }
  return state;
};
