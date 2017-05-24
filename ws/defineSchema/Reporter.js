var mongoose = require('mongoose'),
    Vod = require('./Vod');

var schema = mongoose.Schema,
    reporterSchema = new schema({
    id: {type: String, index:1, required:true, unique:true},
    name: String,
    proficiency: String,
    age: Number,
        vod: [String]
}, {collection: 'reporter'}),
    Reporter = mongoose.model('Reporter', reporterSchema);

reporterSchema.pre('save',next=>{
    console.log(`pre for id : ${this.id}`)
    if(this.id>500){
        console.log(`pre id is ok -> ${this.id}`);
        return next();
    } else {
        console.log(`pre id fail!`);
    }
});

reporterSchema.path('id').validate(
    (val)=>{
        console.log(`path for id : ${val}`);
        if(val>500){
            console.log(`path for id is ok -> ${val}`);
            return true;
        }
    }, `path for id is fail`);


module.exports = Reporter;