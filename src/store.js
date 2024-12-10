import React, { createContext, useState, useContext } from 'react';

const initialState = {
  authLevel:4,
  city:'Unset',
  region:'Unset',
  country:'Sverige',
  color:'orange',
  backgroundColorLight:'grey',
  backgroundColorDark:'black',
  // shoeStories:true,
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

