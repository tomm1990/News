
/*
* default settings
 */
const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser  = require('body-parser'),
    controller = require('./controller.js'),
    port = process.env.PORT || 3000,
    path = require("path"),
    mainRoute = __dirname+'/html';

/*
* app usages
 */
app.use(express.static(mainRoute));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/*
* default rout
 */
app.get('/', (req,res,next) => {
    res.sendFile(path.join((__dirname,'index.html')));
    req.next();
});

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
app.post('/getVodRatedHigherThan', controller.getVodRatedHigherThan);

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
app.post('/getReporterByVodID',controller.getReporterByVodID);

/*
 * Gets all VOD's from a spesific reporter id
 *
 * @type
 *   POST
 *
 * @param
 *   id : Number {301 < id < 310}
 *
 *
 * @return
 *   json
 *
 * @i.e
 *   http://localhost:3000/getVodByReporterID
 *   [id][303]
 */
app.post('/getVodByReporterID',controller.getVodByReporterID);

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
app.post('/saveNewVod',controller.saveNewVod);

/*
 * Save new reporter
 *
 * @type
 *   id : Number {310 < id < 400}
 *   name : String
 *   proficiency : String
 *   age : Number
 *
 * @param
 *   [no params]
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
app.post('/saveNewReporter',controller.saveNewReporter);

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
app.get('/getAllReporters',controller.getAllReporters);

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

app.get('/getAllVOD',controller.getAllVOD);
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
app.get('/getAllIsraelNews', controller.getAllIsraelNews);

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
app.post('/getNewsByRateBiggerThan',controller.getNewsByRateBiggerThan);

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
app.get('/getNewsByTitleAndRate/:title/:rate',controller.getNewsByTitleAndRate);


app.listen(port , () => {
    console.log('listening to '+port);
});