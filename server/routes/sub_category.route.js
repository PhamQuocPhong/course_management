const express = require('express');
const validate = require('../middlewares/validate.mdw');
const subCategoryModel = require('../models/sub_category.model');
const slugify = require('slugify');

const router = express.Router();


router.get('/', async function (req, res) {
  const list = await subCategoryModel.all();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const subCategory = await subCategoryModel.single(id);
  if (subCategory === null) {
    return res.status(204).end();
  }

  res.json(subCategory);
})

router.get('/:id/course', async function (req, res) {
  const list = await subCategoryModel.getCourse(req.params.id);
  res.json(list);
})


router.post('/search', async function (req, res) {
  var keyword = slugify(req.body.keyword, {
    replacement: ' ',  
    remove: undefined, 
    lower: true,     
    strict: false,    
    locale: 'vi'       
  })
  const list = await subCategoryModel.search(keyword);
  res.json(list);
})

module.exports = router;