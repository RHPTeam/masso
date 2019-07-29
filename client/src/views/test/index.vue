<template>
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
</style>
