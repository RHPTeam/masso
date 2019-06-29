<template>
  <div class="main--footer campaigns--list-footer">
    <div class="d_flex justify_content_between">
      <div class="">
        Hiển thị {{ campaigns.length }} bản ghi
      </div>
      <div class="campaigns--list-paginate">
        <paginate
          :value="currentPage"
          :pageCount="campaignsPagesSize"
          :clickHandler="goToPage"
          :prev-text="prevText"
          :next-text="nextText"
          :container-class="'pagination'"
          :page-class="'page-item'"
          @input="updateCurrentPage($event)"
        ></paginate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "currentPage", "filterShowSelected", "search" ],
  data() {
    return {
      nextText: "&#x203A;",
      prevText: "&#8249;"
    }
  },
  computed: {
    campaigns() {
      return this.$store.getters.campaigns;
    },
    campaignsPagesSize() {
      return this.$store.getters.campaignsPagesSize;
    }
  },
  methods: {
    async goToPage( page ) {
      if ( this.search.length > 0 ) {
        const dataSender = {
          keyword: this.search,
          size: this.filterShowSelected.id,
          page: page
        };
        await this.$store.dispatch( "getCampaignsByKey", dataSender );

        this.$router.replace( {
          name: "post_campaigns",
          query: {
            search: this.search,
            size: this.filterShowSelected.id,
            page: page
          }
        } );
      } else {
        const dataSender = {
          size: this.filterShowSelected.id,
          page: page
        };
        await this.$store.dispatch( "getCampaignsByPage", dataSender );

        this.$router.replace( {
          name: "post_campaigns",
          query: { size: this.filterShowSelected.id, page: page }
        } );
      }

      this.$parent.$parent.$parent.$parent.$parent.$refs.scroll.$el.scrollTop = 0;
    },
    updateCurrentPage( val ) {
      this.$emit( "updateCurrentPage", val );
    }
  }
}
</script>

<style lang="scss">
  .main--footer.campaigns--list-footer {
    font-size: .875rem;
    .campaigns--list-paginate {
      .pagination {
        margin-bottom: 0;
        li {
          border-radius: 14px;
          height: 30px;
          font-size: 1.5rem;
          margin: 0 0.25rem;
          line-height: 24px;
          a {
            color: #666;
            outline: none;
            text-decoration: none;
          }

          &.disabled {
            opacity: 0.5;
            pointer-events: none;
          }
          &.page-item {
            font-size: 0.875rem;
            line-height: 30px;
            text-align: center;
            transition: all 0.4s ease;
            width: 30px;

            &.disabled {
              opacity: 1;
            }
            &:hover,
            &.active {
              background-color: #ffb94a;
              a {
                color: #fff;
              }
            }
          }
          &:first-child {
            text-align: left;
            width: 20px;
          }
          &:last-child {
            margin-right: 0;
            text-align: right;
            width: 20px;
          }
        }
      }
    }
  }
</style>
