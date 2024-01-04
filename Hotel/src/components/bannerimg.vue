<template>
  <div class="banner" @mousedown="handleMouseDown" @touchstart="handleTouchStart">
    <div class="scroll-img" ref="scrollImg">
      <div
        v-for="(item, index) in images"
        :key="index"
        class="item1"
        @mousedown="startDrag(index)"
        @touchstart="startDrag(index)"
      >
        <img :src="item.abc" alt="" />
        <div class="mask">
          <div class="mask_con">
            <h6>{{ item.subtitle }}</h6>
            <h1>{{ item.title }}</h1>
            <div class="mask_a">
              <a href="#">{{ item.linkText }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bannerImg',
  data() {
    return {
      dragging: false,
      dragStartX: 0,
      dragStartTime: 0,
      currentIndex: 0,
      images: [
        {
          abc: '/src/assets/img/slide01.jpg',
          subtitle: 'THE EPITOME OF ELEGANCE AND LUXURY',
          title: 'Everything Included & Special Access',
          linkText: 'SEE OUR SUITES'
        },
        {
          abc: '/src/assets/img/slide02.jpg',
          subtitle: 'ALL INCLUSIVE & EXCLUSIVE',
          title: 'Your Dedication Recognized',
          linkText: 'CHECK OUR ROOMS'
        },
        {
          abc: '/src/assets/img/slide03.jpg',
          subtitle: 'HOSPITALITY ARE THE ORIGINS TRADITIONS MOTTO',
          title: 'Bountiful & Genuine Approach',
          linkText: 'DISCOVER'
        }
      ],
      timer: null
    }
  },
  methods: {
    handleMouseDown(event) {
      this.dragging = true
      this.dragStartX = event.clientX
      this.dragStartTime = Date.now()
    },
    handleMouseMove(event) {
      if (this.dragging) {
        const diffX = event.clientX - this.dragStartX
        // 根据拖拽的距离更新滚动位置
        const scrollImg = this.$refs.scrollImg
        const scrollWidth = scrollImg.offsetWidth
        let currentIndex = this.currentIndex
        if (diffX > 100) {
          currentIndex = Math.max(0, currentIndex - 1) // 向左拖拽，切换到上一张图片
        } else if (diffX < -100) {
          currentIndex = Math.min(this.images.length - 1, currentIndex + 1) // 向右拖拽，切换到下一张图片
        }
        this.scrollToIndex(currentIndex)
      }
    },
    handleMouseUp() {
      if (this.dragging) {
        this.dragging = false
        this.dragStartX = 0
        this.dragStartTime = 0
      }
    },
    handleTouchStart(event) {
      this.dragging = true
      this.dragStartX = event.touches[0].clientX
      this.dragStartTime = Date.now()
    },
    handleTouchMove(event) {
      if (this.dragging) {
        const diffX = event.touches[0].clientX - this.dragStartX
        // 根据拖拽的距离更新滚动位置
        const scrollImg = this.$refs.scrollImg
        const scrollWidth = scrollImg.offsetWidth
        let currentIndex = this.currentIndex
        if (diffX > 100) {
          currentIndex = Math.max(0, currentIndex - 1) // 向左拖拽，切换到上一张图片
        } else if (diffX < -100) {
          currentIndex = Math.min(this.images.length - 1, currentIndex + 1) // 向右拖拽，切换到下一张图片
        }
        this.scrollToIndex(currentIndex)
      }
    },

    handleTouchEnd() {
      if (this.dragging) {
        this.dragging = false
        this.dragStartX = 0
        this.dragStartTime = 0
      }
    },
    scrollToIndex(index) {
      this.currentIndex = index
      const scrollImg = this.$refs.scrollImg
      const scrollWidth = scrollImg.offsetWidth
      scrollImg.scrollTo({
        left: index * scrollWidth,
        behavior: 'smooth'
      })
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
      this.scrollToIndex(this.currentIndex)
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.nextSlide()
    }, 2500)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('touchmove', this.handleTouchMove)
    document.addEventListener('touchend', this.handleTouchEnd)
  },
  beforeUnmount() {
    clearInterval(this.timer)
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleTouchEnd)
  }
}
</script>
<style>
.banner {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  user-select: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-img {
  display: flex;
  width: 100%;
  height: 100%;
  scroll-snap-type: x mandatory;
  overflow: hidden !important;
  scroll-behavior: smooth;
}

.item1 {
  position: relative;
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.item1 img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.mask {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  font-size: 45px;
  z-index: 1;
}
.mask .mask_con {
  width: 1000px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
}

.mask .mask_con .mask_a a {
  text-decoration: none;
  color: #856d47;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Jost', sans-serif;
}
.mask_con h6 {
  font-size: 1rem;
  font-family: 'Jost', sans-serif;

}
.mask_con h1 {
  font-size: 6rem;
  font-family: serif;
  font-weight: bold;
}
.mask .mask_con .mask_a {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  margin-top: 10vh;
  height: 80px;
  background: #f5f3ec;
}

.scroll-img::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>
