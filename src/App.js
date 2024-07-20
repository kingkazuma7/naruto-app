import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // 画面に表示する
  const [characters, setCharacters] = useState([]); // キャラクターの状態管理

  useEffect(() => { // 副作用: APIからのデータ取得
    fecthCharacters(); // 2,3などpageの数値がわたってくる
  }, []);
  // next押したら、fecthCharactersで次のページを呼び出す

  const fecthCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character'
    // axios getメソッドでapiUrlにリクエストを送る
    const result = await axios.get(apiUrl, { params: { page: page } });
    // console.log(result);

    // 更新関数で取得したキャラクターのURLに値を更新する
    setCharacters(result.data.characters);
  };

  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {characters.map((characters) => {
            return (
              <div className='card' key={characters.id}>
                <img src={characters.images[0]
                  ? characters.images[0]
                  : 'dummy.png'}
                  alt="characters" className='card-image' />
                  <div className="card-content">
                    <h3 className="card-title">{characters.name}</h3>
                    {/* <p className="card-description">
                      {characters.debut != null
                        ? characters.debut.appearsIn
                        : "なし" }
                    </p> */}
                    {/* appearsInあれば表示、なければ右辺 */}
                    <p className="card-description">
                      { characters.debut?.appearsIn ?? 'debutなし' }
                    </p>
                    <div className="card-footer">
                      <span className="affiliation">
                        { characters.personal?.species ?? 'personalなし' }</span>
                    </div>
                  </div>
              </div>
            );
          })}
          <div className='pager'>
            <button className='prev'>前へ</button>
            <span className="pager-number">1</span>
            <button className='next'>次へ</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
