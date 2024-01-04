<template>
  <div class="section">
    <div class="title">
      <h6>UPSCALE DELUXE ACCOMMODATIONS</h6>
      <span></span>
      <h2>Celestial Hotels in Australia</h2>
    </div>
    <div class="desc">
      <div class="descimg">
        <img src="/src/assets/picture/side-image02.jpg" alt="" />
      </div>
      <div class="desccon">
        <div class="review"></div>
        <h2>
          Homewood Suites by
          <br />
          Celestial Australia
        </h2>
        <p>#1 Best Value in Canberra City that matches your filters</p>
        <div class="info-box">
          <span
            >6 offers available, <br />
            1 to 7 nights</span
          >
          <b><i>per night</i>$134</b>
        </div>
        <button class="custom-button">VIEW & BOOK</button>
        <div class="availability"></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style>
.section {
  margin-top: 10vh;
  height: auto;
}
.section .title h2 {
  font-weight: bolder;
  font-size: 60px;
  margin-top: 30px;
}
.section .title span {
  margin-top: 15px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 100px;
  height: 2px;
  background-color: rgb(150, 150, 150);
}
.section .title h6 {
  font-size: 20px;
  font-family: 'Jost', sans-serif;
  color: rgb(169, 169, 169);
}
.section .title {
  position: relative;
  text-align: center;
}
.desc {
  margin-top: 100px;
  position: relative;
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: space-between;
}
.desc .descimg {
  height: auto;
  width: 600px;
  background-color: #f5f3ec;
}
.descimg img {
  position: absolute;
  width: 550px;
  left: 300px;
  bottom: 105px;
}
.desc .desccon {
  position: absolute;
  right: 200px;
}
.desccon p {
  font-family: 'Jost', sans-serif;
}
.desccon h2 {
  font-size: 50px;
}
.desc .info-box {
  width: 100%;
  display: flex;
  border: 1px solid #cbcbcb;
  padding: 20px;
  margin-bottom: 20px;
}
.desc .info-box span {
  display: inline-block;
  border-left: 6px solid #856d47;
  padding-left: 20px;
  font-family: 'Jost', sans-serif;
}
.desc .info-box b {
  height: 54px;
  line-height: 1.3;
  margin-left: auto;
  font-size: 40px;
  font-family: 'Jost', sans-serif;
}
.info-box i {
  font-size: 20px;
}
.custom-button {
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
</style>
