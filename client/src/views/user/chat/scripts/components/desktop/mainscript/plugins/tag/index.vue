<template>
  <div class="card card_body script--body-tag mt_3" :data-theme="currentTheme">
    <div class="script--body-tag-title">
      <span class="script--body-tag-icon">
        <icon-base class="icon-tag" width="15" height="16" viewBox="0 0 337.7 487.85">
          <icon-tag/>
        </icon-base>
      </span>
      <span>Thuộc tính người dùng</span>
      <div class="ml_auto">
        <div @click="isDeleteItemBlock = true">
          <icon-base icon-name="remove" width="18" height="18" viewBox="0 0 18 18">
            <icon-remove/>
          </icon-base>
        </div>
      </div>
    </div>
    <div class="script--body-tag-description">
      Đặt giá trị cho thuộc tính người dùng hiện có hoặc thêm thuộc tính mới. Sử
      dụng nhóm chiến dịch để gửi, kịch bản để xác định phân tích hoạt động của
      người dùng. Lưu ý rằng bạn có thể sử dụng các biểu thức và thuộc tính số
      học trong trường Giá trị.
    </div>
    <div class="script--body-tag-list">
      <div class="script--body-tag-edit-title d_flex">
        <span>Tên thẻ</span>
        <span>Giá trị</span>
      </div>
      <div class="script--body-tag-item d_flex align_items_center position_relative mb_2">
        <div class="tag--created position_relative">
          <contenteditable
            class="tag--created-item"
            tag="div"
            placeholder="Nhập tên..."
            v-model="ATTRIBUTE"
            :contenteditable="true"
          />
        </div>
        <div class="tag--created position_relative">
          <contenteditable
            class="tag--created-item"
            tag="div"
            placeholder="Gia tri..."
            :contenteditable="true"
            v-model="VALUE"
          />
        </div>
        <div class="tag--icon-delete d_flex align_items_center position_absolute">
          <icon-base
              icon-name="delete"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            >
              <icon-remove />
            </icon-base>
        </div>
      </div>
      <div class="script--body--tag-item d_flex">
        <div class="describle">Bạn có thể chọn một trong các thuộc tính hiện có hoặc tạo một thuộc tính mới.</div>
        <div class="describle">Đặt bất kỳ giá trị hoặc xóa thuộc tính người dùng bằng tùy chọn.</div>
      </div>
      <div class="script--body-tag-footer">
        <div class="script--body-tag-add">
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus/>
            </icon-base>
          </span>
          <span>Thêm thẻ</span>
        </div>
      </div>
    </div>
    <!-- Hidden screen > 1024px and Block < 1024px-->
    <div class="hidden--tag">
      <div class="">
        <div class="mb_2">
          <div class="name">Tên thẻ</div>
          <div class="tag--created">
            <contenteditable
              class="tag--created-item"
              tag="div"
              placeholder="Gia tri..."
              :contenteditable="true"
              v-model="VALUE"
            />
          </div>
          <div class="">
            <div class="describle">Bạn có thể chọn một trong các thuộc tính hiện có hoặc tạo một thuộc tính mới.</div>            
          </div>
        </div>
        <div class="mb_2">
          <div class="name">Giá trị</div>
          <div class="tag--created position_relative">
            <contenteditable
              class="tag--created-item"
              tag="div"
              placeholder="Nhập tên..."
              v-model="ATTRIBUTE"
              :contenteditable="true"
            />
          </div>
          <div class="">
            <div class="describle">Đặt bất kỳ giá trị hoặc xóa thuộc tính người dùng bằng tùy chọn.</div>            
          </div>
        </div>
        <div class="tag--icon-delete d_flex">
          <icon-base
              icon-name="delete"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            >
              <icon-remove />
            </icon-base>
        </div>
      </div>
      <div class="script--body-tag-footer">
        <div class="script--body-tag-add">
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus/>
            </icon-base>
          </span>
          <span>Thêm thẻ</span>
        </div>
      </div>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Property"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteProperty"
          typeName="Property"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>
<script>
import ItemTag from "../item";
import DeleteCampaignPopup from "@/components/popups/delete";
export default {
  props: {
    arrValue: Array,
    content: Object,
    item: Object
  },
  data() {
    return {
      isShowAddAttribute: false,
      isDeleteItemBlock: false,
      ATTRIBUTE: "AAAAAAA",
      VALUE: "BBBBBBBb"
    };
  },
  async created() {},
  computed: {
    // block() {
    //   return this.$store.getters.block;
    // },
    // listAttr() {
    //   // get value text of item
    //   return this.item.valueText.split(",");
    // }   
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    // addAttributeInItemBlock(id) {
    //   const dataSender = {
    //     block: this.$store.getters.block,
    //     itemId: id
    //   };
    //   this.$store.dispatch("updateItemAttrBlock", dataSender);
    // }
  },
  components: {
    ItemTag,
    DeleteCampaignPopup
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
.script--body-tag{
  border-radius: 10px;
  background: #fff;
  transition: 0.3s;
  &-title{
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #000000ed;
    svg{
      cursor: pointer;
    }
  }
}





//  ************************* CHANGE THEME *************************
.hidden--tag{
  display: none;
}
.script--body-tag[data-theme="light"]{
  .tag--created .tag--created-item{
    color: #666;
  }
  .describle{
    color: #666;
  }
  &:hover{
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.11), 0 1px 0 0 rgba(0, 0, 0, 0.08);
  }
}

.script--body-tag[data-theme="dark"]{
  .tag--created .tag--created-item{
    color: #fff;
  }
  &-item{
    .describle{
      color: #f0f0f0;
    }
  }
  &:hover{
    border: 1px solid $border_radius;
    box-shadow: 0;
  }
}
.hidden--tag{
  display: none;
  .name{
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .tag--created{
    background: #fff;
    font-size: 1rem;
    border: 1px solid #ccc;
    transition: 0.3s;
    border-radius: 10px;
    padding: 6px 10px;
    margin-bottom: 5px;
    .tag--created-item{
      outline: none;
    }
  }
}


@media only screen and (max-width: 1024px) and (min-width: 768px){
  .script--body-tag-list{
    display: none;
  }.hidden--tag{
      display: block;
    }
}
</style>