<template>
  <div id="app">
    <div class="r_scrollbar scroll--area" ref="scroll">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  watch:{
    $route (to, from){
      this.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .scroll--area {
    position: relative;
    height: 100vh;
    overflow-y: scroll;
  }
}
// RESPONSIVE
@media screen and (max-width: 767px) {
  #app {    
    .ps>.ps__scrollbar-y-rail>.ps__scrollbar-y, .ps>.ps__scrollbar-x-rail>.ps__scrollbar-x, .ps:hover>.ps__scrollbar-y-rail:hover, .ps.ps--active-x>.ps__scrollbar-x-rail, .ps.ps--active-y>.ps__scrollbar-y-rail {
      display: none;
    }
  }
}

/* Scroll bar customize
----------------------------------------------------- */
.r_scrollbar::-webkit-scrollbar {
  width: 6px;
  background-color: #2f3136;
  opacity: 0;
}

.r_scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  transition: background-color .2s linear, height .2s ease-in-out;
  -webkit-transition: background-color .2s linear, height .2s ease-in-out;
  height: 6px;
  bottom: 2px;
  position: absolute;
}

.r_scrollbar::-webkit-scrollbar-track {
  display: none;
  opacity: 0;
  transition: background-color .2s linear, opacity .2s linear;
  -webkit-transition: background-color .2s linear, opacity .2s linear;
  width: 15px;
  /* there must be 'right' or 'left' for ps__rail-y */
  right: 0;
  /* please don't change 'position' */
  position: absolute;
}
</style>
