import { useState, useEffect } from 'react';

import './App.css';
import { api, api_url, db, json } from './common';
import {
  readPlayers,
  displayPlayers
} from './Players'

function App() {

  const [players, setPlayers] = useState([]);
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    if (players.length > 0) {
      const rightNow = new Date();
      setTimestamp(`Data last changed: ${rightNow.toLocaleTimeString()}`);
    }
    else {
      setTimestamp('')
    }
  }, [players]);

  const doGetPlayers = async (source) => {
    let players;
    switch (source) {
      case json:
      case db:
        players = readPlayers(source);
        setPlayers(displayPlayers(players))
        break;
      case 'api':
        const fieName = readPlayers(source, 'playerdata.json');
        const playersResponse = await fetch(`${api_url}getPlayersFromFile/${fieName}`, {
          headers: {
            'accept': 'application/json'
          }
        });
        players = JSON.parse(await playersResponse.json());
        setPlayers(displayPlayers(players));
        break;
    }
  }
  const doPlayersClear = () => {
    setPlayers([]);
  }

  const doRender = () => {
    if (typeof players === 'object') {
      return (
        <ul>
          {players}
        </ul>
      );
    } else {
      return (
        <ul dangerouslySetInnerHTML={{ __html: players }} />
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <span className="last-accessed">{timestamp}</span>
        <div className='container'>
          <div className='buttons'>
            <button onClick={() => doGetPlayers(json)}>
              Load Players Json
            </button>
            <button onClick={() => doGetPlayers(db)}>
              Load Players DB
            </button>
            <button onClick={() => doGetPlayers(api)}>
              Load Players API
            </button>
            <button onClick={() => doPlayersClear()}>
              Clear Players
            </button>
          </div>
          <div className={'players-list'}>
            {doRender()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
