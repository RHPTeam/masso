<template>
  <div class="main m_3 p_3" :data-theme="themeName">
    <div class="null--container d_flex">
      <span class="null--image mr_3 mt_2">
        <img :src="nullImage" alt="Null Image" />
      </span>
      <div class="null--text">
        {{ $t("chat.broadcast.main.default.title") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nullImage: require("@/assets/images/broadcast_null.png")
    };
  },
  computed: {
    themeName() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
/************* CUSTOM CSS COMPONENT ****************/
/**
  * NOTE: U have to code scss with 3 level which mean is 3 indent
   */
.main {
  border-radius: .625rem;
  .null--container {
    font-size: .875rem;
    padding: 2rem;
    margin: 0 auto;
    position: relative;

    .null--image {
      img {
        height: 48px;
        width: 48px;
      }
    }

  }
  .null--text {
    line-height: 2;
    text-align: left;
    color: #fff;
  }
}

/************* CUSTOM CSS THEME ****************/
/******** 01. Theme Light *********/
div[data-theme="light"] {
  background-color: #fafafa;
  .null--container {
    color: #fff;
  }
  .null--text{
    color: #666;
  }
}

/******** 02. Theme Dark *********/
div[data-theme="dark"] {
  background-color: rgba(39, 41, 44, 0.41);
  .null--container {
  }
  .null--text{
    color: #fff;
  }
}
@media only screen and (max-width: 1240px) and (min-width: 768px) { 
  .null--container{
    padding: 15px;
    width: 100%!important;
  }
}
@media screen and (max-width: 919px) { 
  .null--container{
    padding: 15px;
    flex-direction: column;
    .null--image{
      text-align: center;
    }
  }
}
</style>
