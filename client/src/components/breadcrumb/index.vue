<template>
  <div
    class="main--header text_left d_flex justify_content_start align_items_end"
  >
    <div class="main--header-title">{{ nameBread }}</div>
  </div>
</template>
<script>
export default {
  props: ["nameBread", "subBread"]
};
</script>
<style lang="scss" scoped>
.main--header {
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  .main--header-title {
    font-size: 1.75rem;
    font-weight: 600;
    text-transform: capitalize;
  }
  .main--header-desc {
    font-size: 14px;
    font-weight: normal;
    margin-left: 16px;
    margin-bottom: 5px;
    display: none;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .main--header {
    display: flex !important;
    flex-direction: column !important;
    text-align: left !important;
    .main--header-title {
      width: 100%;
    }
    .main--header-desc {
      width: 100%;
    }
  }
}
</style>
