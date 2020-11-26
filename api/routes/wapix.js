'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const WapixController = require('../controllers/wapix');

let api = express.Router();

/**
 * @swagger
 * /api/wapix:
 *  post:
 *      tags:
 *          - name: Wapix
 *      summary: "Create a new wapix"
 *      description: Create a new wapix.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "Wapix object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/Wapix"
 *      responses:
 *          201:
 *              description: Wapix created successfully.
 *          400:
 *              description: Wapix not created.
 *          404:
 *              description: Error while saving wapix.
 *          500:
 *              description: Wapix not created.
 */
api.post('/wapix', mdAuth.ensureAuth, WapixController.createWapix);

/**
 * @swagger
 * /api/wapix/{id}:
 *  get:
 *      tags:
 *          - name: Wapix
 *      summary: "Find wapix by id"
 *      description: Get wapix by id.
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "id of the wapix to return"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Wapix obtained.
 *          404:
 *              description: Wapix not found.
 *          500:
 *              description: Error.
 */
api.get('/wapix/:_id', mdAuth.ensureAuth, WapixController.readWapix);

/**
 * @swagger
 * /api/wapix/{creator}/{email}:
 *  get:
 *      tags:
 *          - name: Wapix
 *      summary: "Find wapix by email"
 *      description: Get wapix by email.
 *      parameters:
 *          - name: "email"
 *            in: "path"
 *            description: "Email of the creator of the wapix to return"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Wapix obtained.
 *          404:
 *              description: Wapix not found.
 *          500:
 *              description: Error.
 */
api.get('/wapix/creator/:email', mdAuth.ensureAuth, WapixController.readWapixesByEmail)

/**
 * @swagger
 * /api/wapix/{_id}/{number}:
 *  get:
 *      tags:
 *          - name: Wapix
 *      summary: "Read Wapix by Question"
 *      description: Get wapix by question number.
 *      parameters:
 *          - name: "_id"
 *            in: "path"
 *            description: "Id of the wapix to read"
 *            required: true
 *            type: string 
 *          - name: "number"
 *            in: "path"
 *            description: "Number of the question of the wapix to read"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Question obtained.
 *          404:
 *              description: Wapix not found.
 *          500:
 *              description: Error.
 */
api.get('/wapix/:_id/:number', mdAuth.ensureAuth, WapixController.readWapixQuestion)

/**
 * @swagger
 * /api/wapix-activate/{_id}:
 *  get:
 *      tags:
 *          - name: Wapix
 *      summary: "Activate Wapix to be playable"
 *      description: Activate wapix by id.
 *      parameters:
 *          - name: "_id"
 *            in: "path"
 *            description: "Id of the wapix to activate"
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Wapix activated.
 *          404:
 *              description: Wapix not found.
 *          500:
 *              description: Error.
 */
api.patch('/wapix-activate/:_id', mdAuth.ensureAuth, WapixController.activateWapix)

/**
 * @swagger
 * /api/wapix-deactivate/{_id}:
 *  get:
 *      tags:
 *          - name: Wapix
 *      summary: "Deactivate Wapix to be unplayable"
 *      description: Deactivate wapix by id.
 *      parameters:
 *          - name: "_id"
 *            in: "path"
 *            description: "Id of the wapix to deactivate"
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Wapix deactivated.
 *          404:
 *              description: Wapix not found.
 *          500:
 *              description: Error.
 */
api.patch('/wapix-deactivate/:_id', mdAuth.ensureAuth, WapixController.deactivateWapix)

/**
 * @swagger
 * /api/wapix-activate/{code}:
 *  get:
 *      tags:
 *          - name: Wapix
 *      summary: "Wapix to play with code"
 *      description: Play wapix with its code.
 *      parameters:
 *          - name: "code"
 *            in: "path"
 *            description: "Code of the wapix to play"
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              Wapix available to play..
 *          404:
 *              There is not a Wapix available to play with that code..
 *          500:
 *              description: Error.
 */
api.get('/wapix-by-code/:code', WapixController.readWapixByCode)

/**
 * @swagger
 * /api/wapix/{id}:
 *  patch:
 *      tags:
 *          - name: Wapix
 *      summary: "Update wapix by id"
 *      description: Update wapix by id.
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "id of the wapix to update"
 *            required: true
 *            type: string 
 *          - in: body
 *            name: body
 *            description: "Wapix object to be updated."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/Wapix"
 *      responses:
 *          200:
 *              description: Wapix updated.
 *          404:
 *              description: Could not update the wapix's data.
 *          500:
 *              description: Error.
 */
api.patch('/wapix/:_id', mdAuth.ensureAuth, WapixController.updateWapix);

/**
 * @swagger
 * /api/wapix/{id}:
 *  delete:
 *      tags:
 *          - name: Wapix
 *      summary: "Delete wapix by id"
 *      description: Delete wapix by id.
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "id of the wapix to be deleted"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Wapix deleted.
 *          500:
 *              description: Error.
 */
api.delete('/wapix/:_id', mdAuth.ensureAuth, WapixController.deleteWapixById);

module.exports = api;