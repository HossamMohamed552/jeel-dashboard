<template>
  <div class="add-edit-competition">
    <div class="container-fluid custom-container">
      <div class="add-edit-competition-form">
        <validation-observer v-slot="{ invalid }" ref="addEditCompetitionForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <div
              v-if="!isGeneratedArrangments"
              class="question-counter-container"
            >
              <b-row>
                <h5 class="title">عدد المراكز</h5>
              </b-row>

              <div class="question-counter-holder">
                <div class="question-counter">
                  <div class="total-count">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="take"
                        label="عدد المراكز"
                        name="عدد المراكز"
                        :options="arrangmentNumberList"
                        :reduce="(option) => option"
                        :get-option-label="(option) => option"
                      ></SelectSearch>
                    </div>
                  </div>
                  <div class="question-types">
                    <Button
                      :loading="loading"
                      :custom-class="'submit-btn mt-4 mb-0'"
                      @click="getArrangmentList"
                    >
                      إنشاء المراكز
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="question-counter-container">
              <div class="question-counter-holder">
                <div class="question-counter">
                  <div class="total-count">
                    <div class="hold-count-filed">
                      <p>عدد المراكز</p>
                      <p>{{ take }}</p>
                    </div>
                  </div>
                  <div class="question-types">
                    <Button
                      :loading="loading"
                      :custom-class="'cancel-btn mt-4 mb-0'"
                      @click="isGeneratedArrangments = !isGeneratedArrangments"
                    >
                      إعادة الضبط
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!--generated arrangments -->
            <div v-if="isGeneratedArrangments" class="arrangments-holder">
              <div
                v-for="(item, idx) in arrangmentList"
                :key="idx"
                class="arrangment"
              >
                <div class="title">
                  <div class="number">{{ idx + 1 }}</div>
                  <div class="name">{{ item.name }}</div>
                </div>
                <div class="reward-holder">
                  <div v-if="item.prize && item.prize.id" class="yes-reward">
                    <div class="reward-title">
                      <div class="reward-circle"></div>
                      <p
                        v-if="item.prize && item.prize.name"
                        class="reward-name"
                      >
                        {{ item.prize.name }}
                      </p>
                    </div>
                    <Button
                      :loading="loading"
                      :custom-class="'cancel-btn'"
                      @click="handleChoosingReward(idx)"
                    >
                      تغيير الجائزة
                    </Button>
                  </div>
                  <div v-else class="no-reward">
                    <p>الجائزة</p>
                    <Button
                      :loading="loading"
                      :custom-class="'submit-btn'"
                      @click="handleChoosingReward(idx)"
                    >
                      أختر الجائزة
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <b-modal
              id="reward-modal"
              class="question-modal"
              hide-footer
              hide-header
              size="lg"
              centered
              @hide="cancelRewardModal"
            >
              <div class="reward-modal-title">اختر الجائزة</div>
              <p class="arrangment">المركز</p>
              <p class="arrangment-name">المركز الأول</p>

              <div class="choose-reward">
                <div class="header">
                  <p>أختر الجائزة</p>
                </div>
                <div class="content">
                  <div class="search">
                    <b-form-input
                      v-model="name"
                      placeholder="بحث"
                      class="search-input"
                      @input="getrewardList"
                    />
                    <img src="@/assets/images/icons/search.svg" />
                  </div>
                  <div class="reward-list">
                    <div
                      v-for="(item, idx) in rewardList"
                      :key="idx"
                      class="reward-item"
                      :class="selectedRewardId == item.id && 'selected-reward'"
                      @click="setChoosedReward(item)"
                    >
                      <div class="reward-circle"></div>
                      <p class="reward-name">{{ item.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-actions">
                <Button
                  :loading="loading"
                  :custom-class="'submit-btn'"
                  @click="saveSelectdReward"
                >
                  حفظ
                </Button>
                <Button
                  :loading="loading"
                  :custom-class="'cancel-btn'"
                  @click="cancelRewardModal"
                >
                  إلغاء
                </Button>
              </div>
            </b-modal>

            <b-row>
              <div class="action-holder">
                <div>
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    :custom-class="'submit-btn'"
                  >
                    إنهاء
                  </Button>
                  <Button
                    class="mx-3"
                    @click="handleBack"
                    custom-class="submit-btn back-btn"
                  >
                    {{ $t("GLOBAL_BACK") }}
                  </Button>
                </div>
                <Button
                  @click="handleCancel"
                  :custom-class="'cancel-btn margin'"
                >
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
    <script>
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import { getrewardListRequest } from "@/api/competition.js";
import { debounce } from "lodash";

export default {
  components: {
    TextField,
    SelectSearch,
    Button,
    TextAreaField,
    ImageUploader,
  },
  props: {
    arrangmentList: {
      type: Array,
      default: () => [],
    },
    learningPaths: {
      type: Array,
      default: () => [],
    },
    terms: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rewardValue: "",
      loading: false,
      take: 0,
      arrangmentNumberList: [0, 1, 2, 3, 4, 5],
      isGeneratedArrangments: false,
      name: "",
      rewardList: [],
      selectedArrangIndex: null,
      selectedReward: {},
      selectedRewardId: null,
    };
  },
  watch: {
    arrangmentList(val) {
      this.isGeneratedArrangments = true;
    },
  },
  methods: {
    onSubmit() {
      const data = this.arrangmentList
        .filter((center) => center.prize)
        .map((center) => ({
          arrangment_id: center.id,
          reward_id: center.prize.id,
        }));

      this.$emit("onSubmit", { rewards_arrangments: data });
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    handleChoosingReward(idx) {
      this.selectedArrangIndex = idx;
      this.$bvModal.show("reward-modal");
    },
    getArrangmentList() {
      const data = {
        take: this.take,
        list_all: true,
      };

      this.$emit("getArrangmentList", data);
    },
    cancelRewardModal() {
      this.selectedArrangIndex = null;
      this.selectedReward = {};
      this.selectedRewardId = null;
      this.$bvModal.hide("reward-modal");
    },
    getrewardList: debounce(function () {
      this.ApiService(getrewardListRequest({ name: this.name })).then(
        (response) => {
          this.rewardList = response.data.data;
        }
      );
    }, 500),
    setChoosedReward(reward) {
      this.selectedRewardId = reward.id;
      this.selectedReward = reward;
    },
    saveSelectdReward() {
      const prize = this.selectedReward;
      this.arrangmentList[this.selectedArrangIndex].prize = prize;
      this.$bvModal.hide("reward-modal");
    },
  },
  mounted() {
    this.getrewardList();
  },
};
</script>
    <style scoped lang="scss">
@import "./index";
</style>
    