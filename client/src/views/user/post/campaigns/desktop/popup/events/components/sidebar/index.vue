<template>
  <div class="sidebar pl_3">
    <div class="list--group">
      <div class="title mb_2">Thêm vào sự kiện</div>
      <div class="list--group-item d_flex align_items_center">
        <icon-base
          class="mr_2"
          height="14px"
          width="14px"
          viewBox="0 0 20 20"
        >
          <icon-user></icon-user>
        </icon-base>
        <div class="name">Nội dung nâng cao</div>
      </div>
      <div class="list--group-item d_flex align_items_center mt_2">
        <icon-base
          class="mr_2"
          height="14px"
          width="14px"
          viewBox="0 0 20 20"
        >
          <icon-user></icon-user>
        </icon-base>
        <div class="name">Nội dung nâng cao</div>
      </div>
    </div>
    <div class="list--group mt_4">
      <div class="title mb_2">Thêm vào sự kiện</div>
      <div class="list--group-item d_flex align_items_center">
        <icon-base
          class="mr_2"
          height="14px"
          width="14px"
          viewBox="0 0 20 20"
        >
          <icon-user></icon-user>
        </icon-base>
        <div class="name">Nội dung nâng cao</div>
      </div>
      <div class="list--group-item d_flex align_items_center mt_2">
        <icon-base
          class="mr_2"
          height="14px"
          width="14px"
          viewBox="0 0 20 20"
        >
          <icon-user></icon-user>
        </icon-base>
        <div class="name">Nội dung nâng cao</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
.sidebar {
  .list--group {
    .title {
      font-size: .825rem;
      text-transform: uppercase;
    }
    &-item {
      background-color: #2f3136;
      border-radius: .5rem;
      cursor: pointer;
      font-size: .825rem;
      padding: .375rem .75rem;
      &:hover {
        background-color: #3b3e43;
      }
    }
  }
}
</style>
