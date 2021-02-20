const courseChapterModel = require('../models/course_chapter');

//Teacher
let store = async (req, res) => {
    const data = req.body;
    try
    {
        var courseChapter = await courseChapterModel.create(data);

        return res.status(201).json({message: 'Success!', data: courseChapter})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let update = async (req, res) => {
    const form = req.body;
    const courseChapterId = req.params.id;

    try
    {
        var data = await courseChapterModel.update(form, {
            where: {
                id: courseChapterId
            },
            returning: true,
            plain: true
        });
        return res.status(200).json({message: 'Success!', data: data[1]})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let remove = async (req, res) => {
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
    store,
    update,
    remove
}