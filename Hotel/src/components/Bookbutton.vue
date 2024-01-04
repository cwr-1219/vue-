<template>
<div class="form-group_button">
                <label>&nbsp; </label>
                <button 
                class="bookbutton" 
                type="submit"
                 value="Book Now"
                 ref="BigBox"
                 @mouseover="handleMouseOver" >预定</button>
                <div 
                class="shadow"
                @mouseout="handleMouseOut"
          ref="shadow"
                ></div>
              </div>
</template>

<script setup>
import { defineProps,ref, defineEmits } from 'vue';
//  按钮动画
const BigBox = ref(null)
const shadow = ref(null)
const handleMouseOver = () =>{
  shadow.value.style.transform = 'translate(0%, -100%)';
  
};
const handleMouseOut =()=>{
  shadow.value.style.transform = 'translate(-100%, -100%)';
 
  console.log(shadow.value.style);
 
  setTimeout(() => {
    shadow.value.style.transform = 'none';
    shadow.value.style.transform = 'translate(-100%, -100%)';
    
  }, 200);
  
}
const props = defineProps({
    buttontext: {
    type: String,
    default: 'buttontext'
  }
});
</script>

<style>
.form-group_button{
    width: 100px;
    height: 100px;
    overflow: hidden;   
  cursor: pointer;
  line-height: 10px;
}

.form-group_button .bookbutton {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: #856d47;
    border: none;
    /* padding: 0 50px; */
    font-family: 'Jost', sans-serif;

}
.form-group_button .shadow{
    display: block;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-color: #cdb48b;
  transform: translate(-100%, -100%);
  transition: all 0.3s;
  /* position: relative; */
}
</style>