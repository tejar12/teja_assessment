import { api, db, json } from "./common";
import queryForPlayers from "./PlayersDb";
import players from './playersjson.json'

const readPlayers = (source, fileName) => {
  switch (source) {
    case db:
      return readPlayersFromDatabase();
    case json:
      return readPlayersFromJsonString();
    case api:
      return fileName;
    default:
      throw new Error('Unknown data source?');
  }
}

const readPlayersFromJsonString = () => {
  return players;
}

const readPlayersFromDatabase = () => {
  return queryForPlayers();
}

const displayPlayers = (players) => {
  return players.map((player, i) => {
    return (
      <li key={i}>
        <ul>
          <li className={"player-name"}>{player.name}</li>
          <li>{player.age}</li>
          <li>{player.job}</li>
          <li>{player.salary}</li>
        </ul>
      </li>
    )
  })
}




export {
  readPlayers,
  readPlayersFromJsonString,
  readPlayersFromDatabase,
  displayPlayers
}


