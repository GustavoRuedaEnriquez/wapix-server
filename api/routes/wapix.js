'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const WapixController = require('../controllers/wapix');

let api = express.Router();

/**
 * @swagger
 * /wapix:
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
 * /wapix/{id}:
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
 * /wapix/creator/{email}:
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

api.get('/wapix/:_id/:number', mdAuth.ensureAuth, WapixController.readWapixQuestion)

api.get('/wapix-by-code/:code', WapixController.readWapixByCode)

/**
 * @swagger
 * /wapix/{id}:
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
 * /wapix/{id}:
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