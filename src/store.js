import React, { createContext, useState, useContext } from 'react';

const initialState = {
  authLevel:4,
  city:'Stockholm',
  region:'Mitt',
  country:'Sverige',
  color:'orange',
  backgroundColorLight:'grey',
  backgroundColorDark:'black',
  calendarType:'DEFAULT'
};

const useMyState = () => useState(initialState);

const MyContext = createContext(null);

export const useSharedState = () => {
  const value = useContext(MyContext);
  if (value === null) throw new Error('Please add SharedStateProvider');
  return value;
};

export const SharedStateProvider = ({ children }) => (
  <MyContext.Provider value={useMyState()}>
    {children}
  </MyContext.Provider>
);

