const router = require('express').Router();
const weaponController = require('../controllers/weapons');
const { weaponValidationRules, validate } = require('../utilities/weaponValidation');

// List all weapons (GET)
router.get('/', weaponController.getAll);

// Show individual weapon (GET)
router.get('/:id', weaponController.getById);

// Create new weapon (POST)
router.post('/', weaponValidationRules(), validate, weaponController.createWeapon);

// Update weapon data (PUT)
router.put('/:id', weaponValidationRules(), validate, weaponController.updateWeapon);

// Delete individual weapon (DELETE)
router.delete('/:id', weaponController.deleteWeapon);

module.exports = router;
