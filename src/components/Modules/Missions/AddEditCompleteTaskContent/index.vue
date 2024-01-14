<template>
  <div class="add-edit-complete-task-content">
    <div class="container-fluid custom-container">
      <section class="prize-section d-flex w-100 flex-column mt-5" v-for="(badge, index) in badges" :key="index">
        <div class="row content-row w-100 justify-content-around align-items-center">
          <div class="col-1 badge-col">
            <p class="badge-title">
              {{badge.name}}
            </p>
            <img :src="badge.logo" alt="" class="badge-img w-75">
          </div>
          <div class="col-4 badge-content-type">
            <SelectSearch
              @input="badge.selectedBadgeContent = null;badgeSelectedContentTypeChanged($event,index)"
              v-model="badge.selectedBadgeContentType"
              :label="$t('MISSIONS.BadgeContentType')"
              :name="$t('MISSIONS.BadgeContentType')"
              :placeholder="'اختر' + $t('MISSIONS.BadgeContentType')"
              :options="badge.badgeContentTypes"
              :get-option-label="(option) => option.name"
              :deselectFromDropdown="true"
            ></SelectSearch>
          </div>
          <div class="col-4 badge-content">
            <SelectSearch
              v-model="badge.selectedBadgeContent"
              :label="$t('MISSIONS.BadgeContent')"
              :name="$t('MISSIONS.BadgeContent')"
              :placeholder="'اختر' + $t('MISSIONS.BadgeContent')"
              :options="badge.badgeContent"
              :get-option-label="(option) => option.file_name"
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
            @click="goToFinalStep"
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
import { getAllBadgesRequest } from "@/api/badge"
import { getLibraryTypesRequest } from "@/api/badge"
import { getLibraryContentRequest } from "@/api/badge"
import { debounce } from "lodash";


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
      ],
      badgeContentTypes: [],
      listOfAllContent: [],
      preparedToApi: null
    }
  },
  methods: {
    getAllBadges() { 
      this.ApiService(getAllBadgesRequest()).then(res => { 
        this.badges = res.data.data;
        this.badges = this.badges.map(badge => { 
          return { 
              ...badge,
              selectedBadgeContentType: null,
              badgeContentTypes: this.badgeContentTypes,
              selectedBadgeContent : null,
              badgeContent: [],
              tableItems : [],
            }
        })
      })
    },
    getLibraryTypesRequest() { 
      this.ApiService(getLibraryTypesRequest()).then(res => { 
        this.badgeContentTypes = res.data.data;
        this.getLibraryContentRequest();
      })
    },
    getLibraryContentRequest() { 
      let obj = {
        list_all:true
      };
      this.badgeContentTypes.forEach((contentType,index) => { 
        obj[`type[${index}]`] = contentType.id;
      })
      this.ApiService(getLibraryContentRequest(obj)).then(res => { 
        this.listOfAllContent = res.data.data.map(content => { 
          return { 
           ...content,
           selectable: true,
          }
        })
      })
    },
    badgeSelectedContentTypeChanged: debounce(function (selectedBadgeContentType, index) {
      const filteredContent = this.listOfAllContent.filter(content => {
          return content.type.id === selectedBadgeContentType.id
      })
      this.badges[index].badgeContent = JSON.parse(JSON.stringify(filteredContent)).map(content => {
        const filtered = this.badges[index].tableItems.filter(tableItem => tableItem.id === content.id)
        if (filtered.length > 0) {
          content.selectable = false;
        } else { 
          content.selectable = true;
        }
        return content;
      });
    }, 500),
    addBadgeContent(badgeIndex) { 
      /*
        Update the badge table items
      */ 
      this.badges[badgeIndex].tableItems.push({
        id: this.badges[badgeIndex].selectedBadgeContent.id,
        badgeContent: this.badges[badgeIndex].selectedBadgeContent.file_name,
        badgeContentType: this.badges[badgeIndex].selectedBadgeContentType.name
      });
      /*
        Disable Item from @BadgeContentSelect 
      */ 
      this.badges[badgeIndex].badgeContent.map(badgeContent => { 
        if (badgeContent.id === this.badges[badgeIndex].selectedBadgeContent.id) { 
          badgeContent.selectable = false;
        }
      });
      /*
       Reset Selected Item
      */ 
      this.badges[badgeIndex].selectedBadgeContent = null;
    },
    deleteBadgeContent(badgeRow,badgeIndex) { 
      this.badges[badgeIndex].tableItems = this.badges[badgeIndex].tableItems.filter(tableItem => tableItem.id != badgeRow.item.id);
      /*
        Enable Item from @BadgeContentSelect 
      */
      this.badges[badgeIndex].badgeContent.map(badgeContent => { 
        if (badgeContent.id === badgeRow.item.id) { 
          badgeContent.selectable = true;
        }
      });
    },
    createBadgeRowForApi() { 
      const badgesRows = []
      this.badges.forEach(badge => {
        badge.tableItems.forEach(tableItem => {
          badgesRows.push({
            badgeId: badge.id,
            badgeRewardId: tableItem.id,
          })
        })
      });
      this.preparedToApi = badgesRows;
    },
    goToFinalStep() {
      this.createBadgeRowForApi();
      this.$emit("goToFinalStep",this.preparedToApi)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
  },
  mounted() {
    this.getLibraryTypesRequest();
    this.getAllBadges();
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
