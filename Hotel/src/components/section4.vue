<template>
  <div class="section4">
    <div class="desctext">
      <div class="side-content4 light text-left">
        <h6>CULINARY DELIGHTS</h6>
        <h2>Why miss out on dining in?</h2>
        <p>
          Distinguished from typical hotels, we take immense pride in hosting renowned in-house
          restaurants. Our food philosophy is elegantly uncomplicated: we use seasonal ingredients
          to showcase the most exquisite flavors of the region.
        </p>
        <button class="custom-button">SEE OUR RESTURANTS &amp; BARS</button>
      </div>
    </div>
    <div class="descimg4">
      <img src="/src/assets/picture/side-image03.jpg" alt="" />
    </div>
  </div>
</template>
<script setup></script>
<style>
.section4 {
  height: auto;
  display: flex;
}
.section4 .desctext {
  position: relative;
  width: 57%;
  height: 70vh;
  background-color: rgb(130, 110, 73);
}
.side-content4.light {
  color: #fff;
}
.side-content4.text-left {
  padding-right: 30%;
}
.side-content4 {
  position: absolute;
  left: 20%;
  top: 15%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.side-content4 h6 {
  font-size: 20px;
  font-family: 'Jost', sans-serif;
  opacity: 0.7;
}
.side-content4 h2 {
  font-weight: bolder;
  font-size: 60px;
  margin-top: 30px;
}

.side-content4 p {
  font-family: 'Jost', sans-serif;
  opacity: 0.7;
}
.section4 .descimg4 {
  position: relative;
  height: auto;
  width: 43%;
  background-color: #f5f3ec;
}
.descimg4 img {
  position: absolute;
  width: 550px;
  right: 297px;
  bottom: 148px;
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
  border: 1px solid #fff;
}
</style>
