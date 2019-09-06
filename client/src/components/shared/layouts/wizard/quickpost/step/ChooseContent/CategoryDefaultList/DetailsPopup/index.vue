<template>
  <div class="modal-popup">
    <div class="popup__container">
      <post-list :postList="postList" :categoryTitle="categoryTitle" />
      <div class="close-popup" @click="toggleViewPostDetails">Đóng</div>
    </div>
  </div>
</template>

<script>
import PostList from "./PostList";

export default {
  props: ["toggleViewPostDetails", "postList", "categoryTitle"],
  components: {
    PostList
  }
};
</script>

<style lang="scss" scoped>
.modal-popup {
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  cursor: default;
}
.popup {
  &__container {
    text-align: center;
    background-color: #2b2c2f;
    margin: 37vh 30%;
    box-shadow: 1px 1px 6px #888;
  }
}

.close-popup {
  padding: 1rem 0rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: #3b3c3d;
  }
}
</style>
