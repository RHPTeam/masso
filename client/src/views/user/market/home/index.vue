<template>
  <div class="main--content ct_f">
    <!-- Start: Search -->
    <div class="p_4 search d_flex align_content_center justify_content_center ">
      <div class="d_flex flex_column text_center">
        <span class="p_2">100 Bài Post và Campaign với giá chỉ từ 10.000 VND</span>
        <span class="p_2"> Các bài mẫu Post và Campaign bán hàng được dựng sẵn. Giúp bạn tiết kiệm thời gian và bán hàng hiệu quả hơn.</span>
        <!--<div class="p_2">-->
          <!--<input type="text">-->
          <!--<button type="button">search</button>-->
        <!--</div>-->
        <div class="form_group d_flex align_content_center justify_content_center p_2">
          <input
            type="text"
            class="form_control"
            placeholder="Nhập tên Post/Campaign mà bạn tìm kiếm"
          />
            <button class="p_2" type="button">Search</button>
        </div>
      </div>
    </div>
    <!-- End: Search -->

    <!-- Start: Option Tab -->
    <div class="option--tab p_4">
      <div class="p_4 d_flex align_content_center justify_content_center">
        <div @click="isShowDefault = true">
          <h1>Post</h1>
        </div>
        <div @click="isShowDefault = false">
          <h1>Campaign</h1>
        </div>
      </div>
      <div class="option">

        <!-- Post -->
        <div v-if="isShowDefault === true">
          <div class="r p_4">
            <div class="c_4">
              <div class="d_flex flex_column">
                <div>
                  <img src="https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MzAvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzExMTA1NzIxNTkuanBn" alt="">
                </div>
                <div class="d_flex flex_column">
                  <div>
                    <h3>Mẫu post auto 100 đơn/ngày</h3>
                  </div>
                  <div>
                    <div class="r">
                      <div class="c">
                        <div>10.000 VND</div>
                        <div>10 sales</div>
                      </div>
                      <div>
                        thumbnail
                      </div>
                      <div>
                        <button>preview</button>
                      </div>
                      <div>
                        <button>cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
          </div>
          <div class="r p_4">
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
          </div>
          <div class="r p_4">
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Post
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign -->
        <div v-if="isShowDefault === false">
          <div class="r p_4">
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
          </div>
          <div class="r p_4">
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
          </div>
          <div class="r p_4">
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
            <div class="c_4">
              <div class="card">
                Campaign
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End: Search -->

    <!-- Start: Highlight -->
    <div class=" highlight p_4">
      <h1 class="d_flex align_content_center justify_content_center">Highlight</h1>
      <div class="r p_4">
        <div class="c_4">
          <div class="card">
            Post
          </div>
        </div>
        <div class="c_4">
          <div class="card">
            Post
          </div>
        </div>
        <div class="c_4">
          <div class="card">
            Post
          </div>
        </div>
      </div>
    </div>
    <!-- End: Highlight -->
    <!-- Start: Join Us -->
    <div class="join--us p_4 d_flex align_content_center justify_content_center">
      <div class="d_flex flex_column">
        <h1 class="text_center">Join Us</h1>
        <span class="p_4">Community is the heart of Envato! Jump on our busy online forums where experts share their knowledge and you can get help from fellow </span>
        <button type="button">Bắt Đầu</button>
      </div>
    </div>
    <!-- End: Join Us -->
  </div>

</template>
<script>
  export default {
    data() {
      return {
        isShowDefault: true
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
