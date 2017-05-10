'use strict';

const data = require('./data/news.json');

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
    console.log('getAllIsraelNews() was called');
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

exports.finalize = (json,key,res) => {
    console.log('finalize() was called');
    res.status(200).json(!json[key].length?{"err":"not found"}:json);
};