const express = require('express');
const validate = require('../middlewares/validate.mdw');
const categoryModel = require('../models/category.model');

const film_schema = require('../schemas/film.json');

const slugify = require('slugify');

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await categoryModel.all();
  res.json(list);
})

router.get('/sub_category', async function (req, res) {
  const list = await categoryModel.getWithSubCategory();
  res.json(list);
})



router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const category = await categoryModel.single(id);
  if (category === null) {
    return res.status(204).end();
  }

  res.json(category);
})

router.get('/:id/sub_category', async function (req, res) {
  const list = await categoryModel.getSubCategory(req.params.id);
  res.json(list);
})

router.get('/:id/course', async function (req, res) {
  const list = await categoryModel.getCourse(req.params.id);
  res.json(list);
})

router.post('/', async function (req, res) {
  const category = req.body;
  const id_list = await categoryModel.add(category);
  category.category_id = id_list[0];
  res.status(201).json(category);
})

router.post('/search', async function (req, res) {
  var keyword = slugify(req.body.keyword, {
    replacement: ' ',  
    remove: undefined, 
    lower: true,     
    strict: false,    
    locale: 'vi'       
  })
  const list = await categoryModel.search(keyword);
  res.json(list);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  if (id === 0) {
    return res.status(304).end();
  }

  await categoryModel.del(id);
  res.json({
    message: 'OK'
  })
})

module.exports = router;