import { useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Weather from './components/Weather/Weather';

function App() {
  const [city, setCity] = useState('');
  function inputCity(inputValue){
    setCity(inputValue)
  }
  return (
    <div className="App">
      <Search inputCity = { inputCity } />
      <Weather inputText = { city } />
    </div>
  );
}

export default App;
