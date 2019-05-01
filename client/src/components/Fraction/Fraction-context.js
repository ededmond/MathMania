import React from 'react';

const CardContext = React.createContext({
    select: false,
    addToSum: num => {}
});
export default CardContext;