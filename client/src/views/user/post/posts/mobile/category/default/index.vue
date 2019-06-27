<template>
  <div class="category--data mt_3" :data-theme="currentTheme">
    <div class="wrapper">
      <!-- <div class="item--header d_flex align_items_center py_2">
        <div class="col col--category pl_3 pr_2">Tên danh mục</div>
        <div class="col col--posts text_center pr_3">Số bài viết</div>
      </div> -->
      <!-- <div class="loading--block mt_3" v-if="this.$store.getters.statusCategories === 'loading'">
        <loading-component></loading-component>
      </div> -->
      <VuePerfectScrollbar class="list--category-default">
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="item--body d_flex align_items_center">
          <div class="col col--category pl_3 pr_2">Chưa loại</div>
          <div class="col col--posts text_center">3</div>          
          <div class="action d_none align_items_center">
            <span class="mx_1">
              <icon-base
                icon-name="Xóa"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </span>
            <span class="mx_1">
              <icon-base
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
            </span>
          </div>
        </div>
      </VuePerfectScrollbar>
    </div>

    
    <!--*********** POPUP *************-->
    <transition name="popup">
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
