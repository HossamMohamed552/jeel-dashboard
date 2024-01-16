<template>
  <section class="list">
    <div class="header">
      <div class="list-of-item">
        <p class="name-of-item" v-if="headerName">{{ headerName }}</p>
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
        data-custom-sort="customSort"
        show-empty
      >
        <template #empty>
          <div class="mt-5 pt-5 text-center">لا توجد بيانات</div>
        </template>
        <template #emptyfiltered="scope">
          <h4>{{ scope.emptyFilteredText }}</h4>
        </template>
        <template :slot="`head(${headerItem.key})`" v-for="headerItem in fieldsList">
          <div :class="headerItem.key !== 'actions' ? 'sort' : ''">
            <span>{{ headerItem.label }}</span>
            <span class="sortIcon" v-if="headerItem.key !== 'actions'">
              <img src="@/assets/images/icons/arrow-up-down.png" @click="sortBy(headerItem.key)"/>
            </span>
          </div>
        </template>
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
        <template #cell(image)="data">
          <div class="hold-image-school">
            <img class="image-school-in-table" :src="data.item.image"/>
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
          <img
            v-else-if="data.item.question_pattern === 'image'"
            :src="data.item.question"
            class="question-image-show"
          />
          <audio v-else-if="data.item.question_pattern === 'audio'" controls>
            <source :src="data.item.question"/>
          </audio>
        </template>
        <template #cell(questionName)="data">
          <span>{{ data.item.question | cutString }}</span>
        </template>
        <template #cell(question_type)="data">
          <span>{{ data.item.question_type.name | cutString }}</span>
        </template>
        <template
          #cell(questionDifficulty)="data"
          class="d-flex align-items-center justify-content-start"
        >
          <span
            class="questionDifficulty"
            :class="questionDifficultyClass(data.item.questionDifficulty)"
          >{{ data.item.questionDifficulty.name | cutString }}</span
          >
        </template>
        <template #cell(level)="data">
          <span v-if="data.item.level">{{ data.item.level.name | cutString }}</span>
        </template>
        <template #cell(chracter_type)="data">
          <span v-if="data.item.chracter_type">{{
              data.item.chracter_type[0].key | cutString
            }}</span>
        </template>
        <template #cell(term)="data">
          <span v-if="data.item.term">{{ data.item.term.name | cutString }}</span>
        </template>
        <template #cell(video_with_music_transcode)="data">
          <span>{{
              data.item.video_with_music_transcode ? "تم رفع الفيديو" : "لم يتم رفع الفيديو بعد"
            }}</span>
        </template>
        <template #cell(learningpaths)="data">
          <span v-for="(path, ind) in data.item.learningpaths" :key="ind" class="path">{{
              path.name | cutString
            }}</span>
        </template>
        <template #cell(lessons)="data">
          <span v-for="(lesson, ind) in data.item.lessons" :key="ind" class="path">{{
              lesson.name | cutString
            }}</span>
        </template>
        <template #cell(teachers)="data">
          <span v-for="(teacher, ind) in data.item.teachers" :key="ind" class="path">{{
              teacher.name | cutString
            }}</span>
        </template>
        <template #cell(learning_path)="data">
          <span v-if="data.item.learning_path">{{ data.item.learning_path.name | cutString }}</span>
        </template>
        <template #cell(roles)="data">
          <div class="d-flex justify-content-start align-items-center">
            <span v-for="(role, index) in data.item.roles" :key="index">{{ role.name }}</span>
          </div>
        </template>
        <template #cell(number_users_roles[0])="data">
          <span v-if="data.item.number_users_roles[0]">{{
              data.item.number_users_roles[0].number
            }}</span>
        </template>
        <template #cell(number_users_roles[1])="data">
          <span v-if="data.item.number_users_roles[1]">{{
              data.item.number_users_roles[1].number
            }}</span>
        </template>
        <template #cell(number_users_roles[2])="data">
          <span v-if="data.item.number_users_roles[2]">{{
              data.item.number_users_roles[2].number
            }}</span>
        </template>
        <template #cell(number_users_roles[3])="data">
          <span v-if="data.item.number_users_roles[3]">{{
              data.item.number_users_roles[3].number
            }}</span>
        </template>
        <template #cell(number_users_roles[4])="data">
          <span v-if="data.item.number_users_roles[4]">{{
              data.item.number_users_roles[4].number
            }}</span>
        </template>
        <template #cell(allowEdit)="data">
          <b-form-checkbox
            v-model="data.item.is_selected"
            switch
            @change="managePath(data.item)"
          ></b-form-checkbox>
        </template>

        <template #cell(edit)="data">
          <Button
            :custom-class="'transparent-btn rounded-btn'"
            @click="goToMissionContent(data.item.id, data.item.mission_id)"
            :disabled="data.item.is_selected === false"
          >تعديل المحتوى
          </Button>
        </template>
        <template #cell(status.key)="data">
          <b-form-checkbox
            v-model="data.value"
            name="checkbox-1"
            value="active"
            unchecked-value="deactivated"
            switch
            size="lg"
            @change="changeStatus(data.item)"
          >
          </b-form-checkbox>
        </template>
        <template #cell(status.name)="data">
          <span class="blocked-user" v-if="checkBlockUser(data) == 'show'">محظور</span>
        </template>
        <template #cell(actions)="data">
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            class="hold-controls"
            v-if="
              checkDelete(data) === 'show' ||
              checkDetail() === 'show' ||
              checkEdit() === 'show' ||
              checkAdd() === 'show' ||
              checkUsersAdd() === 'show' ||
              checkBlockUser(data) === 'show' ||
              checkChangePassword() === 'show'
            "
          >
            <template #button-content>
              <img src="@/assets/images/icons/actions.svg"/>
            </template>
            <b-dropdown-item @click="detailItem(data.item)" v-if="checkDetail() === 'show'">
              {{ $t("CONTROLS.detailBtn") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkAdd() === 'show'"></b-dropdown-divider>
            <b-dropdown-item @click="permissionItem(data.item.id)" v-if="checkAdd() === 'show'">
              {{ $t("CONTROLS.permissions") }}
            </b-dropdown-item>
            <!-- Edit Item -->
            <b-dropdown-divider v-if="checkEdit() === 'show'"></b-dropdown-divider>
            <b-dropdown-item @click="editItem(data.item.id)" v-if="checkEdit() === 'show'">
              {{ $t("CONTROLS.editBtn") }}
            </b-dropdown-item>

            <!-- Block User -->
            <b-dropdown-divider v-if="checkBlockUser(data) === 'show'"></b-dropdown-divider>
            <b-dropdown-item
              @click="cancelBlock(data.item.id)"
              v-if="checkBlockUser(data) === 'show'"
            >
              {{ $t("TABLE_FIELDS.not_block") }}
            </b-dropdown-item>

            <!-- change Password User -->
            <b-dropdown-divider v-if="checkChangePassword() === 'show'"></b-dropdown-divider>
            <b-dropdown-item
              @click="changePassword(data.item.id)"
              v-if="checkChangePassword() === 'show'"
            >
              {{ $t("CHANGE_PASSWORD") }}
            </b-dropdown-item>
            <!-- Add User -->
            <b-dropdown-divider v-if="checkUsersAdd() === 'show'"></b-dropdown-divider>
            <b-dropdown-item @click="editItem(data.item.id)" v-if="checkUsersAdd() === 'show'">
              {{ $t("CONTROLS.users") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkEditClass() === 'show'"></b-dropdown-divider>
            <b-dropdown-item
              v-if="checkEditClass() === 'show'"
              @click="$router.push(`/dashboard/level-classes/${data.item.id}`)"
            >
              {{ $t("CONTROLS.ManageClasses") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkAddQuestionVideo() === 'show'"></b-dropdown-divider>
            <b-dropdown-item
              v-if="checkAddQuestionVideo() === 'show'"
              @click="addVideoQuestion(data.item.id)"
              :disabled="!data.item.video_with_music_transcode"
              :class="!data.item.video_with_music_transcode ? 'disableButton' : ''"
            >
              {{ $t("CONTROLS.AddVideo") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkDelete(data) === 'show'"></b-dropdown-divider>
            <b-dropdown-item v-if="checkDelete(data) === 'show'" @click="deleteItem(data.item.id)">
              {{ $t("CONTROLS.deleteBtn") }}
            </b-dropdown-item>
            <b-dropdown-divider v-if="checkAddAd(data) === 'show'"></b-dropdown-divider>
            <b-dropdown-item
              v-if="checkAddAd(data) === 'show'"
              @click="goToAnnouncements(data.item.id)"
            >
              {{ $t("CONTROLS.addAd") }}
            </b-dropdown-item>
            <!--            <b-dropdown-item v-if="videoList" @click="addVideoQuestion(data.item.id)"-->
            <!--              >{{ $t("CONTROLS.addVideoQuestion") }}-->
            <!--            </b-dropdown-item>-->
          </b-dropdown>
        </template>
        <template #cell(edit_action)="data">
          <span class="pointer cursor-pointer" @click="editItem(data.item.id)">{{
              $t("CONTROLS.editBtn")
            }}</span>
        </template>
        <template #cell(download)="data">
          <span
            class="pointer cursor-pointer"
            v-if="showDownloadBtn"
            @click="downloadImg(data.item)"
          >
            <img src="@/assets/images/icons/download.png"/>
          </span>
        </template>
      </b-table>
    </div>
    <Pagination
      v-if="Array.from(items).length > 0 && notHidePagination"
      :loadedCount="Array.from(items).length"
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
    Button,
  },
  data() {
    return {
      editIcon: require("@/assets/edit.svg"),
      deleteIcon: require("@/assets/delete.svg"),
      inputValue: "",
      items: [],
      switchSort: "DESC",
      formValues: {
        per_page: 10,
        page: 1,
        name: "",
        order: "",
        order_by: "",
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
    activePage() {
      return window.localStorage.getItem("page");
    },
    watchRefresh: function () {
      return this.isRefresh;
    },
  },
  props: {
    showDownloadBtn: {
      type: Boolean,
      default: false,
    },
    notHidePagination: {
      type: Boolean,
      default: true,
    },
    isRefresh: {
      type: Boolean,
      default: false,
    },
    permission_delete: {
      type: String,
      default: "",
    },
    permission_edit: {
      type: String,
      default: "",
    },
    permission_add: {
      type: String,
      default: "",
    },
    users_add: {
      type: String,
      default: "",
    },
    cancel_block: {
      type: String,
      default: "",
    },
    change_password: {
      type: String,
      default: "",
    },

    permission_view: {
      type: String,
      default: "",
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
        return `${value.slice(0, 40)}...`;
      } else {
        return value;
      }
    },
  },
  watch: {
    watchRefresh(newVal) {
      if (newVal) {
        this.handlePageChange(1);
        this.$emit("resetRefresh", false);
      }
    },
    vSearchModel(newVal) {
      this.inputValue = newVal;
    },
    inputValue(newVal) {
      this.searchBy(newVal);
    },
    tableItems: {
      handler(newVal) {
        this.items = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    type,
    goToMissionContent(pathId, missionId) {
      this.$router.push(`/dashboard/path-content/${pathId}/mission/${missionId}`);
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
    detailItem(item) {
      if (this.$route.name === "show-teacher") {
        this.$emit("detailItem", item.term.id);
      } else {
        this.$emit("detailItem", item.id);
      }
    },
    editItem(id) {
      this.$emit("editItem", id);
    },

    changePassword(id) {
      this.$emit("changePassword", id);
    },
    cancelBlock(id) {
      this.$emit("cancelBlock", id);
    },
    changeStatus(id) {
      this.$emit("changeStatus", id);
    },
    permissionItem(id) {
      this.$emit("permissionItem", id);
    },
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
    addVideoQuestion(videoId) {
      this.$router.push(`/dashboard/video/${videoId}/questions`);
    },
    questionDifficultyClass(difficultyName) {
      if (difficultyName.slug === "easy") {
        return "easy";
      } else if (difficultyName.slug === "medium") {
        return "medium";
      } else {
        return "hard";
      }
    },
    managePath(item) {
      axios
        .put(
          "/manage-mission-learningpath",
          {
            mission_id: item.mission_id,
            learningpath_id: item.id,
            is_selected: item.is_selected ? 1 : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${VueCookies.get("token")}`,
              locale: "ar",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
        })
        .catch((error) => {
        });
    },
    checkDelete(data) {
      if (
        data.item.is_default === 1 &&
        this.user.permissions.includes(`${this.permission_delete}`)
      ) {
        return "hide";
      } else if (
        data.item.school_owner === true &&
        this.user.permissions.includes(`${this.permission_delete}`)
      ) {
        return "hide";
      } else if (
        data.item.is_default === 0 ||
        data.item.school_owner === false ||
        this.user.permissions.includes(`${this.permission_delete}`)
      ) {
        return "show";
      } else if (this.$route.path === "/dashboard/question-difficulty") {
        return "hide";
      } else {
        return "hide";
      }
    },
    checkAddQuestionVideo() {
      if (this.$route.name === "videos") {
        return "show";
      } else {
        return "hide";
      }
    },
    checkEdit() {
      if (
        !this.user.permissions.includes("manage-learningpath") &&
        !this.activePage === "schoolAdmin"
      ) {
        return "show";
      } else if (this.activePage === "schoolAdmin") {
        return "hide";
      } else if (this.activePage === "questions") {
        return "hide";
      } else if (this.activePage === "practices") {
        return "hide";
      } else if (this.activePage === "missions") {
        return "hide";
      }
      else if (this.user.permissions.includes(`${this.permission_edit}`)) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkBlockUser(data) {
      if (this.activePage === "userAdmin" && data.item.status.key == "blocked") {
        return "show";
      } else if (this.user.permissions.includes(`${this.cancel_block}`)) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkChangePassword() {
      if (this.activePage === "userAdmin") {
        return "show";
      } else if (this.user.permissions.includes(`${this.change_password}`)) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkAdd() {
      if (
        !this.user.permissions.includes("manage-learningpath") &&
        !this.activePage === "schoolAdmin"
      ) {
        return "show";
      } else if (this.activePage === "schoolAdmin") {
        return "hide";
      } else if (this.user.permissions.includes(`${this.permission_add}`)) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkUsersAdd() {
      if (
        !this.user.permissions.includes("manage-learningpath") &&
        !this.activePage === "schoolAdmin"
      ) {
        return "show";
      } else if (this.activePage === "schoolAdmin") {
        return "hide";
      } else if (this.user.permissions.includes(`${this.users_add}`)) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkDetail() {
      if (this.activePage === "schoolAdmin") {
        return "hide";
      } else if (this.user.permissions.includes(`${this.permission_view}`)) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkEditClass() {
      if (
        this.user.permissions.includes("manage-learningpath") &&
        this.$route.path.includes("levels")
      ) {
        return "show";
      } else {
        return "hide";
      }
    },
    checkAddAd(data) {
      if (
        this.user.permissions.includes("add-announcements") &&
        this.user.permissions.includes("view-teachers") &&
        this.$route.name === "view-teachers"
      ) {
        return "show";
      } else {
        return "hide";
      }
    },
    altImage($event) {
      $event.target.src = require("@/assets/images/icons/user-avatar.png");
    },
    goToAnnouncements(itemId) {
      this.$store.commit("SET_TEACHER_ID", itemId);
      this.$router.push("/dashboard/advertisements/add");
    },
    async downloadImg(item) {
      window.open(item.url, "_blank", "noreferrer");
      // try {
      //   const response = await axios.get(`${item.url}`, {
      //     responseType: 'arraybuffer'
      //   });
      //   const blob = new Blob([response.data], {type: response.headers['content-type']})
      //   const link = document.createElement('a')
      //   link.href = window.URL.createObjectURL(blob)
      //   link.click()
      //   window.URL.revokeObjectURL(link.href)
      // } catch (error) {
      //   console.error('Error downloading image', error);
      // }
    },
    // goToAddVideo(videoId) {
    //   this.$router.push(`/dashboard/video/${videoId}/questions`);
    // },
    sortBy(key) {
      this.formValues.order_by = key;
      this.formValues.order = this.switchSort;
      this.$emit("refetch", this.formValues);
      if (this.formValues.order === "DESC") {
        this.switchSort = "ASC";
      } else {
        this.switchSort = "DESC";
      }
    },
  },
  updated() {
    // To ADD TH TEXT INSIDE TD ATTR
    const htmlDoc = document.documentElement;
    htmlDoc.setAttribute("lang", this.$i18n.locale === "ar" ? "ar" : "en");
    htmlDoc.setAttribute("dir", this.$i18n.locale === "ar" ? "rtl" : "ltr");
    const tables = document.querySelectorAll(".table");
    tables.forEach((table) => {
      var headertext = [],
        headers = table.querySelectorAll("table th"),
        tablerows = table.querySelectorAll("table th"),
        tablebody = table.querySelector("table tbody");
      for (var i = 0; i < headers.length; i++) {
        var current = headers[i];
        headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
      }
      if (tablebody !== null) {
        for (var i = 0, row; (row = tablebody.rows[i]); i++) {
          for (var j = 0, col; (col = row.cells[j]); j++) {
            if (headertext[j] != undefined) {
              col.setAttribute("data-th", headertext[j]);
            }
          }
        }
      }
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
