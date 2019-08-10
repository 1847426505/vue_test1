<template>
    <div class="left-nav">
        <el-menu
            width="190px"
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#409EFF">
            <router-link to="/home">
                <el-menu-item index="0">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <template v-for="item in items">
                <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                    <template slot="title">
                        <i :class="'fa fa-margin'+item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                        <el-menu-item :index="citem.path">
                            <span slot="title">{{citem.name}}</span>
                        </el-menu-item>
                    </router-link>
                </el-submenu>
            </template> 
        </el-menu>
    </div>
</template>
<script>
  export default {
    name:'left-nav',
    data(){
        return {
            items:[
                {icon:'fa-money',name:'资金管理',path:'fund',children:[{path:'fundlist',name:'资金流水'}]},
                {icon:'fa-asterisk',name:'信息管理',path:'info',children:[{path:'infoshow',name:'个人信息'}]},
                {icon:'fa-asterisk',name:'信息管理',path:'info'}
            ]
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
.el-menu{
    border: none;
}
.left-nav{
    width: 190px;
    min-width: 190px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 190px;
  min-height: calc(100vh - 60px);
  overflow: hidden;
}
.el-submenu .el-menu-item{
    min-width: 100%;
}
</style>
