<template>
  <div class="main">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--name px_2">
          Tên thành viên
      </div>
      <div class="col col--category px_2">Email</div>
      <div class="col col--category px_2">Số điện thoại</div>
      <div class="col col--category px_2">Loại kích hoạt</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <div>
      <div v-if="!agency">Không có dữ liệu</div>
      <app-item
        v-else
        v-for="(member, index) in agency.customer.listOfUser"
        :key="index"
        :member="member"
      />
    </div>
  </div>
</template>

<script>
import AppItem from "./components/item";
export default {
  components: {
    AppItem
  },
  computed: {
    agency(){
      return this.$store.getters.agency;
    }
  },
  async created(){
    await this.$store.dispatch("getInfoAgency");
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
