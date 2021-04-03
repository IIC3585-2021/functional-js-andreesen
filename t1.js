const readline = require("readline-sync");


const applySpecialPlay = (name) => {
  return (points) => {
    return (play) => {
      return play === name ? [1, points] : play;
    };
  };
};
// Una función que reciba el nombre del jugador, su puntaje y sus lanzamientos y devuelva el nuevo score del jugador
const ingresar_jugada = (score, shots) => {};

// Una función que inicializa el juego dejando a cada jugador con 501 puntos
const init_game = (players) => {
  return Array.from(players, (x) => [x, 501]);
};

const gameLogic = (playersPoints) => {
  [actual, ...rest] = playersPoints;
  [playerName, playerScore] = actual;
  const newPlay = JSON.parse(readline.question(`${playerName} ingrese su jugada >`));
  const playersStatus = [...rest, [playerName, ingresar_jugada(playerScore, newPlay)]]
  (playersStatus.some((x) => x[1] === 0)) ? printWinner(playerName) : gameLogic(playersStatus) 
};

// Diálogo con el simulador
const play_game = (players) => {
  const playersPoints = init_game(players);
  console.log(playersPoints);
  gameLogic((playersPoints))
};

const playersNames = readline
  .question(`Ingrese los nombres de los jugadores separados por comas >`)
  .split(",");

play_game(playersNames);