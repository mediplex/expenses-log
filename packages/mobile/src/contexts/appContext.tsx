import React, { createContext, useReducer, useEffect } from "react";
import { Languages } from "../enums/Languages";
import { IonLoading, IonToast } from "@ionic/react";

const initialAppState = {
  language: Languages.English,
  loading: {
    message: null,
    isOpen: false,
    duration: null,
  },
  toast: {
    message: null,
    isOpen: false,
    duration: null,
    color: null,
  },
  darkMode: false,
};

export const AppContext = createContext(null);

const SET_LANGUAGE = "SET_LANGUAGE";
const SET_LOADING = "SET_LOADING";
const SET_TOAST = "SET_TOAST";
const SET_DARK_MODE = "SET_DARK_MODE";

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_LOADING:
      return { ...state, loading: { ...action.payload } };
    case SET_TOAST:
      return { ...state, toast: { ...action.payload } };
    case SET_DARK_MODE:
      return { ...state, darkMode: { ...action.payload } };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  // console.log(navigator.language);
  // console.log(navigator.onLine);
  // console.log(navigator.storage);
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  // useEffect(() => {
  //   if (navigator.language && Languages[navigator.language.substr(0, 2)])
  //     setLanguage(Languages[navigator.language.substr(0, 2)]);
  // }, [navigator.language]);
 const darkMode: boolean = appState.darkMode;
  const language: Languages = appState.language;


  useEffect(()=>{
    if (localStorage.getItem('language')) {
      setLanguage(localStorage.getItem('language') as Languages)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('language' as Languages,language)
  },[language])

 

  const setLanguage = (language: Languages) => {
    dispatch({ type: SET_LANGUAGE, payload: language });
  };
  const setLoading = ({ message, isOpen, duration }) => {
    dispatch({ type: SET_LOADING, payload: { message, isOpen, duration } });
  };
  const setToast = ({ message, isOpen, duration, color }) => {
    dispatch({
      type: SET_TOAST,
      payload: { message, isOpen, duration, color },
    });
  };
  const setDarkMode = (isEnabled) => {
    dispatch({ type: SET_DARK_MODE, payload: { isEnabled } });
  };



  return (
    <AppContext.Provider
      value={{
        setLanguage,
        setLoading,
        setToast,
        setDarkMode,
        darkMode,
        language,
      }}
    >
      {children}

      <IonLoading
        isOpen={appState.loading.isOpen}
        onDidDismiss={() => setLoading({ ...appState.loading, isOpen: false })}
        message={appState.loading.message}
        duration={appState.loading.duration}
      />

      <IonToast
        cssClass="ion-text-center"
        isOpen={appState.toast.isOpen}
        onDidDismiss={() => setToast({ ...appState.toast, isOpen: false })}
        message={appState.toast.message}
        duration={appState.toast.duration}
        color={appState.toast.color}
      />
    </AppContext.Provider>
  );
};
