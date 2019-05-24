<template>
  <div class="libraries" :data-theme="currentTheme">
    <div class="libraries--desc">Thư viện</div>
    <div class="gallery">
      <div class="gallery--item"
           v-for="(item, index) in imageList"
           :key="index"
      >
        <img
          :src="item.valueContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        },
        {
          valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
          text: "hello"
        }
      ]
    }
  },

}
</script>

<style lang="scss" scoped>
  .libraries {
    padding: 20px;
    .libraries--desc {
      font-size: 12px;
      margin-top: -5px;
      margin-bottom: 20px;
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5px;
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        border-radius: 3px;
      }
    }
  }
  /* ChangeColor */
  // Light
  .libraries[data-theme="light"] {
    .libraries--desc {
      color: #999;
    }
  }

  //Dark
  .libraries[data-theme="dark"] {
    .libraries--desc {
      color: #ccc;
    }
  }
</style>
