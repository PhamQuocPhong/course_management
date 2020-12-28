const express = require('express');
const validate = require('../middlewares/validate.mdw');
const courseModel = require('../models/course.model');

const film_schema = require('../schemas/film.json');

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await courseModel.all();
  res.json(list);
})


router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const course = await courseModel.single(id);
  if (course === null) {
    return res.status(204).end();
  }

  res.json(course);
})



router.post('/', async function (req, res) {
  const course = req.body;
  const id_list = await courseModel.add(course);
  course.course_id = id_list[0];
  res.status(201).json(course);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  if (id === 0) {
    return res.status(304).end();
  }

  await courseModel.del(id);
  res.json({
    message: 'OK'
  })
})

module.exports = router;