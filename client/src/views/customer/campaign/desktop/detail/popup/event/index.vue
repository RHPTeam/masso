<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content modal--event p_0">
        <!-- Start: Modal Header -->
        <div class="modal--header modal--event-header p_3">
          <div class="r header--row mx_0">
            <div class="header--row-left mr_3">
              <input
                class="event--name"
                type="text"
                placeholder="Nhập tên sự kiện"
                value="Khởi động chiến dịch"
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
              <div class="btn--header btn--save">
                XONG
              </div>
            </div>
          </div>
          <div class="r header--row mx_0 justify_content_between mt_3">
            <div class="header--row-left">
              <div class="event--autopost">
                <span>
                  <toggle-switch
                    class="mr_2"
                    @change="toggled = $event.value"
                    :value="true"
                    :sync="true"
                    :color="{ checked: '#FFFFFF', unchecked: 'green' }"
                    :switch-color="{ checked: '#FFB94A', unchecked: 'green' }"
                  />
                  Đăng ngẫu nhiên bài viết trên trang cá nhân vào các khung giờ
                  vàng.
                </span>
              </div>
            </div>
            <div class="header--row-right">
              <div class="event--change-color">
                <div class="label--change">Thay đổi màu sắc</div>
                <div class="dropdown--menu"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <VuePerfectScrollbar class="modal--event-scroll">
          <div class="modal--body modal--event-body p_3">
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
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
.modal--event {
  width: 1000px !important;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  .modal--event-header {
    background-color: #ffb94a;
    border-top-left-radius: 0.625rem;
    border-top-right-radius: 0.625rem;
    .header--row {
      color: #fff;
      .header--row-left {
        font-size: 0.875rem;
        width: calc(100% - 124px - 2rem);
        .event--name {
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
      }
      .header--row-right {
        .btn--header {
          color: #fff;
          cursor: pointer;
        }
        .btn--save {
          border: 1px solid #fff;
          border-radius: 0.625rem;
          height: 40px;
          line-height: 40px;
          text-align: center;
          width: 76px;
        }
        .event--change-color {
          .label--change {
            cursor: pointer;
            font-size: 0.75rem;
            font-style: italic;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .modal--event-scroll {
    height: calc(100% - 136px);
    overflow: hidden scroll;
  }
}
</style>
