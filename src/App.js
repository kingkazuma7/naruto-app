import { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    fecthCharacters();
  }, [])

  const fecthCharacters = async () => {
    const apiUrl = 'https://narutodb.xyz/api/character'
    // axios getメソッドでapiUrlにリクエストを送る
    const result = await axios.get(apiUrl);
    console.log(result);
  };

  return (
    <div className="App">
      hello world
    </div>
  );
}

export default App;
