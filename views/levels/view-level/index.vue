<template>
  <section class="container-fluid custom-container">
    <div class="show-level">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("LEVEL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('LEVEL.name')" :subtitle="level.name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('LEVEL.min_levels')" :subtitle="level.min_levels"/>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="12" sm="6" class="mb-4" v-for="(school_group, index) in level.school_groups"
                 :key="index">
            <ShowItem :title="$t('TABLE_FIELDS.school_group')" :subtitle="school_group.name"/>
          </b-col>
        </b-row>
        <validation-observer v-slot="{ invalid }" ref="addEditQuizForm" v-if="user.permissions.includes('rearrange-missions')">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="12">
                <b-row>
                  <b-col lg="6" class="mt-3">
                    <h3>المراحل</h3>
                    <draggable v-model="missionNotSelected" group="items" :animation="150"
                               class="list-group" :sort="false">
                      <div v-for="item in missionNotSelected" :key="item.id"
                           class="list-group-item">
                        {{ item.name }}
                      </div>
                    </draggable>
                  </b-col>
                  <b-col lg="6" class="mt-3">
                    <h3>المراحل المختاره</h3>
                    <draggable v-model="missionsSend" group="items" :animation="150" class="list-group" :sort="true">
                      <div v-for="item in missionsSend" :key="item.id" class="list-group-item">
                        {{ item.name }}
                      </div>
                    </draggable>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <div class="hold-btns-form">
                <Button custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="missionsSend.length === 0"
                  custom-class="submit-btn"
                >
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleLevelRequest} from "@/api/level";
import {mapGetters} from "vuex";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import draggable from 'vuedraggable'

export default {
  name: "index",
  components: {
    TextField, SelectSearch, draggable, TextAreaField, Button,
    ShowItem,
  },
  data() {
    return {
      level: {},
      missionNotSelected: [],
      missionsSend: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.ApiService(getSingleLevelRequest(this.$route.params.id)).then((response) => {
      this.level = response.data.data;
      this.missionNotSelected = response.data.data.missions.filter((item) => item.is_selected === 0)
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
