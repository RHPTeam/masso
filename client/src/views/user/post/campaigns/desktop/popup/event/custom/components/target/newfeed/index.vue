<template>
  <div class="newfeed">
    <div class="body">
      <div class="title">Chọn tài khoản bạn muốn đăng lên trang cá nhân</div>
      <div class="account mt_2 mb_2">
        <div class="d_flex align_items_center mb_1">
          <!-- Start: Avatar Account -->
          <div class="left"></div>
          <!-- End: Avatar Account -->
          <!-- Start: Name Account + Action -->
          <div class="right d_flex align_items_center">
            <!-- Start: Name Account -->
            <div class="name ml_3">Le Khang</div>
            <!-- End: Name Account -->
            <!-- Start: Action -->
            <div class="action ml_auto">
              <label class="custom--checkbox mr_2">
                <input type="checkbox" />
              </label>
            </div>
            <!-- End: Action -->
          </div>
          <!-- Start: Name Account + Action -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.newfeed {
  .body {
    .account {
      .left {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        border: 1px solid #cccccc;
        height: 50px;
        width: 50px;
      }
      .right {
        width: calc(100% - 51px);
        .name {
          font-weight: 600;
        }
        .action {
          .custom--checkbox {
            input[type="checkbox"] {
              border-radius: 6px;
              border: solid 1.5px #cccccc;
              cursor: pointer;
              height: 20px;
              outline: none;
              width: 20px;
              -webkit-appearance: none;
              -moz-appearance: none;
              &:checked {
                background-color: #ffb94a;
                border: solid 1px #ffb94a;

                &:before {
                  border-bottom: 2px solid #fff;
                  border-right: 2px solid #fff;
                  content: "";
                  display: block;
                  height: 10px;
                  position: relative;
                  left: 50%;
                  top: 42%;
                  transform: translate(-50%, -50%) rotate(45deg);
                  width: 7px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
