
const fs = require('fs')
let games = require('./games.json')

const UNPARSED_GAMES_FOLDER = 'unparsedGames'

var deleteInnerFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file
            if (fs.lstatSync(curPath).isDirectory( )) {
                deleteFolderRecursive(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
    }
}

let files = fs.readdirSync(UNPARSED_GAMES_FOLDER)
let filesCount = files.length
files.forEach(function(fileName, ind) {
    let id = fileName.replace('.txt', '')
    let game = { }
    let content = fs.readFileSync(UNPARSED_GAMES_FOLDER + '/' + fileName, 'utf8')
    let lines = content.split('\n')
    game.radiantPick = [ ]
    game.direPick = [ ]
    for (let i = 0; i < 10; i++) {
        let split = lines[i].split(':')
        let pick = {
            hero: parseInt(split[0]),
            player: parseInt(split[1])
        }
        let pickList = (i < 5 ? game.radiantPick : game.direPick)
        pickList.push(pick)
    }
    game.winner = (lines[10] == '0' ? 'radiant' : 'dire')
    game.advantage = parseFloat(lines[11])
    let intSkill = parseInt(lines[12])
    game.skill = (intSkill == 1 ? 'normal' : (intSkill == 2 ? 'high' : 'very high'))
    games[id] = game
    if (ind % 1000 == 0) {
        fs.writeFileSync('games.json', JSON.stringify(games))
        console.log(ind / filesCount * 100 + '%')
    }
}, this)

fs.writeFileSync('data/games.json', JSON.stringify(games))

console.log('deleting unnecessary files...')
deleteInnerFolderRecursive(UNPARSED_GAMES_FOLDER)

console.log('done')
