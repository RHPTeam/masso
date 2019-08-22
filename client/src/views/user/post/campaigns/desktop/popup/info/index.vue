<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <!-- Start: Header -->
        <div class="modal--header"></div>
        <!-- Start: body -->
        <div class="modal--body px_3 py_4">
          <div class="loading--block mt_4 mb_4">
            <div class="desc text_center mb_2">Vui lòng chờ, trạng thái đang được cập nhật ...</div>
            <div class="mx_auto">
              <div class="loading--bar position_relative mx_auto">
                <div class="percent position_absolute"></div>
              </div>
              <div class="mt_2 d_flex info mx_auto">
                Số sự kiện đang cập nhật:
                <div class="pl_2">
                  <span>1</span> / <span>10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Start: footer -->
        <div class="modal--footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  font-family: "Open Sans", sans-serif;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: +11;
  .modal--dialog {
    width: 100%;
    height: 100%;
  }
  .modal--content {
    width: 440px;
    border-radius: 10px;
  }
  .modal--body {
    .info {
      font-size: 0.7315rem;
      color: #ccc;
      width: 320px;
    }
  }
}
.loading--block {
  .desc {
    color: #ccc;
    font-size: 0.875rem;
  }
  .loading--bar {
    background-color: transparent;
    border: 1px solid #444;
    border-radius: 8px;
    height: 16px;
    overflow: hidden;
    width: 320px;
    .percent {
      background-color: rgb(88, 206, 65);
      background-size: 16px 16px;
      height: 100%;
      width: 40%;
      animation: animate 1.2s linear infinite;
    }
    @keyframes animate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(200%);
      }
    }
  }
}

/* ChangeColor */

// Light
.modal--wrapper[data-theme="light"] {
  color: #444444;
  .modal--header {
    color: #fff;
  }
  .modal--content {
    background-color: #fff;
    textarea {
      color: #444444;
      background-color: #f7f7f7;
      &::placeholder {
        color: #cccccc;
      }
    }
    .modal--body {
      .error--desc {
        color: #444;
      }
    }
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
}

//Dark
.modal--wrapper[data-theme="dark"] {
  color: #f7f7f7;
  .modal--header {
    color: #27292d;
  }
  .modal--content {
    background-color: #27292d;
    textarea {
      color: #f7f7f7;
      background-color: #2f3136;
      &::placeholder {
        color: #666;
      }
    }
    .modal--body {
      .error--desc {
        color: #f7f7f7;
      }
    }
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #2f3136;
        }
      }
    }
  }
}
</style>
