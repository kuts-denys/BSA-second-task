'use strict';

class Fighter {
    constructor(name, power = 15, health = 15000) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    setDamage(damage) {
        this.health = this.health - damage;
        console.log(`${this.name}'s health: ${this.health}`);
    }

    hit(enemy, point) {
        const damage = point * this.power;
        enemy.setDamage(damage);
    }
}

class ImprovedFighter extends Fighter {
    doubleHit(enemy, point) {
        super.hit(enemy, point * 2);
    }
}

function fight(fighter, improvedFighter, ...points) {
    let winner;
    while (true) {
        const randomPointNumber = Math.floor(Math.random() * points.length);
        fighter.hit(improvedFighter, points[randomPointNumber]);

        if (improvedFighter.health <= 0) {
            winner = fighter;
            break;
        }

        // 50% chance to doublehit - improved fighter indeed!
        if (Math.random() >= 0.5) {
            improvedFighter.hit(fighter, points[randomPointNumber]);
        } else {
            improvedFighter.doubleHit(fighter, points[randomPointNumber]);
        }

        if (fighter.health <= 0) {
            winner = improvedFighter;
            break;
        }
    }

    console.log(`And the winner is ${winner.name}. In the bloodiest battle of all times he defeated his mighty opponent! Congratulations to him!`);
}

// created and used to completely randomize scenarios
function generatePoints() {
    const pointsArr = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.random();
        pointsArr.push(randomNumber);
    }

    // doing this just because I need a reason to use arrow functions; no use case for them instead
    return pointsArr.map(value => Math.floor(value * 20));
}

const fighter = new Fighter('Apophis', 21, 10000);
const improvedFighter = new ImprovedFighter('Teal\'c', 13, 11000);

fight(fighter, improvedFighter, ...generatePoints());