const express = require('express')
const router = express.Router()
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport')

const User = require('../../models/User')
const secretOrKey = require('../../config/keys').secretOrKey;




/**
 *  $route   GET api/users/test
 *  @desc   返回的请求是 json 数据
 *  @access public
 */
router.get('/test',(req,res)=>{
    User.find({},(err,data)=>{
        res.send(data)
    })
})

/**
 *  $route   POST api/users/register
 *  @desc   返回的请求是 json 数据
 *  @access public
 *  post请求 需要安装 body-parser
 */
//注册

router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json("邮箱已被占用")
            }else{
                const avatarUrl = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'}); //头像路径
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatarUrl,
                    password:req.body.password,
                    identity:req.body.identity,
                })
                //加密
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=> {
                        // Store hash in your password DB.
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user=>{
                                res.json(user)
                            })
                            .catch(err=>{
                                console.log(`错误${err}`)
                            })
                    });
                });
            }
        })
        .catch(err=>{
            res.status(400).json("未找到数据")
        })
})

/**
 *  $route   POST api/users/login
 *  @desc   返回的请求是 json 数据
 *  @access public
 *  post请求 需要安装 body-parser
 */
//登录

router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(404).json("用户不存在,请注册")
            }
            //密码匹配
            bcrypt.compare(password, user.password )
                .then(flag=>{
                    if(flag){
                        const rule = {
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        }
                        // jwt.sign("规则","加密名字","过期时间","箭头函数")
                        jwt.sign(rule,secretOrKey,{expiresIn:3600},(err,token)=>{
                            res.json({
                                success:true,
                                token:'Bearer '+ token
                            })
                        })




                        //res.json({msg:'success',name:user.name})
                    }else{
                        return res.status(400).json("密码错误")
                    }
                })
        })
})
/**
 *  $route   GET api/users/current
 *  @desc   返回 当前 用户
 *  @access Private
 */
//

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{ //passport验证token
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    })
})






module.exports = router;