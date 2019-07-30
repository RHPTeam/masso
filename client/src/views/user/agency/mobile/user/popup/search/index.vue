<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center p_3">
        <div class="list--input d_flex justify_content_between align_items_center">
          <span class="ml_3 mt_1">
            <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
              <icon-input-search />
            </icon-base>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
        <div class="cancel ml_auto">Hủy</div>
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Main -->
      <div class="items--body px_3">

      </div>
      <!-- End: Main -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    }
  },
  methods: {
    
  },
};
</script>

<style scoped>
</style>