import { Action, Language, type State } from "../types";
import { useReducer } from "react";

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;
  if (type === "INTERCHANGE_LANGUAGES") {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      fromText: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromLanguage: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  //no retornar el dispatch directamente. Dentro del hook exportamos un contrato
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interchangeLanguages = () =>
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  const setFromLanguage = (payload: Language) =>
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  const setToLanguage = (payload: Language) =>
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  const setFromText = (payload: string) =>
    dispatch({ type: "SET_FROM_TEXT", payload });
  const setResult = (payload: string) =>
    dispatch({ type: "SET_RESULT", payload });
  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
