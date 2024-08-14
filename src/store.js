import React, { createContext, useState, useContext } from 'react';

const initialState = {
  city:'Malmö',
  name:'-',
  region:'Skåne',
  color:'blue',
  authLevel:1, // Default auth level is 1
  backgroundColorLight:'transparent',
  backgroundColorDark:'transparent',
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

