'use strict'

const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require('../models/user');

require('dotenv').config();

let SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

function createUser(req, res) {
    let user = new User();
    let body  = req.body;

    user.username = body.username;
    user.email = body.email;
    user.password = body.password;
    user.googleId = body.googleId;
    user.image = (body.image != undefined) ? body.image : "";

    let errorMessage = 'The following fields are required: '
    let error = false;

    if(user.username == undefined) {
        error = true;
        errorMessage += 'username '
    }
    if(user.email == undefined) {
        error = true;
        errorMessage += 'email '
    }
    if(user.password == undefined) {
        error = true;
        errorMessage += 'password '
    }
    if(error) {
        res.status(400).send({ message : `${errorMessage}` });
    } else {
        user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
        user.save((err, storedUser) => {
            if(err){
                res.status(500).send({ mesage :  `${err}` });
            } else {
                if(!storedUser){
                    res.status(404).send({ message : 'Error while saving user.' });
                } else {
                    res.status(201).send({ message : 'User created successfully.', user : storedUser });
                }
            }
        });
    }
}

function readUser(req,res){
    let userEmail = req.params.email;
    User.find({email: userEmail},(err,user) => {
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(Object.entries(user).length === 0){
                res.status(404).send({ message : 'User not found.' });
            }else{
                res.status(200).send({ message : 'User obtained', user : user});
            }
        }
    });
}

function updateUser(req, res) {
    let userEmail = req.params.email;
    let body = req.body;
    let update = {};

    if(body.username != undefined && body.username.trim() != '') {
        update.username = body.username;
    }
    if(body.password != undefined) {
        update.password = bcrypt.hashSync(body.password, SALT_ROUNDS);
    }
    if(body.image != undefined) {
        update.image = body.image;
    }
    if(body.googleId != undefined) {
        update.googleId = body.googleId;
    }

    if(body.username.trim() != '') {
        User.findOneAndUpdate({ email : userEmail }, update, { new : true, useFindAndModify : false}, (err,updatedUser) =>{
            if(err){
                res.status(500).send({ message: `${err}` });
            }else{
                if(!updatedUser){
                    res.status(404).send({ message : 'Could not update the user\'s data.' });
                }else{
                    res.status(200).send({ message :'User\'s data updated.', user : updatedUser })
                }
            }
        });
    }  else {
        res.status(404).send({ message : 'Could not update the user\'s data.' });
    }

    
}

function deleteUser(req, res) {
    let userEmail = req.params.email;
    // TODO: Erase all Wapix and results linked to the user.
    User.deleteOne({ email : userEmail}, (err) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'User deleted.' });
        }
    });
}

function login(req, res) {
    let body  = req.body;

    let email = body.email;
    let password = body.password;

    let errorMessage = 'The following fields are required: '
    let error = false;

    if(email == undefined) {
        error = true;
        errorMessage += 'email '
    }
    if(password == undefined) {
        error = true;
        errorMessage += 'password '
    }
    if(error) {
        res.status(400).send({ message : `${errorMessage}` });
    } else {
        User.findOne({ email : email },(err,user) => {
            if(err){
                res.status(500).send({ message : `${err}` });
            } else {
                if(!user){
                    res.status(404).send({ message : 'User not found.' });
                } else {
                    if(bcrypt.compareSync(password, user.password)){
                        let token = jwt.createToken(user);
                        res.status(200).send({ message: 'Logged in', token : token, user : user});
                    } else {
                        res.status(403).send({ message: 'Invalid password' });
                    }
                }
            }
        });
    }

}

function googleLogin(req, res) {
    googleClient.verifyIdToken({
        idToken: req.body.idToken
    }).then(googleResponse => {
        const responseData = googleResponse.getPayload();
        const googleEmail = responseData.email;
        User.find({email: googleEmail},(err,user) => {
            if(err){
                res.status(500).send({ message: `${err}` });
            }else{ //Create User
                if(Object.entries(user).length === 0){
                    console.log('User does not exists, creating...');
                    let newUser =  
                        {   body: {
                                'username': req.body.name,
                                'email': req.body.email,
                                'password': req.body.id,
                                'image': req.body.photoUrl,
                                'googleId': req.body.id

                            }};
                    console.log('newUser', newUser);
                    createUser(newUser, res);
                }else{
                    if(!user[0].googleId) { //Exists but w/o Google ID
                        console.log('Does not have google ID');
                        let update =  
                        {   
                            params: {
                                'email': req.body.email
                            },
                            body: {
                                'username': req.body.name,
                                'googleId': req.body.id
                                }
                        };
                        console.log('update', update);
                        updateUser(update, res);
                    } else { //Exists and has Google ID
                        console.log('Already has google ID');
                        let token = jwt.createToken(user[0]);
                        res.status(200).send({ message: 'Logged in', token : token, user : user});
                    }
                }
            }
        });
    }).catch(err => {res.status(400).send();});
}


module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    login,
    googleLogin
}