// add middlewares here related to projects
// projects-middleware.js

// Middleware function to validate project update request
function validateProjectUpdate(req, res, next) {
    const { name, description, completed } = req.body;

    // Validate request data
    if (!name || !description || completed === undefined) {
      const error = new Error('Please provide name, description, and completion status for the project');
      error.statusCode = 400;
      return next(error);
    }

    next();
  }

  module.exports = {
    validateProjectUpdate,
  };
