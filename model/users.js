/**
 * Created by magic_000 on 19/12/2016.
 */
var mongoose= require('mongoose');
mongoose.Promise=global.Promise;

var uri='mongodb://localhost:27017/smart_school';

//mongoose.connect(uri);



var UserSchema= mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    _type: {
        type: String
    },
    token_emis: {
        type: String
    },
    token_sis:{
        type: String
    },
    token_moodle:{
        type: String
    }
});

var user= mongoose.model("Users", UserSchema);



module.exports=user;


var findUserByUsername=function (username) {
    return new Promise(function (resolve, reject) {
        var query={
            username: username
        };
        user.find(query).then(function (res) {
            if(res.length==0){
                reject({
                    msg:"user does not exist!"
                });
            }else{
                resolve(res[0]);
            }
        }, function (err) {
            reject(err);
        });


    });
};

module.exports.findUserByUsername=findUserByUsername;