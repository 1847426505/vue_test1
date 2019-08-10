<template>
    <header class="header-nav">
        <el-row :gutter="20" >
            <el-col :span="12" class="container" style="text-align: left; font-size: 12px">
                <img class="logo" src="../assets/logo.png" alt="">
                <span class="title">在线后台管理</span>
            </el-col>
            <el-col :span="12"  style="text-align: right; font-size: 12px">
                <div class="userinfo">
                    <img :src="user.avatar" alt="avatar">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <div class="dropdown">
                        <el-dropdown @command="setDialogInfo" trigger="click">
                            <span class="el-dropdown-link">
                              <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                </div>
            </el-col>

        </el-row>
    </header>
    
    <!-- <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2"> 我的工作台 </el-menu-item>
        <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu> -->

</template>

<script>
  export default {
    name:'head-nav',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
       handleCommand(command) {
        this.$message('click on item ' + command);
      },
      setDialogInfo(command){
        switch(command){
            case 'info':
                this.showInfoList()
            break;
            case 'logout':
                this.logout()
            break;
        }
      },
      showInfoList(){
          console.log('显示信息')
          this.$router.push('/infoshow');
      },
      logout(){//退出
          //清除token
          localStorage.removeItem('eleToken')
          //设置vuex store
          this.$store.dispatch('clearCurrentState')
          //跳转
          this.$router.push('/login');

      }
    }
  }
</script>
<style scoped>

.header-nav{
    height: 60px;
    width: 100%;
    min-width: 600px;
    background: #324057;
    /* box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6); */
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
}
.container{
    display: flex;
    height: 60px;
    justify-content: start;
    align-items: center;
    align-self: center;
    align-content: center;
}
.header-nav .logo{
    height: 40px;
    line-height: 60px;
    display: inline-block;
}
.header-nav .title{
    padding-left:20px; 
    display: inline-block;
    font-size: 20px;
    color: rgba(255,255,255,0.9);
}
.userinfo{
    padding-right:15px; 
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self: center;
    align-content: center;
}
.userinfo img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
.userinfo .welcome{

}
.userinfo .welcome p{
    text-align: center;
    color: rgba(255,255,255,0.8);
    font-size: 12px;
    line-height: 16px;
    text-indent: 5px;
}
.userinfo .welcome .avatarname{
    color: #409EFF ;
 
}
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
.el-popper[x-placement^=bottom]{
    margin-top:35px; 
}
</style>
