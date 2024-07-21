import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]); // キャラクターの状態管理
  const [page, setPage] = useState(1) // pagerの状態管理、初期値は1ページ目の1
  const [isLoading, setIsLoading] = useState(false); // ローディング
  const limit = 20; // ページに表示するキャラクター数, 全部で1400体

  // ページャーカウントアップ
  const handleNext = async () => {
    const nextPage = page + 1 // カウントアップ
    await fecthCharacters(nextPage); // fecthCharacters呼び出し、引数で次ページ
    setPage(nextPage); // 状態変数で更新
  }
  // ページャーカウントダウン
  const handlePrev = async () => {
    const prevPage = page - 1;
    await fecthCharacters(prevPage);
    setPage(prevPage);
  }

  useEffect(() => { // 副作用: APIからのデータ取得
    fecthCharacters(); // 2,3などpageの数値がわたってくる
  }, []);

  // ページ番号(page)に基づいてキャラクター情報を非同期的に取得し、その過程でローディング状態を管理する役割
  const fecthCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character'
    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page: page, limit } }); // axios getメソッドでapiUrlにリクエストを送る
    // console.log(result);
    setCharacters(result.data.characters); // 更新関数で取得したキャラクターのURLに値を更新する
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content"><img src="logo.png" alt="" className='logo' /></div>
      </div>
      { isLoading ? '読み込中...' :
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
          </div>
          <div className='pager'>
            <button className='prev' onClick={handlePrev} disabled={page === 1}>前へ</button>
            <span className="pager-number">{page}</span>
            <button className='next' onClick={handleNext} disabled={limit > characters.length}>次へ</button>
          </div>
        </main>
      }
    </div>
  );
}

export default App;
