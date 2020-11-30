'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const UserController = require('../controllers/user');

let api = express.Router();

/**
 * @swagger
 *components:
 *  securitySchemes:
 * 
 *    bearerAuth:          
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT    
 * 
 *    basicAuth:          
 *      type: http
 *      scheme: basic
 * 
 *security:
 *  - bearerAuth: []
 * 
 * /api/user:
 *  post:
 *      tags:
 *          - name: User
 *      summary: "Create a new user"
 *      description: Create a new user.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "User object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/User"
 *      responses:
 *          201:
 *              description: User created successfully.
 *          400:
 *              description: User not created.
 *          500:
 *              description: User not created.
 *          404:
 *              description: Error while saving user.
 */
api.post('/user', UserController.createUser);

/**
 * @swagger
 * /api/user/{email}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *          - name: User
 *      summary: "Find user by email"
 *      description: Get user by email.
 *      parameters:
 *          - in: body
 *            name: user
 *            description: "Email object to be searched."
 *            required: 
 *              - email
 *            properties:
 *               email: 
 *                 type: string 
 *      responses:
 *          200:
 *              description: User obtained.
 *          500:
 *              description: Error.
 *          404:
 *              description: User not found.
 */
api.get('/user/:email', mdAuth.ensureAuth, UserController.readUser);

/**
 * @swagger
 * /api/user/{email}:
 *  patch:
 *      tags:
 *          - name: User
 *      summary: "Update user by email"
 *      description: Update user by email.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "User object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/User" 
 *      responses:
 *          200:
 *              description: User updated.
 *          500:
 *              description: Error.
 *          404:
 *              description: Could not update the user's data.
 */
api.patch('/user/:email', mdAuth.ensureAuth, UserController.updateUser);

/**
 * @swagger
 * /api/user/{email}:
 *  delete:
 *      tags:
 *          - name: User
 *      summary: "Delete user by email"
 *      description: Delete user by email.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "User object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/User" 
 *      responses:
 *          200:
 *              description: User deleted.
 *          500:
 *              description: Error.
 */
api.delete('/user/:email', mdAuth.ensureAuth, UserController.deleteUser);

/**
 * @swagger
 * /api/login:
 *  post:
 *      tags:
 *          - name: User
 *      summary: "Logs user into the system"
 *      description: Logs user into the system.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "User object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/User"
 *      responses:
 *          200:
 *              description: Login successfull.
 *              schema:
 *                  type: string
 *          403:
 *              description: Invalid password.
 *          404:
 *              description: User not found..
 *          500:
 *              description: Error.
 */
api.post('/login', UserController.login)

/**
 * @swagger
 * /api/googleLogin:
 *  post:
 *      tags:
 *          - name: User
 *      summary: "Logs user into the system using Google Authentication"
 *      description: Logs user into the system with its Google Email.
 *      parameters:
 *          - in: body
 *            name: body
 *            description: "User object to be added."
 *            required: true
 *            schema:
 *               $ref: "#/definitions/User" 
 *      responses:
 *          200:
 *              description: Login successfull.
 *              schema:
 *                  type: string
 *          403:
 *              description: Invalid password.
 *          404:
 *              description: User not found..
 *          500:
 *              description: Error.
 */
api.post('/googleLogin', UserController.googleLogin)

api.post('/upload', UserController.upload.single('image'), UserController.uploadImage); 

module.exports = api;