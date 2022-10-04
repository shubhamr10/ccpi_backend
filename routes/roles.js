"use strict"
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const RolesModel = require("../models/Role.model");
const errorValidator = require("../middleware/checkError.middleware");

/* POST CREATE ROLES. */
router.post('/create-role',
    check("role_name","Role is required").not().isEmpty(),
    check("role_permission","Adding permission is must").exists(),
    errorValidator,
    async (req, res, next) => {

    const { role_name, role_permission } = req.body;
    try{
        const doesRoleAlreadyExists = await RolesModel.findOne({role_name});
        if(doesRoleAlreadyExists) return res.status(400).json({
            success:false,
            error:true,
            errors: [{msg: "Role already exists"}]
        });

        const newRole = new RolesModel({
            role_name, role_permission
        });
        await newRole.save();
        return res.json({
            success:true,
            error:false,
            data: "Role created successfully"
        })
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success:false,
            error:true,
            errors: [{msg: "Internal server error"}]
        });
    }
});


/**
 * 
 * 
 */
router.get("/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        if(!id || id === undefined || id === null){
            throw new Error("No id present")
        } else {
            const getRole = await RolesModel.findOne({_id: id});
            return res.json({
                success:true,
                error:false,
                data: getRole
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success:false,
            error:true,
            errors: [{msg: "Internal server error"}]
        });
    }
});

/* GET ALL ROLES */
router.get("/", async (req, res, next) => {
    try{
        const rolesList = await RolesModel.find({}).select("uid role_name");
        return res.json({
            success:true,
            error:false,
            data: rolesList
        })
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success:false,
            error:true,
            errors: [{msg: "Internal server error"}]
        });
    }
})

module.exports = router;
