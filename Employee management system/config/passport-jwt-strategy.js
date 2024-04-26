const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;

const jwtExtract = require('passport-jwt').ExtractJwt;

const admin = require('../model/admin');

var opts = {
    jwtFromRequest : jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : "rnw"
};

passport.use(new jwtStrategy(opts, async (payload, done) => {
    let data = await admin.findById(payload.admin._id);
    if(data){
        done(null,data);
    }
    else{
        done(null,false);

    }
}));

const manager = require('../model/manager');

var manopts = {
    jwtFromRequest : jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : "rnw"
};

passport.use('manLogin',new jwtStrategy(manopts, async (payload, done) => {
    let data = await manager.findById(payload.manager._id);
    if(data){
        done(null,data);
    }
    else{
        done(null,false);

    }
}));

const employee = require('../model/employee');

var manopts = {
    jwtFromRequest : jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : "rnw"
};

passport.use('emplLogin',new jwtStrategy(manopts, async (payload, done) => {
    let data = await employee.findById(payload.employee._id);
    if(data){
        done(null,data);
    }
    else{
        done(null,false);

    }
}));

passport.serializeUser((user,done) => {
    return done(null,user.id);
});

passport.deserializeUser(async  (id,done)=>{
    let admindata = await admin.findById(id);
    if(admindata){
        return done(null,admindata);
    }
    else{
        return done(null,false);
    }
})

module.exports = passport;