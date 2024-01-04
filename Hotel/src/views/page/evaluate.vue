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
    <div class="nav1">
      <div class="navdesc">
        <h1>Appraise</h1>
        <p>We adore hotels.</p>
      </div>
    </div>
    <!--  -->

    <div class="section_eva">
      <div class="eva_desc">
        <h2>入住反馈</h2>
        <span></span>
      </div>
      <div class="eva">
        <el-table class="eva_table" size="big" :data="data" style="width: 100%; font-size: 18px">
          <el-table-column label="房间号" prop="id" />

          <el-table-column label="房型" prop="date" />
          <el-table-column label="价格" prop="name" />

          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="big" placeholder="Type to search" />
            </template>
            <template #default="">
              <el-button
                size="small"
                @click="centerDialogVisible = true"
                type="warning"
                style="font-size: 15px"
                >评价</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-backtop :right="100" :bottom="100" />
  </maincon>
  <footercon>
    <p>Celestial ©电子牛牛团队</p>
    <p>Copyright © Celestial</p>
  </footercon>
  <el-dialog v-model="centerDialogVisible" title="评价" width="30%" align-center>
    <el-form-item label="您的评价是">
      <el-radio-group v-model="form.resource">
        <el-radio label="好评" />
        <el-radio label="差评" />
      </el-radio-group>
    </el-form-item>
    <span>您的反馈是我们最大的动力</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">返回</el-button>
        <el-button type="warning" @click="SubmitFeedback" :disabled="!form.resource">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import axios from 'axios'
import { ref, reactive, watch, onMounted, computed, watchEffect } from 'vue'
import { datag } from '@/request/api.ts'
import { ElMessage } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'

const centerDialogVisible = ref(false)
const search = ref('')
const form = reactive({
  resource: ''
})
const goodcommit = ref('')
const badcommit = ref('')

// 监听用户的评价的选择
watch(form, (newVal) => {
  if (newVal.resource === '好评') {
    goodcommit.value = '好评'
    badcommit.value = ''
  } else if (newVal.resource === '差评') {
    goodcommit.value = ''
    badcommit.value = '差评'
  }
})
const data = ref([])
const getUserid = ref([])
const getroomZhu = ref([])
// console.log(datag.userid.value)
// console.log(datag.userpassword.value)
// 拿到所有房间的信息
const roomall = async () => {
  const roomapi = datag.api + '/room/all'
  try {
    const response = await axios.get(roomapi)
    getroomZhu.value = response.data.data.filter((item) => item.roomstat == '住宿')
    console.log(getroomZhu.value)
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  await roomall()
  // 拿到对应的userid的住房信息
  data.value = getroomZhu.value.map((item) => ({
    id: item.roomid,
    date: item.room,
    name: item.wifi
  }))
})
// 用登陆后的userid(存在全局中 去和预定了的房间的表的userid1去比对 筛选出对应的住房信息)
const booked = async () => {
  const bookedapi = datag.api + '/chabook/all'
  try {
    const response = await axios.get(bookedapi)
    getUserid.value = response.data.data.filter((item) => item.userid1 == datag.userid.value)
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  await booked()
})
// 拿出登录的账户的userid对应的入住信息

// 发送评论请求
const SubmitFeedback = async () => {
  // 先发送userid然后再在修改上做个评价
  const Evauser = {
    userid: datag.userid.value,
    goodcommit: goodcommit.value,
    badcommit: badcommit.value
  }

  const commituserapi = datag.api + '/commit/markup'

  try {
    const response1 = await axios.post(commituserapi, Evauser)
    // console.log(response1)
    if (response1.data.message == 'success') {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '提交成功'
      })
    } else {
      ElMessage({
        showClose: true,
        message: '提交失败,重新登陆',
        type: 'error'
      })
      router.push('/login')
    }
  } catch (error) {
    console.error(error)
  }
}

//
</script>
<style scoped>
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
.nav1 {
  position: relative;
  background-position-y: bottom;
  background-size: cover;
  background-image: url(../../assets/image/page2.jpg);
  height: 70vh;
}
.nav1 h1 {
  color: #fafafa;
  margin: 0;
  display: block;
  font-size: 100px;
  font-family: serif;
}
.nav1 p {
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
.section_eva {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
}
.eva_desc {
  position: relative;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  /* display: flex;   */
}
.eva_desc span {
  /* margin-top: 15px; */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 100px;
  height: 2px;
  background-color: rgb(150, 150, 150);
}
.eva_desc h2 {
  display: block;
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding: 20px 0;
}
.section_eva .eva {
  width: 80%;
}
.eva .eva_table {
  color: black;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
