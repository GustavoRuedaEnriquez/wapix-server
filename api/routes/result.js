'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const ResultController = require('../controllers/result');

let api = express.Router();

/**
 * @swagger
 * /result:
 *  post:
 *      tags:
 *          - name: Result
 *      summary: "Create a new result"
 *      description: Create a new result.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "Result object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/Result"
 *      responses:
 *          201:
 *              description: result created successfully.
 *          400:
 *              description: Result not created.
 *          404:
 *              description: Error while saving result.
 *          500:
 *              description: Result not created.
 */
api.post('/result', mdAuth.ensureAuth, ResultController.createResult);

/**
 * @swagger
 * /result/{id}:
 *  get:
 *      tags:
 *          - name: Result
 *      summary: "Find result by id"
 *      description: Get result by id.
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "id of the result to return"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Result obtained.
 *          500:
 *              description: Error.
 *          404:
 *              description: Result not found.
 */
api.get('/result/:_id', mdAuth.ensureAuth, ResultController.readResult);

/**
 * @swagger
 * /result/wapixId/{wapixId}:
 *  get:
 *      tags:
 *          - name: Result
 *      summary: "Find result by Wapix id"
 *      description: Get result by Wapix id.
 *      parameters:
 *          - name: "Wapix id"
 *            in: "path"
 *            description: "Wapix id of the result to return"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Result obtained.
 *          500:
 *              description: Error.
 */
api.get('/result/wapixId/:wapixId', mdAuth.ensureAuth, ResultController.readResultByWapixId)

/**
 * @swagger
 * /result/{id}:
 *  patch:
 *      tags:
 *          - name: Result
 *      summary: "Update result by id"
 *      description: Update result by id.
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "id of the result to update"
 *            required: true
 *            type: string 
 *          - in: body
 *            name: body
 *            description: "Result object to be updated."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/Result"
 *      responses:
 *          200:
 *              description: Result updated.
 *          404:
 *              description: Could not update the result's data.
 *          500:
 *              description: Error.
 */
api.patch('/result/:_id', mdAuth.ensureAuth, ResultController.updateResult);


api.patch('/result-add-question/:_id', mdAuth.ensureAuth, ResultController.addQuestionToResult);


api.patch('/result-add-submission/:_id', mdAuth.ensureAuth, ResultController.addSubmissionToQuestionOnResult);


/**
 * @swagger
 * /result/{id}:
 *  delete:
 *      tags:
 *          - name: Result
 *      summary: "Delete result by id"
 *      description: Delete result by id.
 *      parameters:
 *          - name: "id"
 *            in: "path"
 *            description: "id of the result to be deleted"
 *            required: true
 *            type: string 
 *      responses:
 *          200:
 *              description: Result deleted.
 *          500:
 *              description: Error.
 */
api.delete('/result/:_id', mdAuth.ensureAuth, ResultController.deleteResultById);

module.exports = api;