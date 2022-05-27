const Joi = require("joi");

module.exports = {
  fullPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().optional(),
      owner: Joi.string().optional(),
    });

    const validResult = schema.validate(req.body);
    if (validResult.error) {
      return res.status(400).json({
        message: "missing required name field",
        status: validResult.error.details,
      });
    }

    next();
  },

  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .optional(),
      phone: Joi.string().optional(),
      favorite: Joi.boolean().optional(),
      owner: Joi.string().optional(),
    });

    const validResult = schema.validate(req.body);
    if (validResult.error) {
      return res.status(404).json({ status: validResult.error.details });
    }

    next();
  },

  patchStatusValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const validResult = schemaValid.validate(req.body);
    if (validResult.error) {
      return res.status(400).json({
        message: "missing field favorite",
        status: validResult.error.details,
      });
    }
    next();
  },

  userRegLoginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      password: Joi.string().required(),
      subscription: Joi.string().optional(),
      token: Joi.string().optional(),
      avatarURL: Joi.string().optional(),
    });

    const validResult = schema.validate(req.body);
    if (validResult.error) {
      return res.status(400).json({
        // message: "invaliv email or password",
        contentType: "application/json",
        ResponseBody: validResult.error.details,
      });
    }

    next();
  },
};
