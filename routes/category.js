const express = require('express');
const router = express.Router();

const { create , categoryById, read,list, remove, update} = require("../controllers/category");
const { userById } = require("../controllers/user");
const {requireSignin, isAdmin, isAuth } = require("../controllers/auth");

router.get('/category/:categoryId', read)
router.post("/category/create", requireSignin, isAuth, isAdmin , create);
router.delete('/category/:categryId/:userId', requireSignin, isAuth, isAdmin , remove)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin , update)
router.get("/categories", list)
router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router;