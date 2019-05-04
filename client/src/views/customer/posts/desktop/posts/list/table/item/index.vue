<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
      <div class="col col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox" checked />
        </label>
      </div>
      <div class="col col--name px_2">
        <div class="col col--name-text">
          {{ item.title }}
        </div>
      </div>
      <div class="col col--category px_2">Mỹ phẩm</div>
      <div class="col col--content px_2">
        <div class="col--content-text">
          {{ item.content }}
        </div>
      </div>
      <div class="col col--image px_2">
        <div class="d_flex align_items_center justify_content_start">
          <div class="image--wrap position_relative mr_2">
            <img
              src="https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1279387-847__1&recipeName=350"
              alt
            />
          </div>
          <div class="image--wrap position_relative mr_2">
            <img
              src="https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg"
              alt
            />
          </div>
          <div class="image--wrap position_relative mr_2">
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
              alt
            />
          </div>
          <div class="image--wrap position_relative">
            <div
              class="image--wrap-more d_flex align_items_center justify_content_center"
            >
              +2
            </div>
          </div>
        </div>
      </div>
      <div class="col col--action px_4 text_center">
        <span class="mx_1" @click="updatePost">
          <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </span>
        <span class="mx_1">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </span>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    updatePost() {
      // this.$store.dispatch( "updatePost" );
      this.$router.push( {
        name: "update_post",
        params: { id: this.item._id }
      } );
    }
  }
}
</script>

<style lang="scss" scoped>
  .post--data {
  font-size: 0.875rem;
  .item--header {
    background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #666666;
    font-weight: 600;
    height: 48px;
  }
  .item--body {
    background-color: #fafafa;
    min-height: 48px;
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .col--checkbox {
    height: 20px;
    width: calc(20px + 1rem);
  }
  .col--name {
    width: calc(40% - 140px - 3.5rem);
  }
  .col--category {
    width: 14%;
  }
  .col--content {
    width: calc(46% - 140px - 3.5rem);
    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .col--image {
    width: calc(185px + 3rem);
  }
  .col--action {
    width: calc(75px + 3rem);
    svg {
      color: #999;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        color: #ffb94a;
      }
    }
  }

  .image--wrap {
    border-radius: 5px;
    overflow: hidden;
    width: 40px;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &-more,
    img {
      position: absolute;
      width: 100%;
    }
    img {
      height: auto;
      left: 50%;
      max-width: none;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &-more {
      background-color: #e4e4e4;
      color: #999999;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
}
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

// RESPONSIVE
@media only screen and (max-width: 1366px) {
  .post--data {
    .col--name {
      width: calc(82% - 280px - 3rem);
    }
    .col--category {
      width: 18%;
    }
    .col--content {
      display: none;
    }
    .col--image {
      width: calc(185px + 1rem);
      padding: 0 0.5rem !important;
    }
    .col--action {
      width: calc(75px + 1rem);
      padding: 0 0.5rem !important;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .post--data {
    .col--name {
      width: calc(100% - 250px - 2rem);
    }
    .col--category {
      width: 155px;
    }
    .col--image {
      display: none;
    }
  }
}
@media only screen and (max-width: 992px) {
  .post--data {
    .col--name {
      width: calc(100% - 95px - 2rem);
    }
    .col--category {
      display: none !important;
    }
  }
}

// CHANGE BACKGROUND COLOR THEME

//LIGHT

.post--data[data-theme="light"] {
  .item--header {
    background-color: #fff;
  }
  .item--body {
    background-color: #fafafa;
  }
  .image--wrap-more {
    background-color: #e4e4e4;
    color: #999999;
  }
}

//DARK

.post--data[data-theme="dark"] {
  .item--header {
    background-color: #27292d;
    color: #cccccc;
  }
  .item--body {
    background-color: #27292c;
    color: #999999;
  }
  .image--wrap-more {
    background-color: #2f3136;
    color: #999999;
  }
}
</style>
