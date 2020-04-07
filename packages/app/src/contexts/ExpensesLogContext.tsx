import React, { createContext, useReducer } from "react";
// import axios from "axios";

export const ExpensesLogContext = createContext(null);



const SET_VALUES = "SET_VALUES";
const SET_IS_SUBMITTING = "SET_IS_SUBMITING";
const RESET = "RESET";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.controlName]: action.payload.value,
        },
      };
    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: !state.isSubmitting };
    case RESET:
      return {
        ...action.payload.initialState,
        isSubmitting: state.isSubmitting,
      };
    default:
      return;
  }
};

const setValues = (controlName, value) => ({
  type: SET_VALUES,
  payload: { controlName, value },
});

const setIsSubmitting = () => ({ type: SET_IS_SUBMITTING });

const reset = (initialState) => ({ type: RESET, payload: { initialState } });

const initialState = (controls) => {
  const values = {};
  controls.forEach((control) => {
    values[control.name] = "";
  });
  const initialState = { values, visited: {}, errors: {}, isSubmitting: false };
  return initialState;
};

export const ExpensesLogContextProvider = ({ controls, children }) => {
  const [state, dispatch] = useReducer(reducer, {}, () =>
    initialState(controls)
  );

  const handleChange = (e) => {
    dispatch(setValues(e.target.name, e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsSubmitting());
    setTimeout(() => dispatch(setIsSubmitting()), 1000);

    dispatch(reset(initialState(controls)));
    // expose submit errors...


    // axios
    // .post(
    //   "http://127.0.0.1:8080/api/addInvoice",
    //   {
    //     image: encodedBase64Image,
    //     values,
    //   },
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // )
    // .then(function (response) {
    //   console.log(response);
    //   history.push('/home')
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

  return (
    <ExpensesLogContext.Provider
      value={{
        handleSubmit,
        // submitError, submit/result
        handleChange,
        values: state.values,
        isSubmitting: state.isSubmitting,
      }}
    >
      {children}
    </ExpensesLogContext.Provider>
  );
};
