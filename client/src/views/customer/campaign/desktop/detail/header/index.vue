<template>
	<div class="main--header">
		<!-- Start: Header Top -->
    <div class="r main--header-top">
			<div class="c_md_6 top--left">
        <div class="title">Chiến dịch bán hàng tháng 4</div>
      </div>
			<div class="c_md_6 top--right">
        <div class="time--duration">
          23/03/2019 - 23/03/2019
        </div>
      </div>
		</div>
    <!-- End: Header Top -->
		<!-- Start: Header Action -->
    <div class="r main--header-action my_3">
			<div class="c_md_6 action--left d_flex align_items_center">
				<div class="new--event mr_3">
					<button class="btn btn--add">Thêm sự kiện</button>
				</div>
				<div class="campaing--status d_flex align_items_center">
					<div class="status--name mr_2">
            Đang hoạt động
          </div>
          <toggle-switch
            @change="toggled = $event.value"
            :value="false"
            :sync="true"
          />
				</div>
			</div>
			<div class="c_md_6 acion--right">
				<div class="btn--group">
          <button 
            class="btn btn--custom"
            :class="[view === 'month' ? 'view--active' : '']" 
            @click="updateCalendarView('month')"
          >Tháng</button>
          <button 
            class="btn btn--custom"
            :class="[view === 'week' ? 'view--active' : '']" 
            @click="updateCalendarView('week')"
          >Tuần</button>
          <button 
            class="btn btn--custom"
            :class="[view === 'day' ? 'view--active' : '']"
            @click="updateCalendarView('day')"
          >Ngày</button>
          <button 
            class="btn btn--custom"
            :class="[view === 'list' ? 'view--active' : '']" 
            @click="updateCalendarView('list')"
          >Danh sách</button>
        </div>
			</div>
      <!-- End: Header Action -->
		</div>
	</div>
</template>

<script>
export default {
  props: ["view"],
	methods: {
		updateCalendarView(val) {
			this.$emit("updateCalendarView", val);
		}
	}
}
</script>

<style lang="scss" scoped>
.main--header {
  color: #444;
  .main--header-top {
    .top--left {
      .title {
        font-weight: 600;
      }
    }
    .top--right {
      font-size: .875rem;
      text-align: right;
    }
  }
  .main--header-action {
    font-size: .875rem;
    .action--left {
      .new--event {
        .btn--add {
          background-color: #FFB94A;
          border-radius: .5rem;
          color: #fff;
          font-size: .875rem;
          font-weight: 600;
        }
      }
    }
    .acion--right {
      text-align: right;
      .btn--custom {
        border: 1px solid #e4e4e4;
        border-radius: 0;
        color: #cccccc;
        font-size: .875rem;
        margin-left: -1px;
        transition: all .4 ease;
        &:first-child {
          border-top-left-radius: .5rem;
          border-bottom-left-radius: .5rem;
          margin-left: 0;
        }
        &:hover {
          background-color: #fff;
          color: #444;
        }
        &:last-child {
          border-top-right-radius: .625rem;
          border-bottom-right-radius: .625rem;
        }
        &:active, &:focus, &:visited {
          outline: 0 !important;
        }
      }
      .view--active {
        background-color: #fff;
        color: #444;
      }
    }
  }
}

// Change Color
// .main--header[data-theme="light"] {
//   .main--header-top {
//     .top--left {
//       .title {
//       }
//     }
//     .top--right {
//     }
//   }
//   .main--header-action {
//     .action--left {

//     }
//     .acion--right {
//       .btn--custom {
//       }
//     }
//   }
// }

// .main--header[data-theme="dark"] {
//   .main--header-top {
//     .top--left {
//       .title {
//       }
//     }
//     .top--right {
//     }
//   }
//   .main--header-action {
//     .action--left {

//     }
//     .acion--right {
//       .btn--custom {
//       }
//     }
//   }
// }
</style>
