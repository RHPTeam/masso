<template>
  <div class="add--catagory card_body card mt_2">
    <div class="form_group">
      <label>Tên danh mục</label>
      <input
        type="text"
        class="px_2 py_1 ml_2 form_control"
        placeholder="Nhập tên danh mục ..."
        v-model="cateById.title"
      />
    </div>
    <div class="my_2">Danh mục cha</div>
    <span class="text_danger">Nếu không lựa chọn trong danh mục này thì mặc định danh mục được tạo ở trên là danh mục cha</span>
    <div class="add--chilren">
      <multiselect
        label="title"
        :options="categories"
        placeholder="Lựa chọn danh mục cha"
        v-model="cateById.parent"
      />
    </div>
    <button class="btn btn_info mt_3" @click="updateCategories()">Save</button>
  </div>
</template>

<script>
export default {
  components: {
  },
  computed: {
    categories(){
      console.log(this.$store.getters.getCateAdmin);
      return this.$store.getters.getCateAdmin;
    },
    cateById(){
      return this.$store.getters.categoriesById;
    }
  },
  methods: {

    updateCategories(){
      this.$store.dispatch( "updateCategoriesById", this.cateById );
      this.$router.push( "/admin/help" );
    }
  },
}
</script>

<style scoped>

</style>
