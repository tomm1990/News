'use strict';

const mongoose = require('mongoose'),
    consts = require('../data/consts.js'),
    promise = require('promise'),
    Reporter = require('../defineSchema/Reporter'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

mongoose.connect(consts.MLAB_KEY);
var conn = mongoose.connection;

conn.on('error', (err) => {
    console.log(`connection error: ${err}`);
});

class ReporterClass {
    constructor(){

    }

    getAllReporters(){
        return new Promise( (resolve,reject) => {
            Reporter.find({

            }, (err,reporter) => {
                if(err){
                    console.log(`err from Reporter class -> ${err}`);
                    reject(err);
                } else {
                    resolve(reporter);
                }
            })
        });
    }

}

module.exports = ReporterClass;