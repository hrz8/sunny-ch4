class Player {
    constructor() {
        this.score = 0;
        this.win = null;
        this.selected = null;
    }

    reset() {
        this.win = null;
        this.selected = null;
    }

    resetScore() {
        this.score = 0;
    }
}

class Game {
    constructor(players) {
        if (this.constructor === Game) {
            throw new Error('this is abstraction class');
        }
        this.players = players;
    }

    reset() {
        for (const player of players) {
            player.resetScore();
        }
    }
}

class User extends Player {
    constructor() {
        super();
    }

    choose(choice) {
        this.selected = choice;
    }
}

class Computer extends Player {
    constructor() {
        super();
    }

    roll() {
        const choices = Object.values(RockPaperScissor.choices);
        const randomIdx = Math.floor(Math.random() * choices.length)
        this.selected = choices[randomIdx];
    }
}

class RockPaperScissor extends Game {
    static choices = {
        ROCK: 'rock',
        PAPER: 'paper',
        SCISSOR: 'scissor',
    };

    constructor(user, computer) {
        super([
            user,
            computer,
        ]);
    }

    userTurn(choice) {
        this.players[0].choose(choice);
    }

    computerTurn() {
        const interval = setInterval(() => {
            this.players[1].roll();

            console.log(this.players[1].selected);
        }, 200);

        
        setTimeout(() => {
            clearInterval(interval);

            console.log('user select:', this.players[0].selected);
            console.log('computer select:', this.players[1].selected);

            this.#determineResult();
        }, 3000);
    }

    #determineResult() {
        if (
            this.players[0].selected !== null &&
            this.players[1].selected !== null
        ) {
            const [user, comp] = this.players;
            const computerWins =
                (
                    user.selected === RockPaperScissor.choices.ROCK &&
                    comp.selected === RockPaperScissor.choices.PAPER
                ) ||
                (
                    user.selected === RockPaperScissor.choices.PAPER &&
                    comp.selected === RockPaperScissor.choices.SCISSOR
                ) ||
                (
                    user.selected === RockPaperScissor.choices.SCISSOR &&
                    comp.selected === RockPaperScissor.choices.ROCK
                );

            const userWins =
                (
                    user.selected === RockPaperScissor.choices.ROCK &&
                    comp.selected === RockPaperScissor.choices.SCISSOR
                ) ||
                (
                    user.selected === RockPaperScissor.choices.PAPER &&
                    comp.selected === RockPaperScissor.choices.ROCK
                ) ||
                (
                    user.selected === RockPaperScissor.choices.SCISSOR &&
                    comp.selected === RockPaperScissor.choices.PAPER
                );

            if (computerWins) {
                console.log('computer wins');
                comp.score++;
                comp.win = true;
                user.win = false;
            } else if (userWins) {
                console.log('user wins');
                user.score++;
                user.win = true;
                comp.win = false;
            } else {
                console.log('draw');
            }

            console.log(user, comp);
        }
    }
}

const user = new User();
const computer = new Computer();

const rps = new RockPaperScissor(user, computer);

rps.userTurn(RockPaperScissor.choices.ROCK);
rps.computerTurn();

console.log(user, computer);
