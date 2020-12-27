const express = require('express');
const validate = require('../middlewares/validate.mdw');
const subCategoryModel = require('../models/sub_category.model');

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

module.exports = router;