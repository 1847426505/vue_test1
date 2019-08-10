//数据库设置
const mongoose = require("mongoose")

const Schema = mongoose.Schema

//create Schema
const ProfileSchema = new Schema({
    type:{ //类型
        type:String
    },
    describe:{ //描述
        type:String
    },
    income:{ //收入
        type:String,
        required:true
    },
    expend:{ //支出
        type:String,
        required:true
    },
    cash:{ //现金
        type:String,
        required:true
    },
    remark:{ //备注
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = profile = mongoose.model('profile',ProfileSchema) //users 数据库 文档名


