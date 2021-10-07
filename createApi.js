const express = require('express')
const app = express()
const { menu } = require('./data')

let message = '';

app
  .get('/', (req,res) => {
    res.send('<h1>Homepage</h1><a href="/data">data</a>');

  })
  .get('/api/v1/data', (req,res) => {
    const allCategories = [...new Set(menu.map((item) => item.category))]
    // res.json(allCategories)
    
    const breakfast = (menu.filter((item) => {
        return item.category === 'breakfast' 
    }))
    const lunch = (menu.filter((item) => {
      return item.category === 'lunch' 
    }))
    const shakes = (menu.filter((item) => {
      return item.category === 'shakes' 
    }))
    res.json({ result: {breakfast: breakfast, lunch:lunch, shakes:shakes}, message: 'Success. All data being displayed'})
  })
  .get('/api/v1/data/search', (req, res) => {
    const { type, limit, filter } = req.query;

    let sortedProducts = [ ...menu ];

    if(type) {
      sortedProducts = sortedProducts.filter((item) => {
        return item.category.includes(type)
      })
    }
    if(limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(filter === 'dec') {
      sortedProducts.sort((a, b) => b.price - a.price)
    }
    else if(filter === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price)
    }else if(filter === 'idAsc') {
      sortedProducts.sort((a, b) => a.id - b.id)
    }else if(filter === 'idDec') {
      sortedProducts.sort((a, b) => b.id - a.id)
    }
    else if(!filter.includes(['idDec', 'idAsc', 'asc', 'dec'])) {
      return res.json({results: [], message: 'unregonzied filter property' })
    }

    // if(!Type, !Limit, !FilterPrice) {
    //   return res.json({ results: [], message: 'Parameter unregonzied. Must have entered it in wrong (Hint: Maybe forgot to capatilize a letter or capatilize a wrong letter'})
    // }
    
    if(sortedProducts.length < 1) {
      return res.json({ results: [], message: 'Product not found'})
    }

    res.json({ results: [sortedProducts], message: 'Success' })
  })

  .all('*', (req, res) => {
    res.status(404).send("Page not found");
  })
  .listen(1235, () => {
    console.log('sever listening on port 1235')
  })