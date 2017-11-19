
const fetch = require('node-fetch')
const fs = require('fs')
const games = require('./games.json')

let players = {}

const API = 'https://api.opendota.com/api/'

var getFetch = async (url) => {
    let response = await fetch(url)
    let result = await response.json( )
    return result
}

async function getPlayerInfo(id) {
    let playerHeroList = await getFetch(API + 'players/' + id + '/heroes')
    let result = { }
    playerHeroList.forEach(function(element) {
        result[element.hero_id] = {
            "games": element.games, "wins": element.win
        }
    }, this)
    return result
}

async function main( ) {

    try {
    	for (let gameId in games) {
            let game = games[gameId]
            let pick = game.radiantPick.concat(game.direPick)
            for (let pickNum in pick) {
                let playerPick = pick[pickNum]
                if (playerPick.player != -1) {
                    players[playerPick.player] = await getPlayerInfo(playerPick.player)
                }                
            }
        }

        fs.writeFileSync('players.json', JSON.stringify(players))
    } catch (e) {
        console.error(e)
    }
}

main( )
