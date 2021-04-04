const readline = require("readline-sync");
const _ = require("lodash");


const applySpecialPlay = (name) => {
  return (points) => {
    return (play) => {
      return play === name ? [1, points] : play;
    };
  };
};

const applyDB = applySpecialPlay("DB")(50);
const applySB = applySpecialPlay("SB")(25);

const printWinner = (playerName) => {
  console.log(`${playerName} ha ganado, Felicitaciones!`);
};

// Una función que reciba el nombre del jugador, su puntaje y sus lanzamientos y devuelva el nuevo score del jugador
const ingresar_jugada = (name, score, shots) => {  
  const turnScore = _
    .chain(shots)
    .map((shot) => applySB(applyDB(shot)))
    .map((shot) => shot[0] * shot[1])
    .reduce((accumulator, currentValue) => accumulator + currentValue)
    .value();
  const updatedScore = Math.abs(score - turnScore);
  console.log(`${name} queda con ${updatedScore} puntos.`);
  return updatedScore
};

// Una función que inicializa el juego dejando a cada jugador con 501 puntos
const init_game = (players) => {
  return Array.from(players, (x) => [x, 501]);
};

const gameLogic = (playersPoints) => {
  [actual, ...rest] = playersPoints;
  [playerName, playerScore] = actual;
  const newPlay = JSON.parse(readline.question(`${playerName} ingrese su jugada >`));
  const playersStatus = [
    ...rest,
    [playerName, ingresar_jugada(playerName, playerScore, newPlay)],
  ];
  playersStatus.some((x) => x[1] === 0) ? printWinner(playerName) : gameLogic(playersStatus)
};

// Diálogo con el simulador
const play_game = (players) => {
  const playersPoints = init_game(players);
  console.log(`Juego inicializado con los jugadores ${players.join(", ")}.`);
  gameLogic((playersPoints))
};

const playersNames = readline
  .question(`Ingrese los nombres de los jugadores separados por comas >`)
  .split(",");

play_game(playersNames);

