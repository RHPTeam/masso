<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header  -->
      <div class="items--header d_flex align_items_center mb_3">
        <div @click="closePopup">
          <icon-base
            icon-name="arrow-down"
            class="arrow-down"
            width="20"
            height="20"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div class="item m_auto text_center">Tạo thành viên</div>
        <div class="mr_2" @click="createNewMember">Tạo</div>
        <!-- <div class="active mr_2">
          <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
            <icon-plus />
          </icon-base>
        </div>-->
      </div>
      <!-- End: Header -->
      <div class="items--body px_3">
        <!-- Start: Form Body -->
        <form>
          <div class="font_weight_bold mb_1">Tên đăng ký</div>
          <div
            class="form_group position_relative"
            :class="{
                errors: statusClassError.name,
                passed: statusClassPassed.name
              }"
          >
            <div class="icon position_absolute">
              <icon-base
                icon-name="Họ tên"
                width="16.425"
                height="16.425"
                viewBox="0 0 16.425 16.425"
              >
                <icon-user />
              </icon-base>
            </div>
            <input id="nameField" type="text" placeholder="Họ tên" v-model="user.name" />
          </div>
          <div class="text--error">{{ errorText.name }}</div>
          <div class="font_weight_bold mb_1">Email đăng ký</div>
          <div
            class="form_group position_relative"
            :class="{
                errors: statusClassError.email,
                passed: statusClassPassed.email
              }"
          >
            <div class="icon position_absolute">
              <icon-base
                icon-name="Email"
                width="20.554"
                height="15.713"
                viewBox="0 0 20.554 15.713"
              >
                <icon-envelope />
              </icon-base>
            </div>
            <input id="emailField" type="email" placeholder="Email" v-model="user.email" />
            <span class="text--error"></span>
          </div>
          <div class="text--error">{{ errorText.email }}</div>
          <div class="font_weight_bold mb_1">Số điện thoại</div>
          <div
            class="form_group position_relative"
            :class="{
                errors: statusClassError.phone,
                passed: statusClassPassed.phone
              }"
          >
            <div class="icon position_absolute">
              <icon-base
                icon-name="Phone"
                width="20.896"
                height="20.857"
                viewBox="0 0 20.896 20.857"
              >
                <icon-phone />
              </icon-base>
            </div>
            <div
              v-if="isStatusNetwork"
              :class="{
                  viettel: network.toString().toLowerCase() === 'viettel',
                  vina: network.toString().toLowerCase() === 'vinaphone',
                  mobi: network.toString().toLowerCase() === 'mobiphone',
                  vietnammb:
                    network.toString().toLowerCase() === 'vietnammobile',
                  gmb: network.toString().toLowerCase() === 'gmobile'
                }"
              class="network position_absolute"
            >{{ network }}</div>
            <input id="phoneField" type="number" placeholder="Số điện thoại" v-model="user.phone" />
            <span class="text--error"></span>
          </div>
          <div class="text--error">{{ errorText.phone }}</div>
          <div class="font_weight_bold mb_1">Mật khẩu</div>
          <div
            class="form_group position_relative"
            :class="{
                errors: statusClassError.password,
                passed: statusClassPassed.password
              }"
          >
            <div class="icon position_absolute">
              <icon-base
                icon-name="Mật khẩu"
                width="14.782"
                height="18.55"
                viewBox="0 0 14.782 18.55"
              >
                <icon-lock />
              </icon-base>
            </div>
            <input
              id="passwordField"
              type="password"
              placeholder="Mật khẩu"
              v-model="user.password"
            />
            <span class="text--error"></span>
          </div>
          <div class="text--error">{{ errorText.password }}</div>
          <div class="font_weight_bold mb_1">Xác nhận mật khẩu</div>
          <div
            class="form_group position_relative"
            :class="{
                errors: statusClassError.confirmPassword,
                passed: statusClassPassed.confirmPassword
              }"
          >
            <div class="icon position_absolute">
              <icon-base
                icon-name="Mật khẩu"
                width="14.8"
                height="18.604"
                viewBox="0 0 14.8 18.604"
              >
                <icon-lock-check />
              </icon-base>
            </div>
            <input
              id="rePasswordField"
              type="password"
              placeholder="Nhập lại mật khẩu"
              v-model="confirmPassword"
            />
            <span class="text--error"></span>
          </div>
          <div class="text--error">{{ errorText.confirmPassword }}</div>
        </form>
        <!-- Start: Form Body -->
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js">
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
