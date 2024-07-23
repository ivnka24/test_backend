function diceGame(numPlayers, numDice) {
    class Player {
        constructor(id) {
            this.id = id;
            this.dice = Array(numDice).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
            this.points = 0;
        }
    }

    const players = Array(numPlayers).fill(0).map((_, i) => new Player(i + 1));

    let round = 1;
    while (players.filter(player => player.dice.length > 0).length > 1) {
        console.log(`==================`);
        console.log(`Giliran ${round} lempar dadu:`);

        players.forEach(player => {
            if (player.dice.length > 0) {
                player.dice = player.dice.map(() => Math.floor(Math.random() * 6) + 1);
                console.log(`Pemain #${player.id} (${player.points}): ${player.dice.join(',')}`);
            } else {
                console.log(`Pemain #${player.id} (${player.points}): _ (Berhenti bermain karena tidak memiliki dadu)`);
            }
        });

        const newDiceDistribution = Array(numPlayers).fill(0).map(() => []);

        players.forEach((player, i) => {
            if (player.dice.length > 0) {
                player.dice.forEach(die => {
                    if (die === 6) {
                        player.points += 1;
                    } else if (die === 1) {
                        let nextPlayerIndex = (i + 1) % numPlayers;
                        while (players[nextPlayerIndex].dice.length === 0 && nextPlayerIndex !== i) {
                            nextPlayerIndex = (nextPlayerIndex + 1) % numPlayers;
                        }
                        if (nextPlayerIndex !== i) {
                            newDiceDistribution[nextPlayerIndex].push(1);
                        } else {
                            newDiceDistribution[i].push(die); 
                        }
                    } else {
                        newDiceDistribution[i].push(die);
                    }
                });
            }
        });

        players.forEach((player, i) => {
            player.dice = newDiceDistribution[i];
        });

        console.log(`Setelah evaluasi:`);
        players.forEach(player => {
            if (player.dice.length > 0) {
                console.log(`Pemain #${player.id} (${player.points}): ${player.dice.join(',')}`);
            } else {
                console.log(`Pemain #${player.id} (${player.points}): _ (Berhenti bermain karena tidak memiliki dadu)`);
            }
        });

        round++;
    }

    console.log(`==================`);
    console.log(`Game berakhir karena hanya satu pemain yang memiliki dadu.`);

    const winner = players.reduce((acc, player) => player.points > acc.points ? player : acc, players[0]);
    console.log(`Game dimenangkan oleh pemain #${winner.id} karena memiliki poin lebih banyak dari pemain lainnya.`);
}

diceGame(3, 4);
