<template>
  <div class="add-edit-complete-task-content">
    <div class="container-fluid custom-container">
      <section class="prize-section d-flex w-100 flex-column mt-5" v-for="(badge, index) in badges" :key="index">
        <div class="row content-row w-100 justify-content-around align-items-center">
          <div class="col-1 badge-col">
            <p class="badge-title">
              {{badge.name}}
            </p>
            <img :src="require('@/assets/gold-badge.jpg')" alt="" class="badge-img w-75">
          </div>
          <div class="col-4 badge-content-type">
            <SelectSearch
              @input="badge.selectedBadgeContent = null"
              v-model="badge.selectedBadgeContentType"
              :label="$t('MISSIONS.BadgeContentType')"
              :name="$t('MISSIONS.BadgeContentType')"
              :placeholder="'اختر' + $t('MISSIONS.BadgeContentType')"
              :options="badge.badgeContentTypes"
              :get-option-label="(option) => option.title"
              :deselectFromDropdown="true"
            ></SelectSearch>
          </div>
          <div class="col-4 badge-content">
            <SelectSearch
              v-model="badge.selectedBadgeContent"
              :label="$t('MISSIONS.BadgeContent')"
              :name="$t('MISSIONS.BadgeContent')"
              :placeholder="'اختر' + $t('MISSIONS.BadgeContent')"
              :options="badge.selectedBadgeContentType?.badgeContent"
              :get-option-label="(option) => option.title"
              :deselectFromDropdown="true"
              :selectable="option => option.selectable"
            ></SelectSearch>
          </div>
          <div class="col-2 add-btn mt-5 w-100">
            <Button
              class="w-100"
              @click="addBadgeContent(index)"
              :custom-class="'submit-btn w-100'"
              :disabled="!badge.selectedBadgeContent || !badge.selectedBadgeContentType"
            >
              {{ 'اضافه' }}
            </Button>
          </div>
        </div>
        <div class="row table-row mt-5">
          <b-table striped :items="badge.tableItems" :fields="fieldsList"  :head-variant="'gradient'" responsive  :tbody-class="'custom-body'" show-empty>
            <template #empty>
            <div class="mt-5 pt-5 text-center">لا توجد بيانات</div>
          </template>
          <template #cell(actions)="data">
            <b-dropdown
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
              class="hold-controls"
            >
              <template #button-content>
                <img src="@/assets/images/icons/actions.svg"/>
              </template>
              <b-dropdown-item @click="deleteBadgeContent(data,index)">
                حذف
              </b-dropdown-item>
            </b-dropdown>
          </template>
          </b-table>
        </div>
      </section>
      <section class="action-holder mt-5">
        <div>
          <Button
            @click="goToOverviewStep()"
            :custom-class="'submit-btn'"
          >
            {{ $t("GLOBAL_NEXT") }}
          </Button>
          <Button
            class="mx-3"
            @click="handleBack"
            custom-class="submit-btn back-btn"
          >
            {{ $t("GLOBAL_BACK") }}
          </Button>
        </div>
        <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
        {{ $t("GLOBAL_CANCEL") }}
        </Button>
      </section>
    </div>
  </div>
</template>
<script>
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";


export default {
  name: "index",
  components: {
    Button,
    SelectSearch,
  },
  props: {
   
  },
  data() {
    return {
      badges: [],
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "badgeContentType", label: "نوع المحتوى"},
        {key: "badgeContent", label: "المحتوى"},
        {key: "actions", label: "الإجراء"},
      ]
    }
  },
  methods: {
    addBadgeContent(badgeIndex) { 
      /*
        Update the badge table items
      */ 
      this.badges[badgeIndex].tableItems.push({
        id: this.badges[badgeIndex].selectedBadgeContent.id,
        badgeContentType:this.badges[badgeIndex].selectedBadgeContentType.title,
        badgeContent: this.badges[badgeIndex].selectedBadgeContent.title,
      });
      /*
        Disable Item from @BadgeContentSelect 
      */ 
      this.badges[badgeIndex].selectedBadgeContentType.badgeContent.map(badgeContent => { 
        if (badgeContent.id === this.badges[badgeIndex].selectedBadgeContent.id) { 
          badgeContent.selectable = false;
        }
      });
      /*
       Reset Selected Item
      */ 
      this.badges[badgeIndex].selectedBadgeContent = null;
      this.badges[badgeIndex].selectedBadgeContentType = null;
    },
    deleteBadgeContent(badgeRow,badgeIndex) { 
      this.badges[badgeIndex].tableItems = this.badges[badgeIndex].tableItems.filter(tableItem => tableItem.id != badgeRow.item.id);
      /*
        Enable Item from @BadgeContentSelect 
      */
      this.badges[badgeIndex].badgeContentTypes.find(badgeContentType => badgeContentType.title === badgeRow.item.badgeContentType).badgeContent.map(badgeContent => { 
        if (badgeContent.title === badgeRow.item.badgeContent) { 
          badgeContent.selectable = true;
        }
      });
    },
    goToOverViewStep() {
      this.$emit("goToOverViewStep",'')
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
  },
  mounted() {
    this.badges = [
      {
        "id":1,
        "name": "GOLD",
        "img": "img/gold",
        "selectedBadgeContentType": null,
        "selectedBadgeContent": null,
        "tableItems":[],
        "badgeContentTypes":[
          {
              "id":1,
              "title": "Audio",
              "badgeContent": [
                  {
                      "id":1,
                      "title": "Content Audio 1",
                      "selectable": true
                  },
                  {
                      "id":2,
                      "title": "Content Audio 2",
                      "selectable": true
                  }
              ]
          },
          {
              "id":2,
              "title": "Video",
              "badgeContent": [
                  {
                      "id":3,
                      "title": "Content Video 1",
                      "selectable": true
                  },
                  {
                      "id":4,
                      "title": "Content Video 2",
                      "selectable": true
                  }
              ]
          }
        ]
      },
      {
        "id":2,
        "name": "Silver",
        "img": "img/Silver",
        "selectedBadgeContentType": null,
        "selectedBadgeContent": null,
        "tableItems":[],
        "badgeContentTypes":[
          {
            "id":3,
            "title": "Audio",
            "badgeContent": [
                {
                    "id":5,
                    "title": "Content Audio 1",
                    "selectable": true
                },
                {
                    "id":6,
                    "title": "Content Audio 2",
                    "selectable": true
                }
            ]
          },
          {
              "id":4,
              "title": "Video",
              "badgeContent": [
                  {
                      "id":7,
                      "title": "Content Video 1",
                      "selectable": true
                  },
                  {
                      "id":8,
                      "title": "Content Video 2",
                      "selectable": true
                  }
              ]
          }
        ]
      }
    ]
  }
}
</script>
<style scoped lang="scss">
@import "./index";

::v-deep {
  .vs__dropdown-option--deselect, .vs__dropdown-option--selected {
    background: #76236C !important;
    color: #fff;
  }
}
</style>
