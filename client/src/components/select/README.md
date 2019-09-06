# Vue-Select RHP Team

## Documentation

Vue-Select RHP Team get inspired of Vue-Mutiselect. So If you want use deep level, please visit bellow links. Complete documentation and examples available at https://vue-multiselect.js.org/.

## Features & characteristics:
* NO dependencies
* Single select
* Multiple select
* Tagging
* Dropdowns
* Filtering
* Search with suggestions
* Logic split into mixins
* Basic component and support for custom components
* V-model support
* Vuex support
* Async options support
* \> 95% test coverage
* Fully configurable (see props list below)

## Breaking changes:
* Instead of Vue.partial for custom option templates you can use a custom render function.
* The `:key` props has changed to `:track-by`, due to conflicts with Vue 2.0.
* Support for `v-model`
* `@update` has changed to `@input` to also work with v-model
* `:selected` has changed to `:value` for the same reason
* Browserify users: if you wish to import `.vue` files, please add `vueify` transform.

## Basic usage
This component is registered in the global scope.

```vue
<template>
  <div>
    <select
      v-model="selected"
      :options="options">
    </select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selected: null,
        options: ['watermelon', 'coconut', 'apple']
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
```

## JSFiddle

[Example JSFiddle](https://jsfiddle.net/shentao/s0ugwmjp/) – Use this for issue reproduction.

## Examples
in jade-lang/pug-lang

### Single select / dropdown
``` jade
multiselect(
  :value="value",
  :options="source",
  :searchable="false",
  :close-on-select="false",
  :allow-empty="false",
  @input="updateSelected",
  label="name",
  placeholder="Select one",
  track-by="name"
)
```

### Single select with search
``` jade
multiselect(
  v-model="value",
  :options="source",
  :close-on-select="true",
  :clear-on-select="false",
  placeholder="Select one",
  label="name",
  track-by="name"
)
```

### Multiple select with search
``` jade
multiselect(
  v-model="multiValue",
  :options="source",
  :multiple="true",
  :close-on-select="true",
  placeholder="Pick some",
  label="name",
  track-by="name"
)
```

### Tagging
with `@tag` event
``` jade
multiselect(
  v-model="taggingSelected",
  :options="taggingOptions",
  :multiple="true",
  :taggable="true",
  @tag="addTag",
  tag-placeholder="Add this as new tag",
  placeholder="Type to search or add tag",
  label="name",
  track-by="code"
)
```

``` javascript

addTag (newTag) {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
  }
  this.taggingOptions.push(tag)
  this.taggingSelected.push(tag)
},
```

### Asynchronous dropdown
``` jade
multiselect(
  v-model="selectedCountries",
  :options="countries",
  :multiple="multiple",
  :searchable="searchable",
  @search-change="asyncFind",
  placeholder="Type to search",
  label="name"
  track-by="code"
)
  span(slot="noResult").
    Oops! No elements found. Consider changing the search query.
```

``` javascript
methods: {
  asyncFind (query) {
    this.countries = findService(query)
  }
}
```

