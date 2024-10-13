import { useState } from 'react';
import './App.css';
import logo192 from './images/logo192.png'

function App() {
  const [dark, setDark] = useState(true)
  return (
    <div className="App">
      <header className={dark ? 'dark-header' : ''}>
        <div className='logo'><img src={logo192} width={70} /><h4>React Facts</h4> </div>
        <h3>
          Light
          <span
            className={dark ? 'dark-bar bar' : 'bar'}

          >
            <span
              className={dark ? 'dark-ball ball' : 'ball'}
              onClick={() => setDark(prev => !prev)}
            >
            </span>
          </span>
          Dark
        </h3>
      </header>
      <main className={dark ? 'dark-body' : ''}>
        <h1>Fun Facts about React:</h1>
        <ul>
          <li>this is the fun fact no 1</li>
          <li>this is the fun fact no 2</li>
          <li>this is the fun fact no 3</li>
          <li>this is the fun fact no 1</li>
          <li>this is the fun fact no 2</li>
          <li>this is the fun fact no 3</li>
        </ul>
      </main>
    </div>
  );
}

export default App;
