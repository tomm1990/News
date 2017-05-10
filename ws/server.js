
/*
 default settings
 */
const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser  = require('body-parser'),
    controller = require('./controller.js'),
    port = process.env.PORT || 3000,
    path = require("path"),
    mainRoute = __dirname+'/html';


app.use(express.static(mainRoute))
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
    console.log('listetning to '+port);
});