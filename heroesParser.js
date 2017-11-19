
const fs = require('fs')
const Utils = require('./utils')

async function main( ) {
    let heroes = await Utils.getFetch(Utils.openDotaAPI + 'heroes')
    let result = { }
    heroes.forEach(function(hero) {
        result[hero.id] = {
            name: hero.localized_name
        }
    }, this)
    fs.writeFileSync('data/heroes.json', JSON.stringify(result))
}

main( )
