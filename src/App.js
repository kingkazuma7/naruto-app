import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // 画面に表示する
  const [characters, setCharacters] = useState([]); // キャラクターの状態管理

  useEffect(() => { // 副作用: APIからのデータ取得
    fecthCharacters();
  }, [])

  const fecthCharacters = async () => {
    const apiUrl = 'https://narutodb.xyz/api/character'
    // axios getメソッドでapiUrlにリクエストを送る
    const result = await axios.get(apiUrl);
    console.log(result);

    // 更新関数で取得したキャラクターのURLに値を更新する
    setCharacters(result.data.characters);
  };

  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {characters.map((characters) => {
            return <div className='card' key={characters.id}>
              <img src={characters.images[0]
                ? characters.images[0]
                : 'dummy.png'}
                alt="characters" className='card-image' />
            </div>;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
