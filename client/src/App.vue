<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'app',
    components:{},
   created(){
     if(localStorage.eleToken){
        const decode = jwt_decode(localStorage.eleToken);
          //token储存在vuex中
            this.$store.dispatch('setAuthentivated',!this.isEmpty(decode))
            this.$store.dispatch('setUser',decode)

     }
   },
    methods:{
        // submitForm(formName){
        //     this.$refs[formName].validate((valid) => {
        //         if(valid){
        //             this.$axios.post('/api/users/login',this.loginUser)
        //                 .then(res=>{
        //                     //登录成功
        //                     const {token} = res.data;
        //                     //储存到ls
        //                     localStorage.setItem('eleToken',token)
        //                     //解析token
        //                     const decode = jwt_decode(token);
        //                     //token储存在vuex中
        //                     this.$store.dispatch('setAuthentivated',!this.isEmpty(decode))
        //                     this.$store.dispatch('setUser',decode)

        //                     this.$router.push('/index')
        //                 })
        //         }
        //     })
          
        // },
        isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && Object.keys(value).length === 0) ||
                (typeof value === 'string' && value.trim().length === 0)
            )
        }
    }

}
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

</style>
