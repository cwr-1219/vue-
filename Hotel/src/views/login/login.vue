<template>
  <div class="logincon">
    <div class="titleBox">
      <img src="../../assets/img/logo.png" alt="" />
    </div>
    <div class="container">
      <div class="login-box" ref="loginBox">
        <div class="title">Login</div>
        <div class="input">
          <input type="text" id="login-user" v-model="loginuser" placeholder="输入用手机号" />
        </div>
        <div class="input">
          <input
            type="password"
            id="login-password"
            v-model="loginpassword"
            placeholder="输入密码"
          />
        </div>
        <div class="btn login-btn" @click="handlelogin('handlelogin')">
          <span>登录</span>
        </div>
        <div class="change-box login-change">
          <div class="change-btn toSign" @click="handleToSign">
            <span>去注册</span>
          </div>
        </div>
      </div>

      <div class="sign-box" ref="signBox">
        <div class="title">Sign</div>
        <div class="input2">
          <input type="text" id="sign-tele" v-model="signData.userid" placeholder="输入手机号" />
        </div>
        <div class="input2">
          <input type="password" id="sign-user" v-model="signData.phone" placeholder="输入密码" />
        </div>

        <div class="btn sign-btn" :plain="ture" @click="handlesign('handlesign')">
          <span>注册</span>
        </div>
        <div class="change-box sign-change">
          <div class="change-btn toLogin" @click="handleToLogin">
            <span>去登陆</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import router from '@/router'

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { datag } from '@/request/api.ts'

const loginuser = ref()
const loginpassword = ref()
const getSelector = (ele) => {
  return typeof ele === 'string' ? document.querySelector(ele) : ''
}
// 登录注册载入
const containerShow = () => {
  var show = getSelector('.container')
  show.className += ' container-show'
}

onMounted(containerShow)

// 登录注册页切换
const toSignBtn = ref(null)
const toLoginBtn = ref(null)
const loginBox = ref(null)
const signBox = ref(null)

const handleToSign = () => {
  loginBox.value.className += ' animate_login'
  signBox.value.className += ' animate_sign'
}

const handleToLogin = () => {
  loginBox.value.classList.remove('animate_login')
  signBox.value.classList.remove('animate_sign')
}

// 数据接口
const apiurl = datag.api + '/user/add'
const loginApi = datag.api + '/user/login'
// 注册数据
const signData = reactive({
  userid: '',
  name: '',
  phone: '',
  roomdata: '',
  bookinfo: ''
})

const handlesign = async () => {
  // 获取当前时间
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  // 发送的注册信息
  const user = {
    userid: signData.userid,
    name: '暂无',
    phone: signData.phone,
    roomdata: formattedDate,
    bookinfo: '暂无'
  }
  // 判断注册
  try {
    const response = await axios.post(apiurl, user)
    console.log(user)
    if (response.data.code == 20000) {
      console.log('注册成功')
      console.log(response)
      ElMessage({
        showClose: true,
        message: '注册成功!',
        type: 'success'
      })
      // console.log(datag.userinfo)
      loginuser.value = signData.userid
      loginpassword.value = signData.phone
      datag.userinfo = user
      console.log(datag.userinfo)
      const Evainfo = {
        // 用户id
        userid: signData.userid,
        goodcommit: '',
        badcommit: ''
      }
      const evaapi = datag.api + '/commit/add'

      try {
    const response = await axios.post(evaapi, Evainfo)
    console.log(response)
    if (response.data.code == 20000) {
      // ElMessage({
      //   showClose: true,
      //   type: 'success',
      //   message: '提交成功'
      // })
    } else {
      // ElMessage({
      //   showClose: true,
      //   message: '提交失败,重新登陆',
      //   type: 'error'
      // })
    }
  } catch (error) {
    console.error(error)

  }

    } else {
      ElMessage({
        showClose: true,
        message: '注册失败!',
        type: 'error'
      })
      console.log('请输入正确的格式!')
    }
  } catch (error) {
    ElMessage({
      showClose: true,
      message: '系统异常!',
      type: 'warning'
    })
    console.error('系统异常!')
  }
}
// 登录事件
const handlelogin = async () => {
  // 发送的登陆信息
  const userlogin = {
    userid: loginuser.value,
    phone: loginpassword.value
  }
  console.log(userlogin)
  // 判断登录
  try {
    const response = await axios.post(loginApi, userlogin)
    console.log(response.data.data.token)
    if (response.data.code == 20000) {
      console.log('登陆成功!')
      datag.userid.value = loginuser.value
      datag.userpassword.value = loginpassword.value
      // console.log(response)
      ElMessage({
        showClose: true,
        message: '登录成功!',
        type: 'success'
      })
      router.push('/')
    } else {
      ElMessage({
        showClose: true,
        message: '账号或者密码错误!',
        type: 'error'
      })
      console.log('账号或者密码错误!')
    }
  } catch (error) {
    console.error('系统异常!')
    ElMessage({
      showClose: true,
      message: '系统异常!',
      type: 'warning'
    })
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}

html,
body {
  height: 100%;
  width: 100%;
  /* background-image: linear-gradient(120deg, #487eb0, #fbc531); */
}
.logincon {
  background: url(../../assets/img/DM_20231222094018_001.png);
  height: 100vh;
}
.titleBox {
  margin-top: 60px;
  height: 160px;
  display: flex;
  justify-content: center;
}
.container {
  /* overflow: hidden; */
  position: absolute;
  height: 350px;
  width: 600px;
  background-color: rgba(255, 255, 255, 0.9);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(17, 39, 59, 0.8);
  border: 1px solid rgba(17, 39, 59, 1);
  overflow: hidden;
  box-sizing: border-box;
  opacity: 0;
  transition: 1s;
}

.container-show {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.container:hover .title {
  font-size: 20px;
  /* transform: translate(0,-30%); */
}

.container:hover input {
  transform: translate(0, -30%);
}

.container:hover .btn {
  height: 30px;
  width: 90px;
  transform: translate(0, -30%);
  font-size: 12px;
}

.container:hover .change-box {
  height: 200px;
}

.container:hover .change-btn {
  display: block;
}

.title {
  margin-top: 10px;
  position: relative;
  height: 40px;
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 3px;
  transition: 0.4s;
}
.login-box .title {
  color: white;
  text-shadow: 0px 0px 7px rgba(255, 255, 255, 0.9);
}

.input {
  width: 400px;
  height: 45px;
  position: relative;
  margin: 40px auto;
  /* border-radius: 45px;
    overflow: hidden; */
}
.input2 {
  width: 400px;
  height: 45px;
  position: relative;
  margin: 40px auto;
}
.input2 input {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  /* box-sizing: border-box; */
  padding-left: 15px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 45px;
  transition: 0.4s;
}
.input input {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  /* box-sizing: border-box; */
  padding-left: 15px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 45px;
  transition: 0.4s;
}

.login-box input:focus {
  box-shadow: 0 0 10px rgba(1, 1, 1, 0.8);
}

.btn {
  height: 50px;
  width: 160px;
  position: relative;
  margin: -10px auto;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.4s;
}

.change-box {
  position: absolute;
  height: 0px;
  width: 100%;
  clip-path: polygon(100% 50%, 50% 100%, 100% 100%);
  bottom: 0px;
  transition: 0.4s;
}

.change-btn {
  position: absolute;
  bottom: 30px;
  right: 40px;
  font-size: 20px;
  display: none;
  font-weight: 500;
}
.change-btn:hover {
  text-shadow: 0px 0px 3px rgba(200, 200, 200, 0.8);
  cursor: pointer;
}

.login-box input {
  caret-color: white;
  color: rgba(255, 255, 255, 0.8);
}

.login-btn:hover {
  color: white;
  background-color: #57606f;
  box-shadow: rgba(0, 0, 0, 0.1);
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
}

.login-change {
  background-color: rgba(255, 255, 255, 0.8);
}

.animate_login {
  transform: rotate(-90deg);
}

.animate_sign {
  transform: rotate(0deg) !important;
}

.login-box {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(17, 39, 59, 0.8);
  transition: 0.4s;
  z-index: 1;
  transform-origin: 0 100%;
}

/* 注册框样式 */
.sign-box {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  transform-origin: 0 100%;
  transform: rotate(90deg);
  transition: 0.4s;
  z-index: 1;
}

.sign-box .title {
  text-shadow: 0 0 10px rgba(200, 200, 200, 0.8);
  font-weight: 500;
}

.sign-change {
  background-color: rgba(17, 39, 59, 0.8);
}

.toLogin {
  color: white;
}

.sign-box input {
  box-shadow: 0 0 3px black;
}

.sign-box .btn {
  color: #1e90ff;
  background-color: rgba(200, 200, 200, 0.1);
  transition: 0.5s;
}

.sign-box .btn:hover {
  color: white;
  background-color: #1e90ff;
}
</style>
