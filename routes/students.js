/**
 * Created by NarX on 11/25/16.
 */
var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');

/* GET home page. */
var token="CAKEPHP=mggvncrkbv3jhc06oha1u17th4";
var url='http://localhost/openemis-school/Students/search';

var getdataF=require('../config/test_request');
router.get('/list', function(req, res, next) {
    var result=[];
    getdataF(url, token, function (err, ress, body) {
        $ = cheerio.load(body);
        $('tbody').children().each(function (i) {
            var tmpStudent={};
            $(this).children().each(function (e) {

                if(e==0){
                    tmpStudent.ID=$(this).text();
                }else if(e==1){
                    tmpStudent.name=$(this).text();
                }else{
                    tmpStudent.status=$(this).text();
                }

            });
            result.push(tmpStudent);
        });
        res.send({students:result});
    });
});

module.exports = router;
