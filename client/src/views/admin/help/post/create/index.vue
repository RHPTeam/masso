<template>
  <!--  Start: Create nwe post category-->
  <div class="card card_body">
    <div class="form_group">
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
        content: ""
      }
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
    createBlogHelpAdmin() {
      const createBlog = {
        title: this.allBlog.title,
        content: this.allBlog.content
      };
      this.$store.dispatch("createBlogHelpAdmin", createBlog);
      this.$router.push("/admin/help/help-blogs");
    }
  }
}
</script>

<style scoped>

</style>
