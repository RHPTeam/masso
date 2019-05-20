<template>
  <div class="blog--help-admin">
    <router-link
      class="mb_2 create--new btn btn_warning"
      tag="button"
      :to="{ name: 'create_blog' }"
      active-class="active"
      exact
    >Create new Blog</router-link>
    <div class="card card_body">
      <div>List Blog</div>
      <div class="list">
        <div class="card_group ml_2">
          <table class="table--list">
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Category</th>
              <th></th>
            </tr>
            <tr v-for="blog in allBlog" :key="blog">
              <td>{{ blog.title }}</td>
              <td>{{ blog.content }}</td>
              <td>asdadasd</td>
              <td>
                <button class="btn btn_warning mb_2 mt_2">Update</button>
                <button class="btn btn_danger mb_2">Delete</button>
              </td>
            </tr>
<!--            <tr v-else></tr>-->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  computed: {
    allBlog() {
      return this.$store.getters.getAllBlog;
    },

  },
  created(){
    this.$store.dispatch("getAllBlogAdmin");
  }
}
</script>

<style scoped lang="scss">
  .create--new{
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
  }
  .table--list{
    width: 100%;
    th, td, tr{
      width: 25%;
      border: 1px solid #ccc;
      padding-left: 10px;
    }
    th{
      text-align: center;
      padding-left: 0;
    }
  }
</style>
