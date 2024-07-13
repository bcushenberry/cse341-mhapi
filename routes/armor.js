const router = require('express').Router();
const armorController = require('../controllers/armor');
const { armorValidationRules, validate } = require('../utilities/armorValidation');
const utilities = require('../utilities/')

// List all armors (GET)
router.get('/', utilities.errorHandler(armorController.getAll));

// Show individual armor (GET)
router.get('/:id', utilities.errorHandler(armorController.getById));

// Create new armor (POST)
router.post('/', armorValidationRules(), validate, utilities.errorHandler(armorController.createArmor));

// Update armor data (PUT)
router.put('/:id', armorValidationRules(), validate, utilities.errorHandler(armorController.updateArmor));

// Delete individual armor (DELETE)
router.delete('/:id', utilities.errorHandler(armorController.deleteArmor));

module.exports = router;
