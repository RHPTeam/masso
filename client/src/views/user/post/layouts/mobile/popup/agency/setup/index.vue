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
        <div class="item m_auto text_center">Thiết lập thông tin</div>
        <div class="mr_2" @click="updateAgencyInfo">Xong</div>
      </div>
      <!-- End: Header -->
      <!-- Start: Form Body -->
      <div class="items--body px_3">
        <label>Sub Domain:</label>
        <div class="error my_1" v-if="isShowAlert === true">Vui lòng nhập tên Domain</div>
        <input
          type="text"
          class="form_control"
          placeholder="example.zinbee.vn"
          v-model="agency.subDomain"
        />
      </div>
      <!-- Start: Form Body -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowAlert: false
    };
  },
  computed: {
    agency() {
      return this.$store.getters.agency;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    updateAgencyInfo() {
      if (this.agency.subDomain.length === 0) {
        this.isShowAlert = true;
      } else {
        this.closePopup();
        this.$store.dispatch("updateAgencyInfo", {
          domain: this.agency.subDomain
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--search-mobile {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  z-index: 10;

  .modal--content {
    font-size: 0.875rem;

    .items--header {
      padding: 0.625rem 0;
      border-bottom: 1px solid #484848;

      .arrow-down {
        transform: rotate(90deg);
        margin-left: 0.5rem;
      }

      .name--modal {
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 50%;
        outline: none;
      }

      .active {
        color: #e62b33;
      }
    }
    .items--body {
      .error {
        color: #e62b33;
      }
      input {
        background-color: #27292d;
        border-color: #27292d;
        color: #ccc;
        &:hover,
        &:focus,
        &:active,
        &:visited {
          box-shadow: none;
          outline: 0;
          border-color: #27292d;
        }
      }
    }
  }
}
</style>
