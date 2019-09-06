<!--<template>
  <div class="ct m_5">
    <div class="mb_2"><strong>This is value: </strong>{{ value }}</div>
    <div class="textarea">
      <autocomplete
        class="input"
        placeholder="Nhập gì ở đây..."
        :maxLength="500"
        :value="value"
        @input="value = $event"
      ></autocomplete>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@/components/autocomplete";

export default {
  components: {
    Autocomplete
  },
  data() {
    return {
      value: "",
    }
  }
}
</script>

<style scoped lang="scss">
.textarea {
  .input {
    font-size: .875rem;
    /*border: 1px solid #e4e4e4;*/
  }
}
</style>-->

<template>
  <div class="container">
    <r-select
      label="title"
      track-by="title"
      v-model="selected"
      :options="options"
      :multiple="true"
      placeholder="Ăn gì chọn đi"
    ></r-select>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selected: "",
      options: [
        { id: '00001', title: "Toản" },
        { id: '00002', title: "Yến" },
        { id: '00003', title: "Khanh" },
        { id: '00004', title: "Khang" }
      ]
    }
  }
}
</script>

<style scoped>
  .container {
    background-color: #27292c;
    width: 100%;
    padding: 1.5rem;
    height: 100vh;
  }
</style>
