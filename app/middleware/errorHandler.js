// Middleware to standardize error handling and the case that no route is reached
module.exports = (req, res, next) => {
  // an error in the application occured
  if (res.locals && res.locals.error) {
    const { error } = res.locals;
    // error we need to tell the user about
    if (error.statusCode) {
      res.status(error.statusCode).json({ errors: error.message });
    } else {
      // generic catch all for server errors
      console.error(error);
      res.status(500).json({
        errors: [{ server: "Ooops, an error occured. Please try again later." }]
      });
    }
  } else {
    // the requeste route does not exist
    res.status(404).json({
      errors: [{ server: "The requested route does not exist." }]
    });
  }
};
