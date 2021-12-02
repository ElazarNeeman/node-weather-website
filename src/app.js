const path = require('path');
const express = require('express')
const hbs = require('hbs')

const app = express() 

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const staticPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates/views')
const partialsPath = path.join(__dirname, '..', 'templates/partials')

app.use(express.static(staticPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index',
    {
        title: 'weather app',
        name: 'Elazar'
    })
})
 
 app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Elazar'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Elazar Neeman'
    })
})

app.get('/weather', (req, res) => {
    
    const address = req.query.address
    
    if (!address){
        return res.status(400).send({
            error : 'address must be specified'
        })
        
    }
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.status(500).send ({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.status(500).send({ error })
            }
            return res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('help/*', (req, res)=>{
    res.render('oops 404',{
        title: 'About',
        name: 'Elazar Neeman',
        message: 'Not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: 'oops 404',
        name: 'Elazar Neeman',
        message: 'Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})