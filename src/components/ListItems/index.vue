<template>
  <section class="list">
    <div class="header">
      <div class="list-of-item">
        <p class="name-of-item" v-if="headerName">{{ headerName }}</p>
        <span class="no-of-item" v-if="numberOfItem">{{ numberOfItem }}</span>
      </div>
      <div class="controls">
        <slot name="buttons"></slot>
      </div>
    </div>
    <div class="search-sort" v-if="showSortControls">
      <div class="search">
        <b-form-input v-model="inputValue" placeholder="بحث" class="search-input"/>
        <img src="@/assets/images/icons/search.svg"/>
      </div>
      <div class="sort">
        <img src="@/assets/images/icons/sort.svg"/>
        <select @change="orderBy">
          <option value="" selected disabled>ترتيب حسب</option>
          <option v-for="(item, index) in sortArray" :id="item.id" :value="item.value" :key="index">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="hold-table">
      <b-table
        :head-variant="'gradient'"
        responsive
        striped
        :items="items"
        :fields="fieldsList"
        :busy="loading"
        :tbody-class="'custom-body'"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2 mt-5">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #cell(avatar)="data">
          <div class="hold-image">
            <img class="image-in-table" :src="data.item.avatar" @error="altImage($event)"/>
          </div>
        </template>
        <template #cell(status)="data">
          <span>{{ data.item.status === 1 ? "مفعل" : "غير مفعل" }}</span>
        </template>
        <template #cell(music_status)="data">
          <span>{{ data.item.music_status === 1 ? "بموسيقى" : "أكابيلا" }}</span>
        </template>
        <template #cell(country)="data">
          <span>{{ data.value.name | cutString }}</span>
        </template>
        <template #cell(email.owner)="data">
          <span>{{ data.item.owner.email }}</span>
        </template>
        <template #cell(logo)="data">
          <div class="hold-image-school">
            <img class="image-school-in-table" :src="data.item.logo"/>
          </div>
        </template>
        <template #cell(school_type)="data">
          <span>{{ data.item.school_type.name | cutString }}</span>
        </template>
        <template #cell(school_group)="data">
          <span>{{ data.item.school_group.name | cutString }}</span>
        </template>
        <template #cell(package)="data">
          <span>{{ data.item.package.name | cutString }}</span>
        </template>
        <template #cell(question)="data">
          <span v-if="data.item.question_pattern === 'text'">{{
              data.item.question | cutString
            }}</span>
          <img v-else-if="data.item.question_pattern === 'image'" :src="data.item.question"
               class="question-image-show">
          <audio v-else-if="data.item.question_pattern === 'audio'" controls>
            <source :src="data.item.question"/>
          </audio>
        </template>
        <template #cell(question_type)="data">
          <span>{{ data.item.question_type.name | cutString }}</span>
        </template>
        <template #cell(question_difficulty)="data">
          <span>{{ data.item.question_difficulty.name | cutString }}</span>
        </template>
        <template #cell(level)="data">
          <span v-if="data.item.level">{{ data.item.level.name | cutString }}</span>
        </template>
        <template #cell(level)="data">
          <span v-if="data.item.level">{{ data.item.level.name | cutString }}</span>
        </template>
        <template #cell(learningpaths)="data">
          <span v-for="(path, ind) in data.item.learningpaths" :key="ind"
                class="path">{{ path.name | cutString }}</span>
        </template>
        <template #cell(learning_path)="data">
          <span v-if="data.item.learning_path">{{ data.item.learning_path.name | cutString }}</span>
        </template>
        <template #cell(roles)="data">
          <div class="d-flex justify-content-start align-items-center">
            <span v-for="(role, index) in data.item.roles" :key="index" class="role">{{
                role.name
              }}</span>
          </div>
        </template>
        <template #cell(allowEdit)="data">
          <b-form-checkbox v-model="data.item.is_selected" switch
                           @change="managePath(data.item)"></b-form-checkbox>
        </template>
        <template #cell(edit)="data">
          <Button :custom-class="'transparent-btn rounded-btn'"
                  @click="goToMissionContent(data.item.id,data.item.mission_id)"
                  :disabled="data.item.is_selected === false">تعديل المحتوى
          </Button>
        </template>
        <template #cell(actions)="data">
          <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret
                      class="hold-controls"
                      v-if="checkDelete(data) === 'show' || checkDetail() === 'show' || checkEdit() === 'show'">
            <template #button-content>
              <img src="@/assets/images/icons/actions.svg"/>
            </template>
            <b-dropdown-item @click="detailItem(data.item.id)" v-if="checkDetail() === 'show'">
              {{ $t("CONTROLS.detailBtn") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkEdit() === 'show'"></b-dropdown-divider>
            <b-dropdown-item @click="editItem(data.item.id)" v-if="checkEdit() === 'show'">
              {{ $t("CONTROLS.editBtn") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkEditClass() === 'show'"></b-dropdown-divider>
            <b-dropdown-item v-if="checkEditClass() === 'show'"
                             @click="$router.push(`/dashboard/level-classes/${data.item.id}`)">
              {{ $t("CONTROLS.ManageClasses") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkDelete(data) === 'show'"></b-dropdown-divider>
            <b-dropdown-item v-if="checkDelete(data) === 'show'" @click="deleteItem(data.item.id)">
              {{ $t("CONTROLS.deleteBtn") }}
            </b-dropdown-item>
            <b-dropdown-item v-if="videoList" @click="addVideoQuestion(data.item.id)"
            >{{ $t("CONTROLS.addVideoQuestion") }}
            </b-dropdown-item>
          </b-dropdown>
        </template>
        <template #cell(edit_action)="data">
          <span class="pointer cursor-pointer" @click="editItem(data.item.id)"
          >{{ $t("CONTROLS.editBtn") }}
          </span>
        </template>
      </b-table>
    </div>
    <Pagination
      :currentPage="formValues.page"
      :perPage="formValues.per_page"
      :totalItems="numberOfItem"
      @changePage="handlePageChange"
      @changePerPage="handleChangePerPage"
    />
  </section>
</template>
<script>
import {debounce} from "lodash";
import {mapGetters} from "vuex";
import Button from "@/components/Shared/Button/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import {type} from "os";

export default {
  name: "index",
  components: {
    Button
  },
  data() {
    return {
      editIcon: require("@/assets/edit.svg"),
      deleteIcon: require("@/assets/delete.svg"),
      inputValue: "",
      items: [],
      formValues: {
        per_page: 10,
        page: 1,
        name: "",
        order: "",
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
    activePage() {
      return window.localStorage.getItem('page')
    },
    watchRefresh: function(){
      return this.isRefresh
    }
  },
  props: {
    isRefresh: {
      type: Boolean,
      default: false
    },
    permission_delete: {
      type: String,
      default: ''
    },
    permission_edit: {
      type: String,
      default: ''
    },
    permission_view: {
      type: String,
      default:
        ''
    },
    showSortControls: {
      type: Boolean,
      default: true,
    },
    isUserPage: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    headerName: {
      type: String,
      default: "",
    },
    numberOfItem: {
      type: Number,
      default: 0,
    },
    vSearchModel: {
      type: String,
    },
    sortArray: {
      type: Array,
      default: function () {
        return [
          {
            id: 1,
            value: "ASC",
            name: "تصاعديا",
          },
          {
            id: 2,
            value: "DESC",
            name: "تنازليا",
          },
        ];
      },
    },
    tableItems: {
      type: Array,
      default: function () {
        return [];
      },
    },
    fieldsList: {
      type: Array,
      default: () => [],
    },
    videoList: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    cutString(value) {
      if (value.length > 40) {
        return `${value.slice(0, 40)}...`
      } else {
        return value
      }
    }
  },
  watch: {
    watchRefresh(newVal){
      if (newVal) {
        this.handlePageChange(1)
        this.$emit('resetRefresh',false)
      }
    },
    vSearchModel(newVal) {
      this.inputValue = newVal;
    },
    inputValue(newVal) {
      this.searchBy(newVal);
    },
    tableItems(newVal) {
      this.items = newVal;
    },
  },
  methods: {
    type,
    goToMissionContent(pathId, missionId) {
      this.$router.push(`/dashboard/path-content/${pathId}/mission/${missionId}`)
    },
    handlePageChange(event) {
      this.formValues.page = event;
      this.$emit("refetch", this.formValues);
    },
    handleChangePerPage(event) {
      this.formValues.per_page = event;
      this.$emit("refetch", this.formValues);
    },
    searchBy: debounce(function (name) {
      this.formValues.name = name;
      this.$emit("refetch", this.formValues);
    }, 500),
    orderBy(event) {
      this.formValues.order = event.target.value;
      this.$emit("refetch", this.formValues);
    },
    detailItem(id) {
      this.$emit("detailItem", id);
    },
    editItem(id) {
      this.$emit("editItem", id);
    },
    deleteItem(id) {

      this.$emit("deleteItem", id);
    },
    addVideoQuestion(id) {
      this.$emit("addVideoQuestion", id);
    },
    managePath(item) {
      axios.put('/manage-mission-learningpath', {
        "mission_id": item.mission_id,
        "learningpath_id": item.id,
        "is_selected": item.is_selected ? 1 : 0
      }, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'application/json'
        }
      }).then((response) => {

      }).catch((error) => {

      })
    },
    checkDelete(data) {

      if (data.item.is_default === 1 && this.user.permissions.includes(`${this.permission_delete}`)) {
        return 'hide'
      } else if (data.item.school_owner === true && this.user.permissions.includes(`${this.permission_delete}`)) {
        return 'hide'
      } else if (data.item.is_default === 0 || data.item.school_owner === false || this.user.permissions.includes(`${this.permission_delete}`)) {
        return 'show'
      } else if (this.$route.path === '/dashboard/question-difficulty') {
        return 'hide'
      } else {
        return 'hide'
      }
    },
    checkEdit() {
      if (!this.user.permissions.includes('manage-learningpath') && !this.activePage === 'schoolAdmin') {
        return 'show'
      } else if (this.activePage === 'schoolAdmin') {
        return 'hide'
      } else if (this.user.permissions.includes(`${this.permission_edit}`)) {
        return 'show'
      } else {
        return 'hide'
      }
    },
    checkDetail() {
      if (this.activePage === 'schoolAdmin') {
        return 'hide'
      } else if (this.user.permissions.includes(`${this.permission_view}`)) {
        return 'show'
      } else {
        return 'hide'
      }
    },
    checkEditClass() {
      if (this.user.permissions.includes('manage-learningpath') && this.$route.path.includes('levels')) {
        return 'show'
      } else {
        return 'hide'
      }
    },
    altImage($event) {
      $event.target.src = require("@/assets/images/icons/user-avatar.png")
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
