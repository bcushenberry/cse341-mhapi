const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');
const createError = require('http-errors');
const checkIdValidity = require('../utilities/objectIdCheck')

const getAll = async (req, res, next) => {
    //#swagger.tags=['Armor']
    //#swagger.summary='Get a list of all armor.'
    //#swagger.description='Retrieves all armor from the database.'
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('armor')
            .find()
            .toArray();
        if (!result.length) {
            return next(createError(404, 'No armor data was found.'));
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res, next) => {
    //#swagger.tags=['Armor']
    //#swagger.summary='Get a armor by its ID.'
    //#swagger.description='Retrieves data for the specified armor.'
    /* #swagger.parameters['id'] = {
            in: 'path',
            required: 'true',
    } */
    try {
        const armorId = req.params.id;

        if (!ObjectId.isValid(armorId)) {
            return next(createError(400,'Invalid armor ID format. Must be a valid ObjectId'));
        }

        const objectId = new ObjectId(armorId);

        const response = await mongodb
            .getDb()
            .db()
            .collection('armor')
            .findOne({ _id: objectId });

        if (!response) {
            return next(createError(404, 'No such armor was found.'));
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const createArmor = async (req, res, next) => {
    //#swagger.tags=['Armor']
    //#swagger.summary='Create a new armor piece.'
    //#swagger.description='Adds a new armor piece to the database.'
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new armor piece.',
        schema: { $ref: '#/definitions/CreateArmor' }
    } */
    try {
        const armor = {
            name: req.body.name,
            type: req.body.type,
            slots: req.body.slots,
            rank: req.body.rank,
            defense: req.body.defense
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('armor')
            .insertOne(armor);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error || 'Failed to create the specified armor.'
            );
        }
    } catch (error) {
        next(error);
    }
};

const updateArmor = async (req, res, next) => {
    //#swagger.tags=['Armor']
    //#swagger.summary='Update an armor piece.'
    //#swagger.description='Updates an existing armor piece.'
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update an existing armor piece.',
        schema: { $ref: '#/definitions/UpdateArmor' }
    } */
    try {
        const armorId = req.params.id;

        if (!ObjectId.isValid(armorId)) {
            return next(createError(400,'Invalid armor ID format. Must be a valid ObjectId'));
        }

        const objectId = new ObjectId(armorId);

        const armor = {
            name: req.body.name,
            type: req.body.type,
            slots: req.body.slots,
            rank: req.body.rank,
            defense: req.body.defense
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('armor')
            .replaceOne({ _id: objectId }, armor);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            return next(
                createError(500, 'Failed to update the specified armor.')
            );
        }
    } catch (error) {
        next(error);
    }
};

const deleteArmor = async (req, res, next) => {
    //#swagger.tags=['Armor']
    //#swagger.summary='Delete a armor.'
    //#swagger.description='Deletes the specified armor from the database.'
    try {
        const armorId = req.params.id;

        if (!ObjectId.isValid(armorId)) {
            return next(createError(400,'Invalid armor ID format. Must be a valid ObjectId'));
        }

        const objectId = new ObjectId(armorId);

        const result = await mongodb
            .getDb()
            .db()
            .collection('armor')
            .deleteOne({ _id: objectId });

        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            return next(
                createError(500, 'Failed to delete the specified armor.')
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    createArmor,
    updateArmor,
    deleteArmor
};
