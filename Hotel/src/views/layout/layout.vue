<template>
  <div class="layout">
    <headercon>
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
          <el-menu-item 
       @click="$router.push('/evaluate')"
       
       >评价</el-menu-item>
          <el-menu-item index="4">服务</el-menu-item>
          <el-menu-item index="3" disabled>敬请期待</el-menu-item>
          <el-menu-item @click="$router.push('/login')">登录</el-menu-item>

        </div>
      </el-menu>
    </headercon>
    <maincon>
      <bannerImg></bannerImg>
      <div class="bookSlecet">
        <h2>BOOK ROOM</h2>
        <div id="Slecet_grid">
          <div class="form-group">
            <label>房型选择</label>
            <select v-model="RoomType">
              <option :RoomType="loft复式房">loft复式房</option>
              <option :RoomType="大床房">大床房</option>
              <option :RoomType="双人房">双人房</option>
              <option :RoomType="豪华房">豪华房</option>
              <option :RoomType="江景房">江景房</option>
              <option :RoomType="总统套房">总统套房</option>
            </select>
          </div>
          <MySele2 :labelText="customLabelText"></MySele2>
          <MySele2 :labelText="customLabelText_2"></MySele2>
          <personSele :per_text="personText"></personSele>
          <Bookbutton></Bookbutton>
        </div>
      </div>
      <section
        class="content-section"
        data-background="#f5f3ec"
        style="background: rgb(245, 243, 236)"
      >
        <div class="container">
          <div class="row no-gutters align-items-center">
            <div class="col-lg-6">
              <div class="side-content text-center">
                <h6>DISCOVER EXQUISITE HOTELS</h6>
                <h2 class="line">Explore Britain's Top Luxury and Boutique Hotels.</h2>
                <button href="special-offers.html" class="custom-button">EXPLORE MORE</button>
              </div>
              <!-- end side-content -->
            </div>
            <!-- end col-6 -->
            <div class="col-lg-6">
              <figure class="side-image right-full overlap-bottom reveal-effect animated">
                <img src="/src/assets/picture/side-image01.jpg" alt="Image" />
                <a
                  href="/src/assets/01.mp4"
                  class="video-button"
                  data-fancybox=""
                  data-width="640"
                  data-height="360"
                >
                  <i class="lni lni-play my-con"></i>
                </a>
              </figure>
            </div>
            <!-- end col-6 -->
          </div>
          <!-- end row -->
        </div>
        <!-- end container -->
      </section>
      <swiperlunbo></swiperlunbo>
      <section3></section3>
      <section4></section4>
      <!-- <swiperbanner></swiperbanner> -->
    </maincon>
    <footercon>
      <p>Celestial ©电子牛牛团队</p>
      <p>Copyright © Celestial</p>
    </footercon>
  </div>
  <el-backtop :right="100" :bottom="100" />
  
</template>
<script setup>
import { ref } from 'vue'
import { datag } from '@/request/api.ts'

import axios from 'axios'
// import 'swiper/css'
import MySele2 from '@/components/myselect2.vue'
import personSele from '@/components/personSele.vue'
import bannerImg from '@/components/bannerimg.vue'
import Bookbutton from '@/components/Bookbutton.vue'
import swiperlunbo from '@/components/swiperlunbo.vue'
import section3 from '@/components/section3.vue'
import section4 from '@/components/section4.vue'

console.log(datag.userid.value)

const RoomType = ref()
const customLabelText = '入住时间'
const customLabelText_2 = '离开时间'
const personText = '联系方式'
const apiUrl = 'http://hotel.e3.luyouxia.net:11732/room/markup'

// const BookRoom = () => {
//   const requestData = {
//     roomid: "2",
//     room:RoomType.value,
//     msize: "正常",
//     roomstat: "有",
//     airconditioning: "有",
//     wifi: "无"
//   }
//   console.log(requestData);
//   axios.post(apiUrl,requestData)
//   .then(response => {
//     console.log("成功",response.data);
//   })
//   .catch(error =>{
//     console.log('error',error);
//   })
// }
</script>

<style>
/* @import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'; */
* {
  margin: 0;
  padding: 0;
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

headercon {
  padding: 0 0;
  background-color: aqua;
  grid-area: header;
  /* position: sticky;
  top: 0;
  z-index: 9999; */
}
maincon {
  background-color: #fafafa;
  grid-area: content;
}
footercon {
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
.el-menu-demo {
  width: 100%;
  background-color: rgb(130, 110, 73);
}
.el-menu-demo p {
  font-size: small;
  color: aliceblue;
  padding: 21px;
  display: flex;
  justify-content: right;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.menu-items-right {
  display: flex;
  justify-content: flex-end;
  flex: 0.9;
  font-family: 'Jost', sans-serif;
}
.bookSlecet h2 {
}
.bookSlecet {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#Slecet_grid {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  gap: 50px;
}
#Slecet_grid .form-group label {
  width: 100%;
}

#Slecet_grid .form-group {
  font-family: serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: inline-block;
  margin: 0 45px;
  position: relative;
}

#Slecet_grid .form-group select {
  width: 300px;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 30px) 34px,
    calc(100% - 25px) 34px,
    calc(100% - 3.5em) 20px;
  background-size:
    5px 5px,
    5px 5px,
    1px 40px;
  background-repeat: no-repeat;
  width: 300px;
  max-width: 100%;
  height: 80px;
  padding: 0 30px;
  border: 1px solid #cecece;
  word-wrap: normal;
}
.content-section .container {
  max-width: 535px;
}

/* .content-section.bottom-spacing {
  margin-bottom: 100px !important;
  margin-top: 100px !important;
} */

.content-section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 100px 0;
  position: relative;
  margin-top: 100px;
  margin-bottom: 80px;
}

.row {
  width: 855px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.col-lg-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  right: -22rem;
}

.side-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.side-content h6 {
  width: 100%;
  display: block;
  font-size: 15px;
  font-weight: 800;
  opacity: 0.3;
  letter-spacing: 2px;
  font-family: 'Jost', sans-serif;
}
.side-content.text-center {
  width: 700px;

  text-align: center;
  /* padding: 0 10%; */
  position: absolute;
  right: 0px;
  bottom: 360px;
  top: 140px;
  padding: 0 10%;
}
.side-content h2 {
  width: 100%;
  display: block;
  margin: 0;
  font-family: serif;
  font-size: 50px;
}

.side-content .custom-button {
  margin-top: 40px;
  height: 80px;
  line-height: 80px;
  display: inline-block;
  background: #856d47;
  padding: 0 50px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  position: relative;
  font-family: 'Jost', sans-serif;
  text-decoration: none;
  margin-left: auto;
  margin-right: auto;
  text-decoration: none;
}

.side-image .video-button {
  width: 140px;
  height: 140px;
  line-height: 140px;
  background: #fff;
  position: absolute;
  left: calc(50% - -125px);
  top: calc(50% - 70px);
  color: #856d47;
  font-size: 30px;
  text-align: center;
  border-radius: 50%;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.lni {
  display: inline-block;
  font: normal normal normal 1em/1 'LineIcons';
  speak: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.lni-play::before {
  content: '\eb51';
}
</style>
