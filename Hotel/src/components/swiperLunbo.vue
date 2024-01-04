<template>
  <div class="lunbo">
    <div class="swtitle">
      <span></span>
      <div class="titledesc">
        <h6>A REMARKABLE NATION</h6>
        <h2>
          From the Majestic Scottish Highlands
          <br />
          to the Picturesque Cornish Coast
        </h2>
      </div>
    </div>
    <div class="swiper-contatiner" :options="swiperOptions">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in imgs" :key="index">
          <img :src="item.src" alt="" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const imgs = [
  {
    src: '/src/assets/picture/carousel-location01.jpg'
  },
  {
    src: '/src/assets/picture/carousel-location02.jpg'
  },
  {
    src: '/src/assets/picture/carousel-location03.jpg'
  },
  {
    src: '/src/assets/picture/carousel-location04.jpg'
  }
]
</script>
<style>
/* @import '../../node_modules/swiper/swiper-bundle.min.css'; */

.lunbo {
  margin: 40px 0;
  width: 100%;
  height: auto;
}
.lunbo .swtitle {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.swtitle span {
  position: absolute;
  display: block;
  width: 100px;
  height: 2px;
  background-color: rgb(150, 150, 150);
  left: 50px;
  top: 10px;
  /* border-top:3px solid rgb(162, 162, 162); */
}
.swtitle h2 {
  font-weight: bolder;
  font-size: 60px;
}
.swtitle h6 {
  font-size: 20px;
  font-family: 'Jost', sans-serif;
  color: rgb(169, 169, 169);
}
.swiper-contatiner {
  width: 100%;
}
.swiper-contatiner .swiper-wrapper {
  display: flex;
  justify-content: space-evenly;
}
</style>
