'use strict'

const fetch = require('node-fetch')

class Utils {
    static async getFetch(url) {
        let response = await fetch(url)
        let result = await response.json( )
        return result
    }
    static get openDotaAPI( ) {
        return 'https://api.opendota.com/api/'
    }
    constructor( ) {
        throw "static class"
    }
}

module.exports = Utils
