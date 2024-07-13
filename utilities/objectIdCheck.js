const { ObjectId } = require('mongodb');
const createError = require('http-errors');

const checkIdValidity = async (id, db, type) => {
    const result = await mongodb.getDb().db().collection(db).findOne({_id: id});

    if (!ObjectId.isValid(id)) {
        throw createError(400, 'Invalid ID format. Must be a valid ObjectId');
    }

    if (!result) {
        throw createError(404, `${type} not found with the given ID`);
    }
};

module.exports = checkIdValidity;