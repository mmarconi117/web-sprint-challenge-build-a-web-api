// add middlewares here related to actions
// actions/actions-middleware.js

// Middleware function to validate action update request
function validateActionUpdate(req, res, next) {
    const { description, notes, completed } = req.body;

    // Validate request data
    if (!description || !notes || completed === undefined) {
      const error = new Error('Please provide description, notes, and completion status for the action');
      error.statusCode = 400;
      return next(error);
    }

    next();
  }

  // actions-middleware.js

// Middleware function to validate action ID parameter
function validateActionId(req, res, next) {
    const { id } = req.params;

    // Validate if action ID is provided and is a valid integer
    if (!id || isNaN(id)) {
        res.status(400).json({ message: 'Please provide a valid action ID' });
        return;
    }

    next();
}




  module.exports = {
    validateActionUpdate,
    validateActionId,
  };
