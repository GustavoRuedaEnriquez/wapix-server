'use strict'

const User = require('../models/user');

function createUser(req, res) {
    let user = new User();
    let body  = req.body;

    user.username = body.username;
    user.email = body.email;
    user.password = body.password;
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

    if(body.username != undefined) {
        update.username = body.username;
    }
    if(body.password != undefined) {
        update.password = body.password;
    }
    if(body.image != undefined) {
        update.image = body.image;
    }

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

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}