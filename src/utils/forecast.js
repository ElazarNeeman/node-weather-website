const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const token = 'dea58c6dd6b39764091e7abfa9bfdc55'

    const url = 'http://api.weatherstack.com/current?access_key=' + token +  '&query=' + latitude + ',' + longitude + '&units=m'

    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const {temperature, feelslike, precip} = body.current
            callback(undefined, `It is currently ${temperature} degress out. Feelslike ${feelslike} degrees, There is a ${precip} % chance of rain.`)
        }
    })
}

module.exports = forecast