'use strict';

const data = require('./data/news.json'),
    mongoose = require('mongoose'),
    consts = require('./data/consts.js'),
    Reporter = require('./defineSchema/Reporter'),
    //Repo = require('./class/ReporterClass'),
    Vod = require('./defineSchema/Vod'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

mongoose.connect(consts.MLAB_KEY,options);

/*
 * Gets all VOD's rated over {rate} input
 *
 * @type
 *   POST
 *
 * @param
 *   rate : Number {0 < id < 15}
 *
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/getVodRatedHigherThan
 *   [rate][8]
 */
exports.getVodRatedHigherThan = (req,res)=>{
    console.log('getVodRatedHigherThan() :: req.body.rate -> '+req.body.rate);
    var _rate = req.body.rate ? req.body.rate : 0;
    if(_rate<=0 || _rate > 15 ) {
        res.status(200).json({ "err" : "wrong input" });
        return;
    }
    Vod.find({
        rate : { $gt : _rate }
    }, (err,vod) => {
        if(err){
            console.log(`err -> ${err}`);
            res.status(200).json(`{ err : ${err}`);
        } else {
            console.log(vod);
            res.status(200).json(vod);
        }
    });
};

/*
 * Gets all Reporters's from a specific VOD ID
 *
 * @type
 *   POST
 *
 * @param
 *   id : Number {501 < id < 505}
 *
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/getReporterByVodID
 *   [id][501]
 */
exports.getReporterByVodID = (req,res)=>{
    console.log('getReporterByVodID() :: req.body.id -> '+req.body.id);
    var _vod,
        _id = req.body.id?req.body.id:0;
    if(_id > 505 || _id < 501){
        res.status(200).json({ "err" : "wrong input" });
        return;
    }
    Vod.find({
        id : _id
    }, (err,vod)=>{
        if(err){
            console.log(`err -> ${err}`);
            res.status(200).json(`{ err : ${err}`);
        } else {
            console.log(vod);
            _vod = vod;
            console.log(`rep.vod -> ${ _vod[0].reporter }` );
            Reporter.find({
                id : { $in : _vod[0].reporter }
            }, (err,reporter)=>{
                if(err) {
                    console.log(`err -> ${err}`);
                    res.status(200).json(`{ err : ${err}`);
                }
                else {
                    console.log(reporter);
                    res.status(200).json(reporter);
                }
            });
        }
    });
};

/*
 * Gets all VOD's from a specific reporter id
 *
 * @type
 *   POST
 *
 * @param
 *   id : Number {301 < id < 308}
 *
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/getVodByReporterID
 *   [id][303]
 */
exports.getVodByReporterID = (req,res)=>{
    console.log('getVodByReporterID() :: req.body.id -> '+req.body.id);
    var rep,
     _id = req.body.id?req.body.id:
         res.status(200).json({ "err" : "wrong input" });

    if(_id > 308 || _id < 301) {
        res.status(200).json({ "err" : "wrong input" });
        return;
    }
    Reporter.find({
        id : _id
            }, (err,reporter)=>{
                if(err){
                    console.log(`err -> ${err}`);
                    res.status(200).json(`{ err : ${err}`);
                } else {
                    console.log(reporter);
                    rep = reporter;
                    console.log(`rep.vod -> ${ rep[0].vod }` );
                    Vod.find({
                        id : { $in : rep[0].vod }
                    }, (err,vod)=>{
                        if(err) {
                            console.log(`err -> ${err}`);
                            res.status(200).json(`{ err : ${err}`);
                        }
                        else {
                            console.log(vod);
                            res.status(200).json(vod);
                        }
                    });
                }
            });
};

/*
 * Save new vod
 *
 * @type
 *   POST
 *
 * @param
 *   id : Number {510 < id < 600}
 *   title : String
 *   subTitle : String
 *   rate : Number
 *   url : String
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/saveNewVod
 *   [id][510]
 *   [title][Being Solomon]
 *   [subTitle][A new Israeli movie aiming to grow]
 *   [rate][9]
 *   [url][http://www.ynetnews.com/articles/0,7340,L-4964681,00.html]
 */
exports.saveNewVod = (req,res)=> {
    console.log('saveNewVod() :: ');
    console.log(`id : ${req.body.id}`);
    console.log(`title : ${req.body.title}`);
    console.log(`subTitle : ${req.body.subTitle}`);
    console.log(`rate : ${req.body.rate}`);
    var _id = req.body.id ? req.body.id : exports.finalize(0,0,res) ,
        _title = req.body.title ? req.body.title : exports.finalize(0,0,res) ,
        _subTitle = req.body.subTitle ? req.body.subTitle : exports.finalize(0,0,res) ,
        _rate = req.body.rate ? req.body.rate : exports.finalize(0,0,res),
        _url = req.body.url ? req.body.url : exports.finalize(0,0,res),
        newVod = new Vod({
            id : _id,
            title : _title,
            subTitlte : _subTitle,
            rate : _rate,
            url : _url,
            //reporter : []
        });

    console.log(`_id : ${_id}\n_title : ${_title}\n_subTitle : ${_subTitle}\n_rate : ${_rate}\n_url : ${_url}`);

    newVod.save(
        (err) => {
            if(err) {
                res.status(200).json({ "err" : "wrong input" });
                return;
            }
            else {
                // TODO : fix res.end()
                res.status(200).json({"ok":"document saved"});
                //res.end();
                //next();
                console.log(`document saved`);
            }
            // mongoose.disconnect();
        }
    );
};

/*
 * Save new reporter
 *
 * @type
 *   POST
 *
 * @param
 *   id : Number {310 < id < 400}
 *   name : String
 *   proficiency : String
 *   age : Number
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/saveNewReporter
 *   [id][310]
 *   [name][Tom Goldberg]
 *   [proficiency][Sports]
 *   [age][27]
 */
exports.saveNewReporter = (req,res,next)=> {
    console.log('saveNewReporter() :: req.body.id -> '+req.body.id);
    var _id = req.body.id ? req.body.id : exports.finalize(0,0,res) ,
        _name = req.body.name ? req.body.name : exports.finalize(0,0,res) ,
        _proficiency = req.body.proficiency ? req.body.proficiency : exports.finalize(0,0,res) ,
        _age = req.body.age ? req.body.age : exports.finalize(0,0,res),
        newReporter = new Reporter({
            id : _id,
            name : _name,
            proficiency : _proficiency,
            age : _age,
            //vod : []
    });

    console.log(`_id : ${_id}\n_name : ${_name}\n_proficiency : ${_proficiency}\n_age : ${_age}`);

    newReporter.save(
        (err) => {
            if(err) {
                res.status(200).json({ "err" : "wrong input" });
                return;
            }
            else {
                // TODO : fix res.end()
                res.status(200).json({"ok":"document saved"});
                res.end();
                console.log(`document saved`);
            }
            mongoose.disconnect();
        }
    );
};

/*
 * Gets all reporters
 *
 * @type
 *   METHOD : get
 *
 * @param
 *   [no params]
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/getAllReporters
 */
exports.getAllReporters = (req,res)=>{
    console.log('getAllReporters() ::');
    Reporter.find({
            //age:{$gt:15,$lt:40}
            //, status:{$in:["A","B"]}
        }
        , (err,reporter)=>{
            if(err){
                res.status(200).json({ "err" : "wrong input" });
                return;
            } else {
                res.status(200).json(reporter);
                console.log(reporter);
            }
        });
};

/*
 * Gets all VOD
 *
 * @type
 *   METHOD : get
 *
 * @param
 *   [no params]
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/getAllVOD
 */
exports.getAllVOD = (req,res)=>{
    console.log('getAllVOD() ::');
    Vod.find({},
        (err,vod)=>{
            if(err){
                res.status(200).json({ "err" : "wrong input" });
                return;
            } else {
                res.status(200).json(vod);
                console.log(vod);
            }
          });
};

/*
* Gets all israel articles
*
* @type
*   METHOD : get
*
* @param
*   [no params]
*
* @return
*   [no returns]
*
* @i.e
*   http://localhost:3000/getAllIsraelNews
 */
exports.getAllIsraelNews = (req,res)=>{
    console.log('getAllIsraelNews() ::');
    var jsonObj = {},
        key = 'Israel News';
    jsonObj[key] = [];
    for(let i in data.news){
        if(data.news[i].title=="Israel"){
            jsonObj[key].push({
                "id" : data.news[i].id,
                "title" : "Israel",
                "lastArticle" : data.news[i].lastArticle,
                "subTitle" : data.news[i].subTitle,
                "writer" : data.news[i].writer,
                "rate" : data.news[i].rate
            });
        }
    }
    exports.finalize(jsonObj,key,res);
};

/*
 * Gets all articles rated over than { rate }
 *
 * @type
 *   METHOD : post
 *
 * @param
 *   rate // int value
 *
 * @return
 *   [no returns]
 *
 * @i.e
 *   http://localhost:3000/getNewsByRateBiggerThan
 *   [rate][8]
 */
exports.getNewsByRateBiggerThan = (req,res)=>{
    console.log('getNewsByRateBiggerThan() :: req.body.rate - >'+req.body.rate);
    var rateToSearch = req.body.rate,
        jsonObj = {},
        key = 'News rate bigger than '+rateToSearch;
    jsonObj[key] = [];
    console.log('getNewsByRateBiggerThan() was called');
    console.log('-- param[0] : '+rateToSearch);
    for(let i in data.news){
        if(data.news[i].rate>rateToSearch){
            jsonObj[key].push({
                "id" : data.news[i].id,
                "title" : "Israel",
                "lastArticle" : data.news[i].lastArticle,
                "subTitle" : data.news[i].subTitle,
                "writer" : data.news[i].writer,
                "rate" : data.news[i].rate
            });
        }
    }
    exports.finalize(jsonObj,key,res);
};

/*
 * Gets all articles by title and rate
 *
 * @type
 *   METHOD : get
 *
 * @param
 *   title // String that specifies the article title
 *   rate  // int value specifies the rate
 * @return
 *   [no returns]
 *
 * @i.e
 *   http://localhost:3000/getNewsByTitleAndRate/Israel/10
 */
exports.getNewsByTitleAndRate = (req,res)=>{
    console.log('getNewsByTitleAndRate() :: req.params.title -> '+req.params.title+', req.params.rate -> '+req.params.rate);
    var title = req.params.title,
        rate = req.params.rate,
        jsonObj = {},
        key = 'Title '+title+' AND rate '+rate;
    jsonObj[key] = [];
    console.log('getNewsByTitleAndRate() was called');
    console.log('-- param[0] : '+title);
    console.log('-- param[1] : '+rate);
    for(let i in data.news){
        if(data.news[i].rate==rate
            && data.news[i].title==title){
            jsonObj[key].push({
                "id" : data.news[i].id,
                "title" : "Israel",
                "lastArticle" : data.news[i].lastArticle,
                "subTitle" : data.news[i].subTitle,
                "writer" : data.news[i].writer,
                "rate" : data.news[i].rate
            });
        }
    }
    exports.finalize(jsonObj,key,res);
};

/*
 * Gets all articles by title and rate
 *
 * @type
 *   METHOD : get
 *
 * @param
 *   rate  // int value specifies the rate
 * @return
 *   [no returns]
 *
 * @i.e
 *   http://localhost:3000/getAllVodXRate/8
 *
 *
 * @nosql injection example
 *   http://localhost:3000/getAllVodXRate/8;return%20true;
 */
exports.getAllVodXRate = (req,res)=>{
    console.log('getAllVodXRate() :: req.params.rate -> '+req.params.rate);
    var v = req.params.rate;
    console.log("v is : "+ v );
    Vod.$where('this.rate == ' + v).exec(function(err,result){
        if(err){
            res.status(200).json({"err":"wrong input"});
            return;
        } else {
            res.status(200).json(result);
            console.log(result);
        }
    });
};

exports.finalize = (json,key,res) => {
    console.log('finalize() was called');
    res.status(200).end(json(!json[key]?{"err":"not found"}:json));
};