<template>
  <div
    class="box p_3"
  >
    <!-- Start: Row -->
    <div class="r mx_0">
      <div class="left mr_3">
        <input
          type="text"
          v-model="event.title"
          placeholder="Nhập tên sự kiện"
        />
      </div>
      <div class="right d_flex align_items_center">
        <div class="button copy mr_2">
          <icon-base
            class="ic--copy"
            icon-name="ic--copy"
            width="24"
            height="24"
            viewBox="0 0 500 500"
          >
            <icon-copy />
          </icon-base>
        </div>
        <div class="button remove mr_2">
          <icon-base
            class="ic--remove"
            icon-name="ic--remove"
            width="24"
            height="24"
            viewBox="0 0 16 16"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="button save" @click.prevent="createEvent">
          TẠO MỚI
        </div>
      </div>
    </div>
    <!-- End: Row -->
    <div class="text_danger mt_2" v-if="error === true"> Tiêu đề của event không được bỏ trống ! </div>
    <!-- Start: Row -->
    <div class="r mx_0 justify_content_between mt_3">
      <div class="left">
        <div class="d_flex">
          <toggle-switch
            class="mr_2"
            :value="status"
            @change="changeStatus($event.value)"
            :sync="true"
            :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
            :switch-color="{
              checked: '#ffa94b',
              unchecked: '#e4e4e4'
            }"
          />
          <span>
            Tự động đăng bài trên trang cá nhân vào các khung giờ vàng.
          </span>
        </div>
      </div>
      <div class="right">
        <div class="action" aria-label="Change Color">
          <div role="color" @click="isShowColorDropdown = !isShowColorDropdown">
            <span>Thay đổi màu sắc</span>
            <!-- Start: Change color dropdown -->
            <div class="dropdown--menu" v-if="isShowColorDropdown" v-click-outside="closeColorGrid">
              <div class="r mx_0">
                <div
                  class="dropdown--menu-item"
                  v-for="(i, index) in 3"
                  :key="index"
                >
                  <div
                    class="grid"
                    :style="{ backgroundColor: colors[index] }"
                    @click="changeColor(colors[index])"
                  ></div>
                </div>
              </div>
              <div class="r mx_0">
                <div
                  class="dropdown--menu-item"
                  v-for="(i, index) in 3"
                  :key="`s-${index}`"
                >
                  <div
                    class="grid"
                    :style="{ backgroundColor: colors[index + 3] }"
                    @click="changeColor(colors[index + 3])"
                  ></div>
                </div>
              </div>
            </div>
            <!-- End: Change color dropdown -->
          </div>

        </div>
      </div>
    </div>
    <!-- End: Row -->
  </div>
</template>

<script>
export default {
  props: {
    status: Boolean
  },
  data() {
    return {
      colors: [ "#85CFFF", "#BE92E3", "#7BD48A", "#999999", "#FFB94A", "#FF8787" ],
      isShowColorDropdown: false,
      error: false,
      event: {
        title: ""
      }
    }
  },
  methods: {
    closeColorGrid() {
      this.isShowColorDropdown = false;
    },
    changeStatus(status) {
      this.$emit( "change", status );
    },
    createEvent() {
      if ( this.event.title.length === 0 ) {
        this.error = true;
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    background-color: #85CFFF;
    border-top-left-radius: 0.625rem;
    border-top-right-radius: 0.625rem;
    height: auto;
    transition: all 1s ease;
    .r {
      font-size: 0.875rem;
    }
    input[type=text] {
      border: 0;
      border-radius: 0.625rem;
      background-color: #fff;
      color: #444;
      height: 40px;
      line-height: 40px;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      width: 100%;
      &:active,
      &:focus {
        outline: 0;
        box-shadow: none;
      }
      &::placeholder {
        color: #ccc;
      }
    }
    .left {
      flex: 1;
    }
    .right {
      .action div[role=color] {
        position: relative;
        span {
          cursor: pointer;
          font-style: italic;
          opacity: .8;
          text-decoration: underline;
          &:hover {
            opacity: 1;
          }
        }
      }
      .button {
        color: #fff;
        cursor: pointer;
        transition: all .4s ease;

        &.copy:hover, &.remove:hover {
          svg {
            stroke: #fff;
            stroke-opacity: .8;
          }
        }
        &.copy:hover svg {
          stroke-width: 10;
        }
        &.remove:hover svg {
          stroke-width: .3;
        }
        &.save {
          border: 1px solid #fff;
          border-radius: 0.625rem;
          height: 40px;
          line-height: 40px;
          text-align: center;
          transition: all .4s ease;
          width: 76px;

          &:hover {
            box-shadow: 0 0 5px rgba(255, 255, 255, 1);
            font-weight: 600;
          }
        }
      }
    }
  }

  .dropdown--menu {
    background-color: #fff;
    border-radius: .625rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    margin-top: 2px;
    padding: .375rem .5rem;
    position: absolute;
    right: 0;
    z-index: 99;
    .dropdown--menu-item {
      align-items: center;
      display: flex;
      justify-content: center;
      height: 30px;
      width: 30px;
      .grid {
        border-radius: .3rem;
        cursor: pointer;
        height: 20px;
        opacity: .8;
        transition: all .4s ease;
        width: 20px;
        &:hover {
          height: 22px;
          opacity: 1;
          width: 22px;
        }
      }
    }
  }
</style>
