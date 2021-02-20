const promotionModel = require('../models/promotion');

let store = async (req, res) => {

    var form = req.body

    try{
        var data = await promotionModel.create(form);
        return res.status(200).json({message: 'Success', data: data})
 
    }catch(error){
        return res.status(500).json({message: error})
    }
}

let update = async (req, res) => {

    var form = req.body;
    var id = req.params.id;
    try{
        var data = await promotionModel.update(form, {
            where: {
                id: id
            },
            returning: true,
            plain: true
        });
        return res.status(200).json({message: 'Success', data: data[1]})
 
    }catch(error){
        return res.status(500).json({message: error})
    }
}

let remove = async (req, res) => {
    var id = req.params.id;
    try{
        const data = await promotionModel.destroy({
            where: {
                id: id
            },
        });

        const findCourseByCategory = await courseModel.count({
            where: {
                categoryId: id
            }
        });

        return res.status(200).json({message: 'Success', data: data})
    }catch(error){
        return res.status(500).json({message: error})
    }
}

module.exports = {
    store,
    update,
    remove
}