const mongodb = require('../db/database');
const createError = require('http-errors');
const checkIdValidity = require('../utilities/objectIdCheck')

const getAll = async (req, res, next) => {
    //#swagger.tags=['Weapons']
    //#swagger.summary='Get a list of all weapons.'
    //#swagger.description='Retrieves data for all weapons from the database.'
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('weapons')
            .find()
            .toArray();
        if (!result.length) {
            return next(createError(404, 'No weapon data was found.'));
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    //#swagger.tags=['Weapons']
    //#swagger.summary='Get a weapon by its ID.'
    //#swagger.description='Retrieves data for the specified weapon.'
    /* #swagger.parameters['id'] = {
            in: 'path',
            required: 'true',
    } */
    try {
        const weaponId = req.params.id;
        checkIdValidity(weaponId, "weapons", "Weapon");

        const response = await mongodb
            .getDb()
            .db()
            .collection('weapons')
            .findOne({ _id: weaponId });

        if (!response) {
            return next(createError(404, 'No such weapon was found.'));
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const createWeapon = async (req, res, next) => {
    //#swagger.tags=['Weapons']
    //#swagger.summary='Add a new weapon to the database.'
    //#swagger.description='Adds a new weapon to the database.'
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new weapon.',
        schema: { $ref: '#/definitions/CreateWeapon' }
    } */
    try {
        const weapon = {
            name: req.body.name,
            type: req.body.type,
            slots: req.body.slots,
            rank: req.body.rank,
            attack: req.body.attack,
            element: req.body.element,
            sharpness: req.body.sharpness
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('weapons')
            .insertOne(weapon);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error || 'Failed to create the specified weapon.'
            );
        }
    } catch (error) {
        next(error);
    }
};

const updateWeapon = async (req, res, next) => {
    //#swagger.tags=['Weapons']
    //#swagger.summary='Update a weapon.'
    //#swagger.description='Update an existing weapon.'
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update an existing weapon.',
        schema: { $ref: '#/definitions/UpdateWeapon' }
    } */
    try {
        const weaponId = req.params.id;
        checkIdValidity(weaponId, "weapons", "Weapon");
        
        const weapon = {
            name: req.body.name,
            type: req.body.type,
            slots: req.body.slots,
            rank: req.body.rank,
            attack: req.body.attack,
            element: req.body.element,
            sharpness: req.body.sharpness
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('weapons')
            .replaceOne({ _id: weaponId }, weapon);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            return next(
                createError(500, 'Failed to update the specified weapon.')
            );
        }
    } catch (error) {
        next(error);
    }
};

const deleteWeapon = async (req, res, next) => {
    //#swagger.tags=['Weapons']
    //#swagger.summary='Delete a weapon.'
    //#swagger.description='Deletes the specified weapon from the database.'
    try {
        const weaponId = req.params.id;
        checkIdValidity(weaponId, "weapons", "Weapon");

        const result = await mongodb
            .getDb()
            .db()
            .collection('weapons')
            .deleteOne({ _id: weaponId });

        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            return next(
                createError(500, 'Failed to delete the specified weapon.')
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    createWeapon,
    updateWeapon,
    deleteWeapon
};
