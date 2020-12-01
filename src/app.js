const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectorypath =path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'Wether',
        name : 'Raj'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
      title:'About Me!',
      name: 'Raj'  
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpmessage: 'principles of agronomy by reddy text pdfsdocuments2 com april 24th, 2018 - principles of agronomy by reddy text pdf free download here agronomy 105 crop production purdue http www agry purdue edu courses agry105 fall 2010 syllabus pdf agriculture and agronomy hasanuzzaman s homepage april 27th, 2018 - 1 agriculture and agronomy the basic principles of agron',
        title :'Help',
        name : 'Raj'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error : 'You must have to provide the location'
        })
    }
    
    geocode (req.query.address, (error, {location} = {}) => {
        if (error) {
              return res.send( {error} )
        }
        forecast(req.query.address, (error, forecastdata) => {
              if (error) {
                    return res.send( {error} )
              }
              res.send({
                address: req.query.address,
                location : location,
                forecastdata : forecastdata
              })
        })
  })  
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
                error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404 Error',
        errormessage:'Help Artical Not Found',
        name:'Raj'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404 Error',
        errormessage:'Page Not Found',
        name: 'Raj'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})