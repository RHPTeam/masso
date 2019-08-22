<template>
  <section id="utilities" class="utilities ct">
    <div class="d_none d_md_block">
      <div class="content--options position_relative">
        <div class="slide--image">
          <transition name="slide-fade">
            <div class="items display" v-if="currentIndexInfo === 0">
              <div class="mb_2">Hướng dẫn đăng ký Zinbee</div>
              <iframe :style="widthDefault" height="500" src="https://www.youtube.com/embed/B6yDMCWTpLI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="content items" v-if="currentIndexInfo === 1">

              <div class="mb_2">Hướng dẫn kết nối facebook với tài khoản Zinbee</div>
              <iframe :style="widthDefault" height="500" src="https://www.youtube.com/embed/8UhYCOZAxWQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="automation items" v-if="currentIndexInfo === 2">
              <div class="mb_2">Hướng dẫn tổng quan về kho nội dung</div>
              <iframe :style="widthDefault" height="500" src="https://www.youtube.com/embed/oWvyBT9U5JI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="function items" v-if="currentIndexInfo === 3">
              <div class="mb_2">Hướng dẫn tích hợp Profile, Fanpage, Group trên tài khoản Zinbee</div>
              <iframe :style="widthDefault" height="500" src="https://www.youtube.com/embed/3fHgoQO6bac" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </transition>
        </div>
        <div class="action text_center">
          <ul>
            <li
              :class="[currentIndexInfo === 0 ? 'active' : '']"
              @click="currentIndexInfo = 0"
            ></li>
            <li
              :class="[currentIndexInfo === 1 ? 'active' : '']"
              @click="currentIndexInfo = 1"
            ></li>
            <li
              :class="[currentIndexInfo === 2 ? 'active' : '']"
              @click="currentIndexInfo = 2"
            ></li>
            <li
              :class="[currentIndexInfo === 3 ? 'active' : '']"
              @click="currentIndexInfo = 3"
            ></li>
          </ul>
        </div>
        <div
          class="position_absolute action--slider-info d_flex align_items_center"
        >
          <span
            class="prev action"
            @click="prevInfo"
            v-if="currentIndexInfo !== 0"
          >
            <icon-base
              class="icon--arrow-left"
              icon-name="Prev"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-arrow-left></icon-arrow-left>
            </icon-base>
          </span>
          <span
            class="next ml_auto action"
            @click="nextInfo"
            v-if="currentIndexInfo !== 3"
          >
            <icon-base
              class="icon--arrow-left"
              icon-name="Next"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-arrow-left></icon-arrow-left>
            </icon-base>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndexInfo: 0,
      widthDefault: { width: "100%" }
    };
  },
  methods: {
    nextInfo() {
      if (this.currentIndexInfo === 3) {
        this.currentIndexInfo = 3;
      } else {
        this.currentIndexInfo++;
      }
    },
    prevInfo() {
      if (this.currentIndexInfo === 0) {
        this.currentIndexInfo = 0;
      } else {
        this.currentIndexInfo--;
      }
    },
    sliderWhyChooseZinbee() {
      setInterval(() => {
        this.currentIndexInfo++;
        if (this.currentIndexInfo === 4) {
          this.currentIndexInfo = 0;
        }
      }, 6000);
    }
  },
  // mounted() {
  //   this.sliderWhyChooseZinbee();
  // }
};
</script>

<style scoped lang="scss">
@import "../index.style";

// slides
.utilities {
  margin-bottom: 0 !important;
  color: #333;
  .options {
    border-bottom: 1px solid #ebebeb;
    .first,
    .second {
      flex: 1;
    }
    .title {
      flex: 1;
      p {
        line-height: 92px;
        margin-bottom: 0;
        display: inline-block;
        cursor: pointer;
        transition: 0.4s;
        position: relative;
        &::before {
          content: "";
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          position: absolute;
          background: transparent;
          transition: all 0.5s linear;
        }
      }
      &.active,
      &:hover {
        p {
          color: #333;
          &::before {
            background: #333;
            width: 100%;
          }
        }
      }
    }
  }
  .content--options {
    color: #ccc;
    padding: 0 .5rem;
    overflow: hidden;
    &:hover {
      .action--slider-info {
        opacity: 1;
      }
    }
    .title--why {
      font-size: 1.8rem;
      margin: 0 0 1rem 0;
      font-weight: 500;
    }
    .section--title-content {
      margin-bottom: 10px;
    }
    .slide--image {
      overflow: hidden;
      height: 510px;
      .items {
        overflow: hidden;
        width: 100%;
        height: 510px;
      }
      .left,
      .right {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        flex: 1;
        &.text {
          padding: 0 1rem;
        }
      }
    }
  }
  .action {
    margin-top: 1rem;
    li {
      cursor: pointer;
      display: inline-block;
      margin-right: 5px;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: #ccc;
      &.active {
        background: #f8b448;
      }
    }
  }
  .action--slider-info {
    opacity: 0;
    transition: 0.3s;
    width: 100%;
    top: 40%;
    transform: translateY(-50%);
    left: 0px;
    .action {
      cursor: pointer;
      // background: #ccc;
      border-radius: 50%;
      color: #f8b448;
      transition: 0.4s;
      &:hover {
        background: #f8b448;
        color: #fff;
      }
    }
    .next {
      transform: rotate(180deg);
      padding: 0.25rem 0.625rem;
      height: 44px;
      width: 44px;
      svg {
        margin-top: 6px;
      }
    }
    .prev {
      padding: 0.25rem 0.625rem;
      height: 44px;
      width: 44px;
      svg {
        margin-top: 6px;
      }
    }
  }
}
</style>
