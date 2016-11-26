var express = require('express');
var router = express.Router();
var twilioClient = require('./twilioClient');

/*
 * GET userlist
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
	res.json(docs);
    });
});

/*
 * POST to adduser
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
	res.send(
	    (err===null)?{msg:''}:{msg:err}
	);
    });
});

/*
 * DELETE to deletuser
 */
router.delete('/deleteuser/:id', function(req, res){
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove( {'_id':userToDelete }, function(err){
	res.send( (err===null)?{msg:''}:{msg:'error: '+err} );
    });
});

/*
 * POST to textuser
 */
router.post('/textuser/:id', function(req,res){
    var db = req.db;
    var collection = db.get('userlist');
    var userToText = req.params.id;
    console.log('[*****]req.params.id('+req.params.id+')');
    twilioClient.sendSms(userToText, 'message to text to dude');
    console.log('[users/textuser]Seems to have sent SMS');
    collection.find( {'_id':userToText }, function(err,result){
        //  res.send( (err===null)?{msg:'null crap'}:{msg:'error poop'} 
        if(err===null){
            res.send( {msg:'success'} ); //temperary post, replace w/ text later
        }else{
            res.send( {msg:'error: '+err} );
            console.log('[******]server: /textuser (%j)',result);
        };
    });
});

module.exports = router;
