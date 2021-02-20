const courseDocumentModel = require('../models/course_document');
const stateDocumentModel = require('../models/state_document');
const helper = require('../helpers/helper');

//Teacher
let store = async (req, res) => {
    const data = req.body;
    try
    {
        if(helper.isVideo(data.link))
        {
            data.type = 1
        }else 
        {
            data.type = 0;
        }

        var newDocument = await courseDocumentModel.create(data);
        return res.status(201).json({message: 'Success!', data: newDocument})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let update = async (req, res) => {
    const data  = req.body;
    const courseDocumentId = req.params.id;
    try
    {
        if(helper.isVideo(data.link))
        {
            data.type = 1
        }else 
        {
            data.type = 0;
        }


        var documentUpdate = await courseDocumentModel.update(
            data,
            {
                where: {id : courseDocumentId},
                returning: true,
                plain: true
            }
        );
        return res.status(200).json({message: 'Success!', data: documentUpdate[1]})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}


let remove = async (req, res) => {
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
    const {time, done, documentId} = req.body;
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
    const {documentId} = req.body;
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
    store,
    update,
    remove,

    changeStateDocument,
    getStateDocument
}