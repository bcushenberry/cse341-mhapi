const router = require('express').Router();
const armorController = require('../controllers/armor');
const { armorValidationRules, validate } = require('../utilities/armorValidation');

// List all armors (GET)
router.get('/', armorController.getAll);

// Show individual armor (GET)
router.get('/:id', armorController.getById);

// Create new armor (POST)
router.post('/', armorValidationRules(), validate, armorController.createArmor);

// Update armor data (PUT)
router.put('/:id', armorValidationRules(), validate, armorController.updateArmor);

// Delete individual armor (DELETE)
router.delete('/:id', armorController.deleteArmor);

module.exports = router;
