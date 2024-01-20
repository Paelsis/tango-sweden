import React, { createContext, useState, useContext } from 'react';

const initialState = {
  city:'Malmö',
  name:'Okänd/Unknown',
  region:'Skåne',
  color:'blue',
  backgroundColorLight:'transparent',
  backgroundColorDark:'transparent',
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

