<template>
  <div>
    <div class="add--catagory">
      <router-link
        class="mr_3 add--catagory p_2 mr_2"
        tag="span"
        :to="{ name: 'add_catagory' }"
        active-class="active"
        exact
      >Thêm danh mục</router-link>
    </div>
    <div class="card card_body mt_2">
      <ol class="origin px_2 m_0" type="1">
        <li>
          <div>
            <h3 class="parent">Parents</h3>
            <div class="pl_3">
              <h3 class="children">Children</h3>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  actions: {

  }
}
</script>

<style scoped lang="scss">
  .add--catagory {
    border-radius: 20px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    background: $mainBrandColor;
    color: $color-dark;
  }
  .parent{
    font-size: 16px;
  }
  .children{
    font-size: 14px;
  }
</style>
