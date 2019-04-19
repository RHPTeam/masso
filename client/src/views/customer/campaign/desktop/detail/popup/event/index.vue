<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content modal--event p_0">
        <!-- Start: Modal Header -->
        <div class="modal--header modal--event-header p_3"
          :style="{backgroundColor: activeColor.code}"
        >
          <div class="r header--row mx_0">
            <div class="header--row-left mr_3">
              <input
                class="event--name"
                type="text"
                placeholder="Nhập tên sự kiện"
                :value="eventData.name"
              />
            </div>
            <div class="header--row-right d_flex align_items_center">
              <div class="btn--header btn--copy mr_2">
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
              <div class="btn--header btn--delete mr_2">
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
              <div class="btn--header btn--save" @click="closePopup">
                XONG
              </div>
            </div>
          </div>
          <div class="r header--row mx_0 justify_content_between mt_3">
            <div class="header--row-left">
              <div class="event--autopost">
                <div>
                  <toggle-switch
                    class="mr_2"
                    @change="toggled = $event.value"
                    :value="true"
                    :sync="true"
                    :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
                    :switch-color="{ checked: activeColor.code, unchecked: '#e4e4e4' }"
                  />
                  Đăng ngẫu nhiên bài viết trên trang cá nhân vào các khung giờ
                  vàng.
                </div>
              </div>
            </div>
            <div class="header--row-right">
              <div class="event--change-color">
                <div class="label--change"
                  @click="isShowColorDropdown = true"
                >Thay đổi màu sắc</div>
                <!-- Start: Change color dropdown -->
                <div class="dropdown--menu" v-if="isShowColorDropdown">
                  <div class="r mx_0">
                    <div class="dropdown--menu-item" 
                      v-for="(i, index) in 3" 
                      :key="index"
                    >
                      <div class="color--box" 
                        :style="{backgroundColor: colors[index].code}"
                        @click="changeColor(colors[index])"
                      ></div>
                    </div>
                  </div>
                  <div class="r mx_0">
                    <div class="dropdown--menu-item" 
                      v-for="(i, index) in 3" 
                      :key="index"
                    >
                      <div class="color--box" 
                        :style="{backgroundColor: colors[index + 3].code}"
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
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <VuePerfectScrollbar class="modal--event-scroll">
          <div class="modal--event-body">
            <div class="px_3 py_2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              error enim consequuntur eaque, quia excepturi beatae tempora
              deserunt delectus, quibusdam hic maxime labore. In aut quaerat
              exercitationem dolore error voluptates? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quaerat, impedit eos. Voluptatibus
              tempore voluptatum repellat eos quasi doloribus consequatur amet
              possimus eaque rem. Explicabo, et quod vero dolor dolore voluptates.
            </div>
          </div>
        </VuePerfectScrollbar>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: ["eventData"],
  data() {
    return {
      activeColor: {name: 'orange', code: '#FFB94A'},
      colors: [
        {name: 'blue', code: '#85CFFF'},
        {name: 'violet', code: '#BE92E3'},
        {name: 'green', code: '#7BD48A'},
        {name: 'gray', code: '#999999'},
        {name: 'orange', code: '#FFB94A'},
        {name: 'red', code: '#FF8787'},
      ],
      isShowColorDropdown: false
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    changeColor(color) {
      this.activeColor = color;
      this.isShowColorDropdown = false;
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
@import "./style"
</style>
