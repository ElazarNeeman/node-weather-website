const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZWxhemFyIiwiYSI6ImNrd3AzanBjNzA5MGUycHAzcHE0cjZ2dHoifQ.Uj4qSCUUfVEZ0-VztS3x8g&limit=1'
    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const res = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            console.log(res)
            callback(undefined, res)

        }
    })
}

module.exports = geocode