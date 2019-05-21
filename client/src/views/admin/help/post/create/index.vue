<template>
  <!--  Start: Create nwe post category-->
  <div class="create--blog-admin card card_body">
    <div class="form_group">
      <div class="form_group">
        <label for="">Chon danh muc de tao bai viet</label>
        <multiselect
          label="title"
          placeholder="Lựa chọn danh mục de tao bai viet"
          :options="getCateAdmin"
          @input="getTitleParent"
        />
      </div>
      <div class="form_group mb_2">
        <label for="">Title Post</label>
        <input type="text" placeholder="Title post" class="px_2 py_1 ml_2 form_control" v-model="allBlog.title">
      </div>
      <div class="from_group mb_2">
        <label for="">Content Post</label>
        <textarea name="descriptionPost" id="" v-model="allBlog.content" placeholder="Content Post" class="px_2 py_1 ml_2 form_control" style="max-height: 450px"></textarea>
      </div>
      <button @click="createBlogHelpAdmin" class="btn btn_success">Save</button>
    </div>
  </div>
  <!--  End: Create nwe post category-->
</template>

<script>
export default {
  data(){
    return{
      allBlog: {
        title: "",
        content: "",
        _helpCategory: ""
      }
    }
  },
  computed: {
    getCateAdmin(){
      return this.$store.getters.getCateAdmin;
    }
  },
  async created() {
    await this.$store.dispatch("getAllCategoriesAdmin");
  },
  methods: {
    createBlogHelpAdmin() {
      const createBlog = {
        title: this.allBlog.title,
        content: this.allBlog.content,
        _helpCategory: this.allBlog._helpCategory
      };
      this.$store.dispatch("createBlogHelpAdmin", createBlog);
      this.$router.push("/admin/help/help-blogs");
    },
    getTitleParent(val){
      this.allBlog._helpCategory = val._id;
    },
  }
}
</script>

<style scoped>

</style>
