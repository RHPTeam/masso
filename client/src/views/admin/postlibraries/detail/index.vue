<template>
  <div class="content">
    <div class="content--body">
      <form role="create-post">
        <div class="form_group">
          <label>Nội dung</label>
          <contenteditable tag="div" :contenteditable="true" placeholder="Bạn cảm thấy nào?" />
        </div>
        <div class="form_group">
          <label>Hình ảnh</label>
          <div class="box photos">
            <div class="box--item"></div>
          </div>
          <div class="action">
            <input type="file" accept="image/x-png,image/gif,image/jpeg" multiple>
          </div>
        </div>
        <div class="form_group">
          <button class="btn btn_success">Lưu bài viết</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
