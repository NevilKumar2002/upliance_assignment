


import React, { useState } from 'react';
import Counter from "./components/Counter";
import UserDataForm from "./components/UserDataForm";
import RichTextEditor from "./components/TextEditor";
import "./index.css";

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 255, 0)');

  const handleCountChange = (count) => {
    const newBackgroundColor = `rgba(0, 0, 255, ${count / 60})`;
    setBackgroundColor(newBackgroundColor);
  };

  return (
    <div className="app-container" style={{ backgroundColor }}>
      <div className='first-container' >
        <Counter handleCountChange={handleCountChange} />
        <RichTextEditor />
      </div>
      <div className="flex-container" >
        <UserDataForm backgroundColor={backgroundColor} />
      </div>
    </div>
  );
};

export default App;
