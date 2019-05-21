<template>
    <div class="update--blog-admin">
      <div class="card card_body">
        <div class="form_group">
          <div class="form_group">
            <label for="">Chon danh muc de update</label>
            <multiselect
              label="title"
              placeholder="Lựa chọn danh mục de update"
              :options="getCateAdmin"
              v-model="getAllToUpdate._helpCategory"
            />
          </div>
          <div class="form_group mb_2">
            <label for="">Title Post</label>
            <input type="text" placeholder="Title post" class="px_2 py_1 ml_2 form_control" v-model="getAllToUpdate.title">
          </div>
          <div class="from_group mb_2">
            <label for="">Content Post</label>
            <textarea name="descriptionPost" id="" placeholder="Content Post" class="px_2 py_1 ml_2 form_control" style="max-height: 450px" v-model="getAllToUpdate.content"></textarea>
          </div>
          <button class="btn btn_success" @click="updateBlogById">Save</button>
          <div> {{ getAllToUpdate }} </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      AllToUpdate: {
        title: "",
        content: "",
        _helpCategory: ""
      }
    }
  },
  computed: {
    getAllToUpdate(){
      console.log(this.$store.getters.getBlogHelpById);
      return this.$store.getters.getBlogHelpById;
    },
    getCateAdmin(){
      return this.$store.getters.getCateAdmin;
    },

  },
  methods: {
    async updateBlogById(){
      await this.$store.dispatch( "updateBlogHelp", this.getAllToUpdate );
      this.$router.push( {
        name: "help_blogs"
      } );
    }
  }
}
</script>

<style scoped>

</style>
