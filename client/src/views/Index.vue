<template>
    <div class="index">
        <headerNav></headerNav>
        <leftNav></leftNav>
        <div class="rightContainer">
            <router-view ></router-view>
        </div>
        
        
    </div>
</template>
<script>
import headerNav from '../components/headerNav'
import leftNav from '../components/leftNav'
export default {
    name:'index',
    components:{
        headerNav,
        leftNav
    }
};
</script>
<style>
.index{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.rightContainer{
    position: absolute;
    top:60px;
    left: 190px;
    width: calc(100% - 190px);
    height: calc(100% - 60px);
    overflow: auto;
    
}
</style>

