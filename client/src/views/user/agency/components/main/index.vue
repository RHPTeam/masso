<template>
  <div class="main">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--name px_2">
          Tên thành viên
      </div>
      <div class="col col--category px_2">Email</div>
      <div class="col col--category px_2">Số điện thoại</div>
      <div class="col col--category px_2 text_center">Loại kích hoạt</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <div>
      <div v-if="!agency">Không có dữ liệu</div>
      <app-item
        v-else
        v-for="(member, index) in agency"
        :key="index"
        :member="member"
        @openEdit="openPopupEditInfoMember($event)"
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
      return this.$store.getters.memberAgency;
    }
  },
  async created(){
    const agencies = this.$store.getters.memberAgency;
    if(agencies && agencies.length === 0) {
      await this.$store.dispatch("getInfoAgency");
    }
  },
  methods: {
    openPopupEditInfoMember(val) {
      this.$emit("openPopupEdit", val);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
