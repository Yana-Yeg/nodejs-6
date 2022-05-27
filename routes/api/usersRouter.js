const express = require("express");
const multer = require("multer");
const mime = require("mime-types");
const uuid = require("uuid");
const router = express.Router();
const {
  catchErrors,
  conflict,
  forbidden,
} = require("../../middlewares/catch-errors");

const {
  register,
  login,
  logout,
  currentUser,
  avatarsUpdate,
} = require("../../models/users");
const { userRegLoginValidation } = require("../../middlewares/validMiddleware");
const authorize = require("../../middlewares/authorization");

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const extname = mime.extension(file.mimetype);
      const filename = uuid.v4() + "." + extname;
      cb(null, filename);
    },
    destination: "./tmp",
  }),
});

router.post(
  "/signup",
  userRegLoginValidation,
  conflict(async (req, res) => {
    const { email, subscription, avatarURL } = await register(req.body);
    res.status(201).json({
      contentType: "application/json",
      ResponseBody: { user: { email, subscription, avatarURL } },
    });
  })
);

router.post(
  "/login",
  userRegLoginValidation,
  forbidden(async (req, res) => {
    const { email, subscription, token } = await login(req.body);

    if ((email, subscription, token)) {
      res.status(200).json({
        contentType: "application/json",
        ResponseBody: { token, user: { email, subscription } },
      });
    }
    res.status(401).json({
      ResponseBody: { message: "Email or password is wrong" },
    });
  })
);

router.get(
  "/logout",
  authorize,
  catchErrors(async (req, res) => {
    const user = await logout(req.user.token);
    user.token = null;
    res.sendStatus(204);
  })
);

router.get(
  "/current",
  authorize,
  catchErrors(async (req, res) => {
    const user = await currentUser(req.user.token);
    res.status(200).json({
      contentType: "application/json",
      ResponseBody: { user },
    });
  })
);

router.patch(
  "/avatars",
  authorize,
  upload.single("avatar"),
  catchErrors(async (req, res, next) => {
    const { avatarURL } = await avatarsUpdate(req.user.token, req.file);
    res.status(200).json({
      contentType: "application/json",
      ResponseBody: { avatarURL },
    });
  })
);

module.exports = router;
