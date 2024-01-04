<template>
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
        <el-menu-item @click="$router.push('/evaluate')">评价</el-menu-item>
        <el-menu-item>服务</el-menu-item>
        <el-menu-item disabled>敬请期待</el-menu-item>
        <el-menu-item @click="$router.push('/login')">登录</el-menu-item>
      </div>
    </el-menu>
  </headercon>
  <maincon>
    <div class="nav">
      <div class="navdesc">
        <h1>Rooms</h1>
        <p>We adore hotels.</p>
      </div>
    </div>
    <div class="bookSlecet">
      <h2>预定房间</h2>
      <div id="Slecet_grid">
        <div class="form-group">
          <label>房型选择</label>
          <select v-model="selectedRoomType">
            <option
              v-for="roomType in roomTypes"
              :value="roomType"
              :disabled="roomType.status === '无'"
            >
              {{ roomType }}
            </option>
          </select>
        </div>
        <!-- 入住时间框 -->
        <MySele2
          :labelText="customLabelText"
          v-model="inputchckindate"
          @input-changedate="handleInputIndate"
        ></MySele2>
        <!-- 退房时间框 -->
        <MySele2
          :labelText="customLabelText_2"
          v-model="inputchckoutdate"
          @input-changedate="handleInputOutdate"
        ></MySele2>
        <personSele
          :per_text="personText"
          v-model="inputphone"
          @input-change="handleInputChange"
        ></personSele>
        <Bookbutton 
        @click="BookRoom"
        ></Bookbutton>
      </div>
    </div>
    <div class="serveSleect">
      <h2>额外服务</h2>
      <div class="Select_grid">
        <div class="form-group">
          <label>服务选择</label>
          <select v-model="selectedServeType" @change="updatePrice">
            <option v-for="serveType in serveTypes" :value="serveType">{{ serveType }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>预算价格</label>
          <span class="price">{{ budgetPrice }} ¥</span>
        </div>
        <div 
        class="serveButton"
        @click="Bookserve">
          <button 
          class="servebutton" 
          @mouseover="handleMouseOver"  
          
          ref="BigBox"
          >确认服务</button>
          <div 
          class="shadow" 
          @mouseout="handleMouseOut"
          ref="shadow"
          ></div>
        </div>
      </div>
    </div>
    <div class="Roomtitle">
      <span>房间列表</span>
    </div>

    <div class="section5">
      <div class="container2">
        <ul class="room">
          <li v-for="(item, index) in imgs" :key="index" class="item" :value="`${item.name}`">
            <img :src="`${item.src}`" alt="" />
            <div class="roomdesc">
              <div class="priceline">
                <span>STAY</span>
                ¥{{ item.price }}
              </div>
              <div class="roomstate">
                <h2>{{ item.room }}</h2>
                <h3>{{ item.status }}房</h3>
              </div>
              <p>
                房间浴室：24小时热水、吹风机、拖鞋、浴室化妆放大镜
便利设施：多种规格电源插座、220V电压插座、遮光窗帘、自动窗帘、书桌、毯子或被子、针线包、欢迎礼品、衣柜/衣橱、智能门锁、空调
媒体科技：有线频道、电视机、智能客控
食品饮料及设施：电热水壶、小冰箱
室外景观：城景
              </p>
              <i></i>
              <div class="descicon">
                <div class="iconleft">
                  <img :src="`${item.icon}`" alt="" />
                  <img :src="`${item.icon1}`" alt="" />
                  <img :src="`${item.icon2}`" alt="" />
                  <img :src="`${item.icon3}`" alt="" />
                  <img :src="`${item.icon4}`" alt="" />
                  <img :src="`${item.icon5}`" alt="" />
                  <img :src="`${item.icon6}`" alt="" />
                </div>
                <div class="iconright">
                  {{ item.look }} 人看过
                  <span>{{ item.score }} 分</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </maincon>
  <footercon>
    <p>Celestial ©电子牛牛团队</p>
    <p>Copyright © Celestial</p>
  </footercon>
</template>
<script setup>
import axios from 'axios'
import { ref, reactive, watch, onMounted, computed, watchEffect } from 'vue'
import router from '@/router'
import { datag } from '@/request/api.ts'
import { ElMessage } from 'element-plus'

import MySele2 from '@/components/myselect2.vue'
import personSele from '@/components/personSele.vue'
import Bookbutton from '@/components/Bookbutton.vue'
console.log(datag.userid.value)
console.log(datag.userpassword.value)
const customLabelText = '入住时间'
const customLabelText_2 = '离开时间'
const personText = '联系方式'
const selectedRoomType = ref('')
const selectedServeType = ref('')
const inputphone = ref('')
const inputchckindate = ref('')
const inputchckoutdate = ref('')

const double = ref([])
const Standard = ref([])
const loft = ref([])
const rich = ref([])
const river = ref([])
const president = ref([])
// 状态
const doubleStatus = ref('')
const StandardStatus = ref('')
const loftStatus = ref('')
const richStatus = ref('')
const riverStatus = ref('')
const presidentStatus = ref('')
// 价格
const roomPrice = ref('')
const doublePrice = ref('')
const StandardPrice = ref('')
const loftPrice = ref('')
const richPrice = ref('')
const riverPrice = ref('')
const presidentPrice = ref('')

const getservedata = ref('')
const newServeId = ref('')
//  按钮动画
const BigBox = ref(null)
const shadow = ref(null)
const handleMouseOver = () =>{
  shadow.value.style.transform = 'translate(0%, -100%)';
  
};
const handleMouseOut =()=>{
  shadow.value.style.transform = 'translate(-100%, -100%)';
 
 
  setTimeout(() => {
    shadow.value.style.transform = 'none';
    shadow.value.style.transform = 'translate(-100%, -100%)';
    
  }, 200);
  
}
const roomTypes = ['loft复式房', '大床房', '双人房', '豪华房', '江景房', '总统套房']
const serveTypes = ['接机', '送机', '餐食', '健身', '洗衣', '会议', '预订陆游景点']
const budgetPrices = {
  接机: 150,
  送机: 200,
  餐食: 100,
  健身: 80,
  洗衣: 50,
  会议: 300,
  预订陆游景点: 120
}
const budgetPrice = computed(() => {
  return budgetPrices[selectedServeType.value] || 0
})
function updatePrice() {
  // 根据服务类型更新预算价格
  if (selectedServeType.value === '接机') {
    budgetPrice.value = 150
  } else if (selectedServeType.value === '送机') {
    budgetPrice.value = 200
  } else if (selectedServeType.value === '餐食') {
    budgetPrice.value = 100
  } else if (selectedServeType.value === '健身') {
    budgetPrice.value = 80
  } else if (selectedServeType.value === '洗衣') {
    budgetPrice.value = 50
  } else if (selectedServeType.value === '会议') {
    budgetPrice.value = 300
  } else if (selectedServeType.value === '预订陆游景点') {
    budgetPrice.value = 120
  } else {
    budgetPrice.value = 0 // 如果选择了无效的服务类型，则预算价格为0
  }
}
const imgs = ref([
  {
    src: 'src/assets/picture/room-thumb01.jpg',
    room: '大床房',
    name: '1',
    price: doublePrice,
    icon: 'src/assets/picture/icon01.png',
    icon1: 'src/assets/picture/icon02.png',
    icon2: 'src/assets/picture/icon05.png',
    icon3: 'src/assets/picture/icon04.png',
    look: '5344',
    score: '9.0',
    status: doubleStatus
  },
  {
    src: 'src/assets/picture/room-thumb02.jpg',
    room: '双人房',
    name: '2',
    price: StandardPrice,
    icon: 'src/assets/picture/icon01.png',
    icon1: 'src/assets/picture/icon02.png',
    icon2: 'src/assets/picture/icon05.png',
    icon3: 'src/assets/picture/icon08.png',
    look: '2345',
    score: '9.5',
    status: StandardStatus
  },
  {
    src: 'src/assets/picture/room-thumb03.jpg',
    room: 'loft复式房',
    name: '3',
    price: loftPrice,
    icon: 'src/assets/picture/icon01.png',
    icon1: 'src/assets/picture/icon02.png',
    icon2: 'src/assets/picture/icon05.png',
    icon3: 'src/assets/picture/icon04.png',
    icon6: 'src/assets/picture/icon07.png',
    look: '1553',
    score: '9.3',
    status: loftStatus
  },
  {
    src: 'src/assets/picture/room-thumb04.jpg',
    room: '豪华房',
    name: '4',
    price: richPrice,
    icon: 'src/assets/picture/icon01.png',
    icon1: 'src/assets/picture/icon02.png',
    icon2: 'src/assets/picture/icon03.png',
    icon3: 'src/assets/picture/icon04.png',
    icon6: 'src/assets/picture/icon07.png',
    look: '1233',
    score: '9.0',
    status: richStatus
  },
  {
    src: 'src/assets/picture/room-thumb05.jpg',
    room: '江景房',
    name: '5',
    price: riverPrice,
    icon: 'src/assets/picture/icon01.png',
    icon1: 'src/assets/picture/icon03.png',
    icon2: 'src/assets/picture/icon04.png',
    icon3: 'src/assets/picture/icon05.png',
    look: '1553',
    score: '9.1',
    status: riverStatus
  },
  {
    src: 'src/assets/picture/room-thumb06.jpg',
    room: '总统套房',
    name: '6',
    price: presidentPrice,
    icon: 'src/assets/picture/icon01.png',
    icon1: 'src/assets/picture/icon02.png',
    icon3: 'src/assets/picture/icon04.png',
    icon4: 'src/assets/picture/icon05.png',
    icon5: 'src/assets/picture/icon06.png',
    icon6: 'src/assets/picture/icon07.png',
    look: '824',
    score: '9.2',
    status: presidentStatus
  }
])
// 电话值从子组件拿到
function handleInputChange(value) {
  inputphone.value = value
}
// 接口
const bookapi = datag.api + '/user/update'
// 拿到子组件传来得时间戳

// 入住
function handleInputIndate(value) {
  console.log('入住时间:', value)
  inputchckindate.value = value
}
// 退房
function handleInputOutdate(value) {
  console.log('退房时间:', value)
  inputchckoutdate.value = value
}
// 计算出住房天数 因为计算属性实在其他发生变化后才开始计算放在前面计算 后面渲染
const computedStayDays = computed(() => {
  if (inputchckindate.value && inputchckoutdate.value) {
    const checkInDate = new Date(inputchckindate.value)
    const checkOutDate = new Date(inputchckoutdate.value)
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return days
  } else {
    return 0
  }
})
// watchEffect监听事件可以实时更新计算数据
watchEffect(() => {
  console.log('入住天数为', computedStayDays.value)
})
// 拿到房间的信息
const roomall = async () => {
  const statsapi = datag.api + '/room/all'
  try {
    const response = await axios.get(statsapi)
    double.value = response.data.data.filter((item) => item.room == '大床房')
    double.value.forEach((room) => {
      if (room.roomstat === '未预订') {
        doubleStatus.value = '有'
      } else {
        doubleStatus.value = '无'
      }
    })
    // 拿双人房的状态
    Standard.value = response.data.data.filter((item) => item.room == '双人房')
    Standard.value.forEach((room) => {
      if (room.roomstat === '未预订') {
        StandardStatus.value = '有'
      } else {
        StandardStatus.value = '无'
      }
    })
    // 拿loft的状态
    loft.value = response.data.data.filter((item) => item.room == 'loft复式房')
    loft.value.forEach((room) => {
      if (room.roomstat === '未预订') {
        loftStatus.value = '有'
      } else {
        loftStatus.value = '无'
      }
    })
    // 拿豪华房的状态
    rich.value = response.data.data.filter((item) => item.room == '豪华房')
    rich.value.forEach((room) => {
      if (room.roomstat === '未预订') {
        richStatus.value = '有'
      } else {
        richStatus.value = '无'
      }
    })
    // 拿江景房的状态
    river.value = response.data.data.filter((item) => item.room == '江景房')
    river.value.forEach((room) => {
      if (room.roomstat === '未预订') {
        riverStatus.value = '有'
      } else {
        riverStatus.value = '无'
      }
    })
    //拿总统套房的状态
    president.value = response.data.data.filter((item) => item.room == '总统套房')
    president.value.forEach((room) => {
      if (room.roomstat === '未预订') {
        presidentStatus.value = '有'
      } else {
        presidentStatus.value = '无'
      }
    })

    // 拿所有房型的价格
    // 大床房
    roomPrice.value = response.data.data
    console.log(roomPrice.value);
    roomPrice.value.forEach((price) => {
      if(price.room === '大床房') {
        doublePrice.value = price.wifi
      } 
    })
    // 双人床
    roomPrice.value.forEach((price) => {
      if(price.room === '双人房') {
        StandardPrice.value = price.wifi
      } 
    })
    // loft复试
    roomPrice.value.forEach((price) => {
      if(price.room === 'loft复式房') {
        loftPrice.value = price.wifi
      } 
    })
    // 豪华房
    roomPrice.value.forEach((price) => {
      if(price.room === '豪华房') {
        richPrice.value = price.wifi
      } 
    })

    // 江景房
    roomPrice.value.forEach((price) => {
      if(price.room === '江景房') {
        riverPrice.value = price.wifi
      } 
    })
    // 总统套房
    roomPrice.value.forEach((price) => {
      if(price.room === '总统套房') {
        presidentPrice.value = price.wifi
      } 
    })
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  await roomall()
})


// 判断每个房型有无的状态 然后下拉选框的禁用

const BookRoom = async () => {
  // 判断登录

  // 时间的处理
  // 获取预定起始日期和离开时间 并且相减得到天数

  const selectedRoom = imgs.value.find((item) => item.room === selectedRoomType.value)
  if (selectedRoom) {
    // 发送订房信息
    const bookroomInfo = {
      userid: datag.userid.value,
      name: selectedRoom.room,
      phone: inputphone.value,
      // 起始时间
      roomdata: inputchckindate.value,
      // 住房天数
      bookinfo: computedStayDays.value
    }
    try {
      const response = await axios.post(bookapi, bookroomInfo)
      if (response.data.code == 20000) {
        ElMessage({
          showClose: true,
          type: 'success',
          message: '预定成功'
        })
      } else {
        ElMessage({
          showClose: true,
          message: '预定失败 请重新登录',
          type: 'error'
        })
        router.push('/login')
      }
    } catch (error) {
      ElMessage({
        showClose: true,
        message: '系统异常!',
        type: 'warning'
      })
    }
  } else {
    console.error('未找到')
    ElMessage({
      showClose: true,
      message: '请填写完整信息',
      type: 'warning'
    })
  }
}
//
// 拿到现在时间
const date = new Date()
const year = date.getFullYear()
const month = String(date.getMonth() + 1).padStart(2, '0')
const day = String(date.getDate()).padStart(2, '0')
const currentDate = ref(`${year}-${month}-${day}`)
// 拿到服务id 便利所有服务id 取最大值 在后面+1 就是现在要发送的服务id
const getServerId = async () => {
  const getidapi = datag.api + '/serve/all'
  try {
    const response5 = await axios.get(getidapi)
    getservedata.value = response5.data.data
    console.log(response5)
    console.log(getservedata.value)
    const serveids = getservedata.value.map((item) => item.serveid)
    console.log(serveids)
    if(serveids.length === 0 ){
      newServeId.value = 0
    
  }else{
    newServeId.value = Math.max(...serveids) + 1
    console.log(newServeId.value)
  }
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  await getServerId()
})  
// 发送服务请求
const Bookserve = async () => {
  await getServerId()
  const selectedServe = selectedServeType.value
  const serveInfo = {
    serveid: newServeId.value,
    servetype: selectedServe,
    serveall: budgetPrice.value,
    servedata: currentDate.value,
    userid: datag.userid.value
  }
  console.log(serveInfo);
  const serveapi = datag.api + '/serve/add'
  try {
    const response3 = await axios.post(serveapi, serveInfo)
    console.log(response3)
    if (response3.data.code == 20000) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '预定成功'
      })
    } else {
      ElMessage({
        showClose: true,
        message: '提交失败,重新登陆',
        type: 'error'
      })
    }
  } catch (error) {
    console.error(error)
    ElMessage({
        showClose: true,
        message: '提交失败,重新登陆',
        type: 'error'
      })
      router.push('/login')

  }
}
</script>
<style>
body {
  background-color: #fafafa;
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
.section5 {
  position: relative;
  /* border: 1px solid red; */
  padding: 100px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.section5 .container2 {
  width: 80%;
  /* border: 1px solid blue; */
  list-style: none;
}
.Roomtitle {
  text-align: center;
  font-size: 40px;
  font-weight: bolder;
  font-family: 'Jost', sans-serif;
  margin-top: 40px;
  /* position: sticky;
  top: 0;
  z-index: 99; */
  /* background-color: #fff; */
}
.Roomtitle span {
  position: relative;
}
.bookSlecet h2 {
  display: block;
}
.bookSlecet {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.serveSleect {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.Select_grid {
  display: flex;
  width: 100%;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
  gap: 100px;
}
.Select_grid .form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
}
.Select_grid .form-group label {
  width: 100%;
  display: block;
  font-size: 14px;
  text-align: center;
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

.serveButton {
  width: 100px;
  height: 87px;
  overflow: hidden;
  cursor: pointer;
}
.serveButton .servebutton {
  color: #fff;
  width: 100px;
  height: 100%;
  background-color: #856d47;
  border: 0;
}
.serveButton .shadow {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-color: #cdb48b;
  transform: translate(-100%, -100%);
  transition: all 0.3s;
  position: relative;
}
.form-group .price {
  background-color: #fff;
  width: 200px;
  height: 80px;
  border: 1px solid #cecece;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
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

button,
select {
  text-transform: none;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.room {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: center;
}
.room li {
  position: relative;
  /* border: 1px solid palegreen; */
  width: 635px;
  height: 110vh;
  margin-top: 10px;
  margin-left: 20px;
}
.room img {
}
.item {
  transition: transform 0.3s ease-out;
}

.item:hover {
  transform: scale(1.05);
}

.room .roomdesc {
  padding: 50px;
  background-color: #fafafa;
  height: 200px;
  width: 80%;
  position: absolute;
  top: 400px;
  left: 30px;
  display: flex;
  flex-wrap: wrap;
}

.roomdesc .priceline {
  width: 100%;
}
.priceline {
  width: 100%;
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #856d47;
  letter-spacing: 1px;
  font-family: 'Jost', sans-serif;
}
.priceline span {
  color: #6b6b6b;
}
.roomdesc .roomstate h2 {
  width: 100%;
  font-size: 40px;
}
.roomdesc .roomstate h3 {
  color: #fff;
  text-align: center;
  width: 50px;
  background-color: #856d47;
}

.roomdesc .roomstate {
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
}
.roomdesc p {
  font-size: 14px;
  width: 100%;
  font-family: sans-serif;
  /* font-weight: bolder; */
}
.roomdesc i {
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background-color: #bbbbbb;
}
.roomdesc .descicon {
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  padding-top: 20px;
}
.descicon .iconleft {
  height: 25px;
  width: 50%;
}
.descicon .iconleft img {
  height: 25px;
  margin-top: 10px;
  margin-right: 5px;
}
.descicon .iconright {
  font-family: 'Jost', sans-serif;
  /* opacity: 0.7; */
  color: #6b6b6b;
  display: flex;
  align-items: center;
}
.iconright span {
  padding: 5px 8px;
  background: #856d47;
  color: #fff;
  font-weight: 800;
  margin-left: 5px;
  opacity: 1;
}
</style>
