var express = require('express');
var router = express.Router();

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
    console.log('[******]server: /textuser');
    collection.find( {'_id':userToText }, function(err,result){
        res.send( (err===null)?{msg:'null'}:{msg:'error: '} 
 //           if(err===null){
 //               res.json(result); //temperary post, replace w/ text later
 //           }else{
 //               res.send( {msg:'error: '+err} );
 //           };
        );
    });
});

module.exports = router;
