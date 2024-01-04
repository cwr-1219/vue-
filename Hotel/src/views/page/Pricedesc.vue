<template>
 <header>
   <el-menu
     class="el-menu-demo"
     mode="horizontal"
     background-color="rgb(130,110,73)"
     text-color="#fff"
     active-text-color="rgb(245,243,236)"
   >
     <img src="../../assets/img/logo.png" alt="" />
     <p>预定 +86 (0)2 5467 8965</p>
     <div class="menu-items-right">
       <el-menu-item index="1">探索 Celestial</el-menu-item>
       <el-sub-menu index="2">
         <template #title>预定</template>
         <el-menu-item index="2-1">电话预定</el-menu-item>
         <el-menu-item index="2-2" @click="$router.push('/RoomDesc')">房间预览</el-menu-item>
       </el-sub-menu>
       <el-menu-item index="2">会议与活动</el-menu-item>
       <el-menu-item index="4">特别优惠</el-menu-item>
       <el-menu-item index="3" disabled>敬请期待</el-menu-item>
     </div>
   </el-menu>
 </header>
 <main>
   <div class="nav">
     <div class="navdesc">
       <h1>Rooms</h1>
       <p>We adore hotels.</p>
     </div>
   </div>
<p>Room:{{ room }}</p>
<p>Price:{{ price }}</p>
 </main>
 <footer>
   <p>Celestial ©电子牛牛团队</p>
   <p>Copyright © Celestial</p>
 </footer>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 然后在需要使用路由的地方使用 router 变量，而不是 $router
const room = router.currentRoute.value.query.room;
const price = router.currentRoute.value.query.price;

</script>
<style>
body{
 background-color: #fff;
}
.layout {
 height: 100vh;
 width: 100%;
 display: grid;
 grid-template-areas:
   'header header header'
   'content content content'
   'footer footer footer';
 align-items: center;
 /* overflow: hidden; */
 overflow-y: scroll;
 /* padding-left: 20px; */
}
::-webkit-scrollbar {
 width: 10px;
 background-color: gray;
}
::-webkit-scrollbar-track {
 background-color: rgb(228, 228, 228);
 border-radius: 10px;
}
::-webkit-scrollbar-thumb {
 background-color: rgb(114, 114, 114);
 border-radius: 10px;
}
header {
 padding: 0 0;
 background-color: aqua;
 grid-area: header;
 /* position: sticky;
 top: 0;
 z-index: 9999; */
}
main {
 background-color: #fafafa;
 grid-area: content;
}
footer {
 grid-area: footer;
 font-family:
   system-ui,
   -apple-system,
   BlinkMacSystemFont,
   'Segoe UI',
   Roboto,
   Oxygen,
   Ubuntu,
   Cantarell,
   'Open Sans',
   'Helvetica Neue',
   sans-serif;
 display: flex;
 justify-content: space-between;
 font-size: xx-small;
 border-top: 1px solid rgb(211, 211, 211);
 height: 35px;
}
body,
html {
 padding: 0;
 margin: 0;

 font-family: serif;
}
.el-menu-demo {
 width: 100%;
 background-color: rgb(130, 110, 73);
}
.el-menu-demo p {
 font-size: small;
 color: aliceblue;
 padding: 10px;
 display: flex;
 justify-content: right;
 font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.menu-items-right {
 display: flex;
 justify-content: flex-end;
 flex: 0.9;
 font-family: serif;
}
.nav {
 position: relative;
 background-position-y: bottom;
 background-size: cover;
 background-image: url(../../assets/image/page1.jpg);
 height: 70vh;
}
.nav h1 {
 color: #fafafa;
 margin: 0;
 display: block;
 font-size: 100px;
 font-family: serif;
}
.nav p {
 color: rgb(237, 237, 237);
 font-family: 'Jost', sans-serif;
 font-size: 20px;
 letter-spacing: 0.4rem;
}
.navdesc {
 position: absolute;
 left: 200px;
 top: 140px;
}



</style>
