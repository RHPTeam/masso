<template>
  <div class="main--desc mb_3">
    <div class="desc my_3">
      {{ $t("chat.broadcast.main.scripts.header.desc") }}
    </div>
    <!--Start: Component filter-->
    <app-filter />
    <!--End: Component filter-->

    <!--Start: Component Timer-->
    <app-timer />
    <!--End: Component Timer-->
  </div>
</template>

<script>
import AppFilter from "./components/filter";
import AppTimer from "./components/timer";
export default {
  components: {
    AppFilter,
    AppTimer
  }
};
</script>

<style scoped lang="scss">
/************* CUSTOM CSS COMPONENT ****************/
/**
    * NOTE: U have to code scss with 3 level which mean is 3 indent
     */

.main--desc {
  border-bottom: solid 1px rgba(0, 0, 0, 0.09);
  font-size: .875rem;
  .desc {
    text-align: left;
  }
}

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .main--desc {
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .main--desc {
}
</style>
