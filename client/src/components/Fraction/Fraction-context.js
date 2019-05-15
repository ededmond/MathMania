import React from 'react';

const CardContext = React.createContext({
    select: false,
    addToSum: num => {},
    multiply: 1,
    imageURL: '/images/mountain.jpg',
    dullURL: '/images/mountain.jpg',
    reset: false
});
export default CardContext;