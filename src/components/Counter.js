import React, { useState } from 'react';
import "./style.css"

const Counter = ({ handleCountChange }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
    handleCountChange(count + 1); // Update background color
  };

  const decrementCount = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    handleCountChange(count - 1); // Update background color
  };

  const resetCount = () => {
    setCount(0);
    handleCountChange(0); // Update background color
  };

  const backgroundColor = `rgba(0, 0, 255, ${count / 100})`; // Linear color change based on count

  return (
    <div  className='counter-container'>
      <h1>Count: {count}</h1>
     <div>
     <button onClick={incrementCount} className='button'>Increment</button>
      <button onClick={decrementCount} className='button'>Decrement</button>
      <button onClick={resetCount} className=' button reset-button'>Reset</button>
     </div>
    </div>
  );
};

export default Counter;
