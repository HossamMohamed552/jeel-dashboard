<template>
  <div class="collapse-search">
    <div class="collapse-search__header">
      <h2 class="heading">
        {{ this.pathNum }}
      </h2>
      <button class="collapsed" @click="toggleCollapsed">
        <i :class="collapsed ? 'fas fa-minus' : 'fas fa-plus'"></i>
      </button>
    </div>
    <div :class="collapsed ? '' : 'collapsed'" class="collapse-search__body">
      <b-tabs content-class="mt-3">
        <b-tab active>
          <template #title>
            <img src="@/assets/images/icons/videoList.svg" alt="" />
            <span>الفيديوهات</span>
          </template>
          <div class="hold-fields">
            <b-row>
              <b-col lg="12">
                <ListItems
                  class="seasonal-mission-custom-list-item"
                  :tableItems="videosList"
                  :fieldsList="videosFieldsList"
                  :showSortControls="false"
                  :notHidePagination="false"
                  @openModal="openModal($event)"
                >
                </ListItems>
              </b-col>
            </b-row>
          </div>
        </b-tab>
        <b-tab>
          <template #title>
            <img src="@/assets/images/icons/quizList.svg" alt="" />
            <span>التمارين</span>
          </template>
          <div class="hold-fields">
            <b-row>
              <b-col lg="12">
                <ListItems
                  class="seasonal-mission-custom-list-item"
                  :tableItems="exercisesList"
                  :fieldsList="exercisesFieldsList"
                  :showSortControls="false"
                  :notHidePagination="false"
                >
                </ListItems>
              </b-col>
            </b-row>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal
      v-model="isShowModal"
      class="custom-rounded"
      @hide="cancel()"
      centered
      title="BootstrapVue"
      hide-footer
      hide-header
      size="lg"
    >
      <video
        width="100%"
        :src="videoDetials.video_with_muisc"
        ref="player"
        autoplay="autoplay"
        controls="controls"
      />
    </b-modal>
  </div>
</template>

<script>
import ListItems from "@/components/ListItems/index.vue";

export default {
  data() {
    return {
      collapsed: false,
      isShowModal: false,
      videoDetials: {},
    };
  },
  components: {
    ListItems,
  },
  props: {
    index: {
      type: Number,
      default: () => 0,
    },
    videosFieldsList: {
      type: Array,
      default: () => [],
    },
    videosList: {
      type: Array,
      default: () => [],
    },
    exercisesFieldsList: {
      type: Array,
      default: () => [],
    },
    exercisesList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    openModal(data) {
      this.isShowModal = true;
      this.videoDetials = data;
    },
    cancel() {
      this.isShowModal = false;
    },
  },
  computed: {
    pathNum() {
      if (this.index == 1) return "المسار الأول";
      else if (this.index == 2) return "المسار الثاني";
      else if (this.index == 3) return "المسار الثالث";
      else return "المسار الأخير";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

::v-deep {
  .videoPreview {
    all: unset;
    cursor: pointer;
    color: #58c6f2;
  }

  .nav-tabs {
    border: none;
    display: flex;
    gap: 20px;
    li.nav-item {
      a {
        width: 184px;
        height: 150px;
        border-radius: 16px;
        background: #f9f9f9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        transition: 0.4s;

        &.active {
          background: #76236c;
          span {
            color: #ffffff;
          }
          img {
            filter: invert(100%) sepia(0%) saturate(5550%) hue-rotate(91deg) brightness(117%)
              contrast(101%);
          }
        }
        span {
          color: #022930;
          font-size: 20px;
        }
        img {
          width: 38px;
          height: 38px;
          filter: invert(21%) sepia(31%) saturate(2804%) hue-rotate(274deg) brightness(93%)
            contrast(99%);
        }
      }
    }
  }
}
</style>
