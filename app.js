let bank = 100.0

const players = [
    {
        name: "D'Marcus Williums",
        teamNumber: 0,
        emoji: '🏃‍♂️',
        skill: 10
    },
    {
        name: "Tyroil Smoochie-Wallace",
        teamNumber: 0,
        emoji: '🤾‍♂️',
        skill: 30
    },
    {
        name: "Jackmerius Tacktheratrix",
        teamNumber: 0,
        emoji: '🏇',
        skill: 88
    },
    {
        name: "Javaris Jamar Javarison-Lamar",
        teamNumber: 0,
        emoji: '🏌️‍♀️',
        skill: 15
    },
    {
        name: "D'Pez Poopsie",
        teamNumber: 0,
        emoji: '🏋️‍♂️',
        skill: 77
    },
    {
        name: "D'Jasper Probincrux III",
        teamNumber: 0,
        emoji: '🏌️‍♂️',
        skill: 21
    },
    {
        name: "Leoz Maxwell Jilliumz",
        teamNumber: 0,
        emoji: '🤾',
        skill: 5
    },
    {
        name: "Hingle McCringleberry",
        teamNumber: 0,
        emoji: '🏂',
        skill: 99
    },
    {
        name: "L'Carpetron Dookmarriot",
        teamNumber: 0,
        emoji: '🧘‍♀️',
        skill: 50
    },
    {
        name: "Xmus Jaxon Flaxon-Waxon",
        teamNumber: 0,
        emoji: '🚶‍♀️',
        skill: 1
    },
    {
        name: "Saggitariutt Jefferspin",
        teamNumber: 0,
        emoji: '🏋️‍♀️',
        skill: 61
    },
    {
        name: "Quatro Quatro",
        teamNumber: 0,
        emoji: '🤺',
        skill: 34
    },
    {
        name: "X-Wing @Aliciousness",
        teamNumber: 0,
        emoji: '🏄',
        skill: 71
    },
    {
        name: "Bisquiteen Trisket",
        teamNumber: 0,
        emoji: '🧜‍♂️',
        skill: 76
    },
    {
        name: "Scoish Velociraptor Maloish",
        teamNumber: 0,
        emoji: '🤸',
        skill: 47
    },
    {
        name: "Donkey Teeth",
        teamNumber: 0,
        emoji: '⛹️‍♀️',
        skill: 23
    },
    {
        name: "T.J. A.J. R.J. Backslashinfourth V",
        teamNumber: 0,
        emoji: '🕴️',
        skill: 58
    },
    {
        name: "Firstname Lastname",
        teamNumber: 0,
        emoji: '💃',
        skill: 99
    },
    {
        name: "Dan Smith",
        teamNumber: 0,
        emoji: '🧍‍♂️',
        skill: 3
    },
    {
        name: "Tiger",
        teamNumber: 0,
        emoji: '🐅',
        skill: 100
    },
]

const teamFields = [null, document.getElementById('team-1'), document.getElementById('team-2')] // Blank element to make indexs friendly with matching team number

function selectTeams() {
    players.forEach(x => {
        if (Math.random() >= 0.5) {
            x.teamNumber = 1
        } else {
            x.teamNumber = 2
        }
    })

    draw()
}

function draw() {
    teamFields.forEach(elm => { // Clear teams
        if (elm == null) return // Skip null
        elm.innerHTML = '';
    })

    players.forEach(x => {
        teamFields[x.teamNumber].innerHTML += x.emoji
    })

    document.getElementById('bank').innerText = `$${bank.toFixed(2)}`
}

function bet(team, amount) {
    if (amount > bank) return
    if (amount == '*') {
        amount = bank
    }
    let t1Skill = 0
    let t2Skill = 0
    players.filter(x => x.teamNumber == 1).forEach(x => {
        t1Skill += x.skill
    })
    players.filter(x => x.teamNumber == 2).forEach(x => {
        t2Skill += x.skill
    })

    let rnd = Math.random()
    let chanceT1 = (t1Skill / (t2Skill + t1Skill))
    let chanceT2 = 1 - chanceT1
    let t1Won = rnd <= chanceT1
    let profitMulti = team == 1 ? Math.max(0, 1 - chanceT1 - 0.5) + 1 : Math.max(0, chanceT1 - 0.5) + 1
    let profit = Math.pow(amount, profitMulti * profitMulti)

    switch (team) {
        case 1:
            if (t1Won) {
                bank += profit
                alert(`You won the bet! Your odds of winning were ${(chanceT1 * 100).toFixed(1)}%! You profited $${(profit).toFixed(2)}`)

            } else {
                bank -= amount
                alert(`You lost the bet! Your odds of winning were ${(chanceT1 * 100).toFixed(1)}%!`)
            }
            break;
        case 2:
            if (!t1Won) {
                bank += profit
                alert(`You won the bet! Your odds of winning were ${(chanceT2 * 100).toFixed(1)}%! You profited $${(profit).toFixed(2)}`)

            } else {
                bank -= amount
                alert(`You lost the bet! Your odds of winning were ${(chanceT2 * 100).toFixed(1)}%!`)
            }
            break;
            break;
    }

    selectTeams()
}

selectTeams()