<template>
    <div class="update--blog-admin">
      <div class="card card_body">
        <div class="form_group">
          <div class="form_group">
            <label for="">Chon danh muc de tao bai viet</label>
            <multiselect
              label="title"
              placeholder="Lựa chọn danh mục de tao bai viet"
            />
          </div>
          <div class="form_group mb_2">
            <label for="">Title Post</label>
            <input type="text" placeholder="Title post" class="px_2 py_1 ml_2 form_control" v-model="allBlogAdmin.title">
          </div>
          <div class="from_group mb_2">
            <label for="">Content Post</label>
            <textarea name="descriptionPost" id="" v-model="allBlogAdmin.content" placeholder="Content Post" class="px_2 py_1 ml_2 form_control" style="max-height: 450px"></textarea>
          </div>
          <button @click="createBlogHelpAdmin" class="btn btn_success">Save</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    createBlogHelpAdmin(){

    }
  }
}
</script>

<style scoped>

</style>
