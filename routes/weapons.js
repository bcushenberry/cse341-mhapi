const router = require('express').Router();
const weaponController = require('../controllers/weapons');
const { weaponValidationRules, validate } = require('../utilities/weaponValidation');
const utilities = require('../utilities/')

// List all weapons (GET)
router.get('/', utilities.errorHandler(weaponController.getAll));

// Show individual weapon (GET)
router.get('/:id', utilities.errorHandler(weaponController.getById));

// Create new weapon (POST)
router.post('/', weaponValidationRules(), validate, utilities.errorHandler(weaponController.createWeapon));

// Update weapon data (PUT)
router.put('/:id', weaponValidationRules(), validate, utilities.errorHandler(weaponController.updateWeapon));

// Delete individual weapon (DELETE)
router.delete('/:id', utilities.errorHandler(weaponController.deleteWeapon));

module.exports = router;
