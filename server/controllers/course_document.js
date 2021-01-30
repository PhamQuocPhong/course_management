const { where } = require('sequelize/types');
const courseDocumentModel = require('../models/course_document');
const stateDocumentModel = require('../models/state_document');


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

let changeStateDocument = async (req, res) => {
    const {time, done, userId, documentId} = req.body;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        if(await stateDocumentModel.findOne({where:{userId, documentId}} ))
        {
            stateDocumentModel.update(
                {
                    state: time,
                    done
                },
                {
                    where: {userId, documentId}
                }
            )
            
        }
        
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let getStateDocument = async (req, res) => {
    const {userId, documentId} = req.body;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        var stateDocument = await stateDocumentModel.findOne({where:{userId, documentId}} )
        
        return res.status(200).json({message: 'Success!', data: stateDocument})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

module.exports = {
    createDocument,
    updateDocument,
    deleteDocument,

    changeStateDocument,
    getStateDocument
}