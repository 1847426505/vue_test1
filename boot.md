# 后台管理实现流程

## 项目结构

    -config  
        -keys.js
        -passport.js
    -models
        User.js
    -routes
        -api
            -users.js
    -package.json
    -server.js    

server.js 项目入口文件


1. 依赖 express 的router 来实现接口
2. 连接 mongodb 数据库  配置数据文档
3. 注册接口
    1. findOne 查询一条 email邮箱
    2. 判断邮箱是否被注册
    3. 创建一个user对象
    ```js
         {
             name,  //用户名
             email,  //注册邮箱
             avatar,  //头像
             password,  //密码
             identity  //权限登录  -管理员  -用户 
        }
    ```
    4. 对密码进行加密处理，保存数据库
4. 登录接口
    1. findOne 查询一条 email邮箱
    2. 判断用户(账号)是否存在
    3. 密码匹配 判断密码是否正确
    4. 返回一个 token  
        -jwt:处理token

5.  当前用户 /current
    1. passport : 根据登录返回的token 来获取返回具体的数据信息
    2. 验证token   passport初始化




# 模块

body-parser : post获取数据
   - 在http请求种，POST、PUT、PATCH三种请求方法中包含着请求体，也就是所谓的request，在Nodejs原生的http模块中，请求体是要基于流的方式来接受和解析。