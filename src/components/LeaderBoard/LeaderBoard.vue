<template>
  <div class="leader">
    <!-- Slider main container -->
    <div ref="swiper" class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">
          <div class="leader-item">
            <div class="leader-item-img">
              <img src="@/assets/images/icons/user-avatar.png">
              <div class="leader-item-rank"><span>#1</span></div>
            </div>
            <p class="leader-item-name">حمزه عمر</p>
            <p class="leader-item-class">الصف الأول الأبتدائى</p>
            <p class="leader-item-point"><span>989</span><span>نقطة</span></p>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="leader-item">
            <div class="leader-item-img">
              <img src="@/assets/images/icons/user-avatar.png">
              <div class="leader-item-rank"><span>#1</span></div>
            </div>
            <p class="leader-item-name">حمزه عمر</p>
            <p class="leader-item-class">الصف الأول الأبتدائى</p>
            <p class="leader-item-point"><span>989</span><span>نقطة</span></p>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="leader-item">
            <div class="leader-item-img">
              <img src="@/assets/images/icons/user-avatar.png">
              <div class="leader-item-rank"><span>#1</span></div>
            </div>
            <p class="leader-item-name">حمزه عمر</p>
            <p class="leader-item-class">الصف الأول الأبتدائى</p>
            <p class="leader-item-point"><span>989</span><span>نقطة</span></p>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="leader-item">
            <div class="leader-item-img">
              <img src="@/assets/images/icons/user-avatar.png">
              <div class="leader-item-rank"><span>#1</span></div>
            </div>
            <p class="leader-item-name">حمزه عمر</p>
            <p class="leader-item-class">الصف الأول الأبتدائى</p>
            <p class="leader-item-point"><span>989</span><span>نقطة</span></p>
          </div>
        </div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- If we need navigation buttons -->
    <div class="back-slide">
      <img src="@/assets/images/icons/back.svg">
    </div>
    <div class="next-slide">
      <img src="@/assets/images/icons/next.svg">
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.css"

export default {
  name: "LeaderBoard",
  mounted() {
    new Swiper('.swiper', {
      // Optional parameters
      loop: true,
      // Navigation arrows
      navigation: {
        nextEl: '.next-slide',
        prevEl: '.back-slide',
      },
      slidesPerView: 3,
      spaceBetween: 20,
    })
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/style/scss/_variables";
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.leader{
  position: relative;
  .back-slide,.next-slide{
    position: absolute;
    bottom: -4.2rem;
    background-color: #F4EDF3;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .next-slide{
    right: 3vw;
  }
  .leader-item{
    text-align: center;
    .leader-item-img{
      width: 80px;
      height: 80px;
      border: 3px solid #FFF;
      border-radius: 50%;
      margin: 0 auto;
      position: relative;
      img{
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: contain;
      }
      .leader-item-rank{
        position: absolute;
        bottom: -1rem;
        right: -1rem;
        border-radius: 50%;
        background-color: #76236C;
        width: 40px;
        height: 40px;
        padding: 0 0 0.5rem 0;
        color: #FFFFFF;
        border: 2px solid #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.3rem;
        }
      }
    }
    .leader-item-name{
      margin: 1.1rem 0 .2rem 0;
      font-size: 1.4rem;
      font-weight: bold;
      color: $color-primary;
    }
    .leader-item-class{
      color: $color-heading;
      font-size: .8rem;
      font-weight: bold;
      margin: .7rem 0 0 0;
    }
    .leader-item-point{
      color: $color-orange;
      font-size: 1.2rem;
      font-weight: bold;
      span{
        &:first-of-type{
          display: inline-block;
          margin-left: .5rem;
        }
      }
    }
  }
}
</style>
