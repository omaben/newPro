<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw !important;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
p.info-input {
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    font-size: 13px;
    color: #999;
    i {
      color: #e64340;
  }
}
.van-nav-bar.header{
  height: 35px;
}
.home,.settings,.make-order, .login {
  padding-bottom: 50px;
    /* padding-top: 35px;
    min-height: 100vh;
    padding-bottom: 50px;
     overflow: hidden; */
     .van-nav-bar__title{
       line-height: 35px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: #fff;
     }
     .van-nav-bar__content{
       height: 35px;
     }
}

</style>
