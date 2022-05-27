const express = require("express");
const router = express.Router();
const { catchErrors } = require("../../middlewares/catch-errors");

const {
  // listContacts,
  sortContactsBy,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  listPaginationContacts,
} = require("../../models/contacts");

const {
  fullPostValidation,
  patchPostValidation,
  patchStatusValidation,
} = require("../../middlewares/validMiddleware");

// router.get(
//   "/",
//   catchErrors(async (req, res) => {
//     const data = await listContacts();
//     res.status(200).json(data);
//   })
// );

router.get(
  "/",
  catchErrors(async (req, res) => {
    // const { order } = req.query;
    const data = await sortContactsBy();
    res.status(200).json(data);
  })
);

router.get(
  "/",
  catchErrors(async (req, res) => {
    let { skip = 0, limit = 5 } = req.query;
    skip = parseInt(skip);
    limit = parseInt(limit);
    const data = await listPaginationContacts({ skip, limit });
    res.status(200).json(data);
  })
);

router.get(
  "/:contactId",
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!contactId) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json(data);
  })
);

router.post(
  "/",
  fullPostValidation,
  catchErrors(async (req, res) => {
    const { name, email, phone, favorite } = req.body;
    const newContact = await addContact(name, email, phone, favorite);
    res.status(201).json({ status: "success", newContact });
  })
);

router.delete(
  "/:contactId",
  catchErrors(async (req, res, next) => {
    const { contactId } = req.params;
    const contactById = await removeContact(contactId);
    if (!contactById) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  })
);

router.put(
  "/:contactId",
  fullPostValidation,
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (!updateContactItem) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "success", updateContactItem });
  })
);

router.patch(
  "/:contactId",
  patchPostValidation,
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (!updateContactItem) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "success", updateContactItem });
  })
);

router.patch(
  "/:contactId/favorite",
  patchStatusValidation,
  catchErrors(async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updateContactItemStatus = await updateStatusContact(contactId, {
      favorite,
    });
    if (!updateContactItemStatus) {
      return res.status(404).json({ status: "Not found" });
    }
    res.status(200).json({ status: "success", updateContactItemStatus });
  })
);

// contacts?page=1&limit=20

module.exports = router;
