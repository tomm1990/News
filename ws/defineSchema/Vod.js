var mongoose = require('mongoose');

var schema = mongoose.Schema,
    vodSchema = new schema({
        id: {type: String, index:1, required:true, unique:true},
        title : String,
        subTitlte : String,
        rate : Number,
        url : String,
        reporter : Array
    }, {collection: 'vod'}),
    Vod = mongoose.model('Vod', vodSchema);

module.exports = Vod;