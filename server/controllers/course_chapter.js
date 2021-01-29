const courseChapterModel = require('../models/course_chapter');

//Teacher
let createChapter = async (req, res) => {
    const {name, description, preview, courseId} = req.body;

    try
    {
        var courseChapter = await courseChapterModel.create({
            name,
            description,
            preview,
            courseId
         });
        return res.status(200).json({message: 'Success!', courseChapterId: courseChapter.id})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let updateChapter = async (req, res) => {
    const {name, description, preview} = req.body;
    const courseChapterId = req.params.id;

    try
    {
        var courseChapter = await courseChapterModel.update({
            name,
            description,
            preview
         },
         {where: {id: courseChapterId}});
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let deleteChapter = async (req, res) => {
    const courseChapterId = req.params.id;

    try
    {
        var courseChapter = await courseChapterModel.destroy({
            where: {id: courseChapterId}
        });
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}


module.exports = {
    createChapter,
    updateChapter,
    deleteChapter
}