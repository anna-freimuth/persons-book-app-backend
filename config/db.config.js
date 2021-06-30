module.exports={
    HOST:'localhost',
    PORT:'3309',
    USER:'root',
    PASSWORD:'root',
    DB:'profile_app',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    }

}
