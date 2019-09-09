<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content" v-click-outside="closePopup">
        <section class="section">
          <div class="container">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <horizontal-stepper
                  :steps="demoSteps"
                  :skipable="true"
                  :skipableStep="3"
                  @completed-step="completeStep"
                  @active-step="isStepActive"
                  @stepper-finished="onFinishStepper"
                  @next-step="onNextStep"
                  @skip-wizard="onSkipWizard"
                ></horizontal-stepper>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalStepper from "@/components/vue-stepper";
import ChooseKeyword from "./step/ChooseKeyword";
import AddFacebookAccount from "./step/AddFacebookAccount";
import ChooseContent from "./step/ChooseContent";
import PostingSchedule from "./step/PostingSchedule";
import FinalStep from "./step/FinalStep";

export default {
  components: {
    HorizontalStepper,
    ChooseKeyword,
    AddFacebookAccount,
    ChooseContent,
    PostingSchedule,
    FinalStep
  },
  data() {
    return {
      demoSteps: [
        {
          icon: "font_download",
          name: "Bước 1",
          title: "Chọn từ khóa",
          component: ChooseKeyword,
          completed: false
        },
        {
          icon: "account_circle",
          name: "Bước 2",
          title: "Thêm tài khoản",
          component: AddFacebookAccount,
          completed: false
        },
        {
          icon: "drafts",
          name: "Bước 3",
          title: "Chọn nội dung",
          component: ChooseContent,
          completed: false
        },
        {
          icon: "save",
          name: "Bước 4",
          title: "Thiết lập đăng bài",
          component: PostingSchedule,
          completed: false
        },
        {
          icon: "move_to_inbox",
          name: "Finished",
          title: "Hoàn thành",
          component: FinalStep,
          completed: false
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    },
    completeStep(payload) {
      this.demoSteps.forEach(step => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      });
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      this.demoSteps.forEach(step => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false;
          }
        }
      });
    },

    onNextStep(payload) {
      this.$store.dispatch("updateFinishedStep", payload.name);
    },
    // Executed when @stepper-finished event is triggered
    onFinishStepper(payload) {
      // this.$store.dispatch("toggleWizard", false);
      this.$store.dispatch("updateKeywordList");
    },
    onSkipWizard() {
      this.$store.dispatch("toggleWizard", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
