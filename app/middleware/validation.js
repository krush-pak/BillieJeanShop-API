const validator = require("validator");
// validator only accepts strings so we have to coerce it by adding +''
const validation = {
  registerInput: (req, res, next) => {
    let errors = [];

    // check if email empty or not valid
    if (
      validator.isEmpty(req.body.email + "") ||
      req.body.email === undefined
    ) {
      errors.push({
        email: "Email is required"
      });
    }

    if (!validator.isEmail(req.body.email + "")) {
      errors.push({
        email: "Please provide a valid email"
      });
    }

    // check if name not empty and less than 20 characters
    if (validator.isEmpty(req.body.name + "") || req.body.name === undefined) {
      errors.push({
        name: "Name is required"
      });
    }

    const nameMax = 20;
    if (!validator.isLength(req.body.name + "", { max: nameMax })) {
      errors.push({
        name: `Name must not be longer than ${nameMax} characters`
      });
    }

    // check if password not empty and between 4 and 20 characters
    if (
      validator.isEmpty(req.body.password + "") ||
      req.body.password === undefined
    ) {
      errors.push({
        password: "Password is required"
      });
    }

    const pwMin = 4;
    const pwMax = 20;
    if (
      !validator.isLength(req.body.password + "", { min: pwMin, max: pwMax })
    ) {
      errors.push({
        password: `Password must be between ${pwMin} and ${pwMax} characters`
      });
    }

    // check if password2 matches with password
    if (
      !validator.equals(req.body.password + "", req.body.password2 + "") ||
      req.body.password2 === undefined
    ) {
      errors.push({
        password: "Passwords must match"
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } else {
      return next();
    }
  },
  loginInput: (req, res, next) => {
    let errors = [];

    // check if email empty or not valid
    if (
      validator.isEmpty(req.body.email + "") ||
      req.body.email === undefined
    ) {
      errors.push({
        email: "Email is required"
      });
    }

    if (!validator.isEmail(req.body.email + "")) {
      errors.push({
        email: "Please provide a valid email"
      });
    }

    // check if password not empty
    if (
      validator.isEmpty(req.body.password + "") ||
      req.body.password === undefined
    ) {
      errors.push({
        password: "Password is required"
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } else {
      return next();
    }
  },
  passwordResetInput: (req, res, next) => {
    let errors = [];

    // check if password not empty and between 4 and 20 characters
    if (
      validator.isEmpty(req.body.password + "") ||
      req.body.password === undefined
    ) {
      errors.push({
        password: "Password is required"
      });
    }

    const pwMin = 4;
    const pwMax = 20;
    if (
      !validator.isLength(req.body.password + "", { min: pwMin, max: pwMax })
    ) {
      errors.push({
        password: `Password must be between ${pwMin} and ${pwMax} characters`
      });
    }

    // check if password2 matches with password
    if (
      !validator.equals(req.body.password + "", req.body.password2 + "") ||
      req.body.password2 === undefined
    ) {
      errors.push({
        password: "Passwords must match"
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } else {
      return next();
    }
  }
};

module.exports = validation;
