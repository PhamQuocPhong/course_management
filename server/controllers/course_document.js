const { where } = require('sequelize/types');
const courseDocumentModel = require('../models/course_document');

//Teacher
let createDocument = async (req, res) => {
    const {name, description, preview, type, preview} = req.body;

    try
    {
        await courseDocumentModel.create({
            name,
            description,
            preview,
            preview,
            courseId,
            type,
            chapterId
            
         });
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let updateDocument = async (req, res) => {
    const {name, description, preview, type, preview} = req.body;
    const courseDocumentId = req.params.id;
    try
    {
        await courseDocumentModel.update({
            name,
            description,
            preview,
            preview,
            courseId,
            type,
            chapterId
            
         },
         {where: {id : courseDocumentId}});
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}


let deleteDocument = async (req, res) => {
    const courseDocumentId = req.params.id;
    try
    {
        await courseDocumentModel.destroy({
            where: {id: courseDocumentId}
            
        })
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

module.exports = {
    createDocument,
    updateDocument,
    deleteDocument
}