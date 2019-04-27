<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">Xóa chiến dịch</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">Toàn bộ dữ liệu liên quan đến chiến dịch
            <span class="campaign--name">{{ `${campaign.title}` }}</span> sẽ bị xóa hoàn toàn. Nhập
            <span class="text--delete">DELETE</span> để tiếp tục.
          </div>
          <input
            class="modal--body-input mt_3"
            placeholder="DELETE"
            type="text"
            v-model="deleteText"
          />
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit"
            @click="closePopup()"
          >HỦY</button>
          <button
            class="btn--skip"
            v-if="deleteConfirm"
            @click="deleteCampaign()"
          >XÓA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "campaign" ],
  data() {
    return {
      deleteConfirm: false,
      deleteText: ""
    };
  },
  watch: {
    deleteText() {
      this.deleteConfirm = this.deleteText === "DELETE";
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    deleteCampaign() {
      this.$store.dispatch( "deleteCampaign", this.campaign._id );
      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
.modal--wrapper {
  .modal--dialog {
    .modal--content {
      .modal--body {
        .desc {
          line-height: 1.5;
          .campaign--name {
            font-weight: 600;
          }
          .text--delete {
            font-weight: 600;
          }
        }
        &-input {
          font-weight: 600;
        }
      }
    }
  }
}
/* THeme Color */
.modal--wrapper[data-theme="light"] {
  .modal--dialog {
    .modal--content {
      .modal--body {
        .desc {
          .campaign--name {
          }
          .text--delete {
          }
        }
        &-input {
          color: #F96666 !important;
          &:focus {
            border-color: #F96666 !important;
          }
        }
      }
    }
  }
}
.modal--wrapper[data-theme="dark"] {
  .modal--dialog {
    .modal--content {
      .modal--body {
        color: #cccccc;
        .desc {
          .campaign--name {
            color: #f7f7f7;
          }
          .text--delete {
            color: #f7f7f7;
          }
        }
        &-input {
          color: #F96666 !important;
          &:focus {
            border-color: #F96666 !important;
          }
        }
      }
    }
  }
}
</style>

