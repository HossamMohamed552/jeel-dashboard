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
    <div class="search-sort">
      <div class="search">
        <b-form-input v-model="inputValue" placeholder="بحث" class="search-input"/>
        <img src="@/assets/images/icons/search.svg">
      </div>
      <div class="sort">
        <img src="@/assets/images/icons/sort.svg">
        <select>
          <option value="" selected disabled>ترتيب حسب</option>
          <option v-for="sort in  sortArray" :id="sort.id" @change="sortBy(sort)"
                  :value="sort.value">{{ sort.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="hold-table">
      <b-table :head-variant="'gradient'" responsive striped :items="items" :fields="fieldsList">
        <template #head(id)="data">
          <span>{{ data.field.key === 'id' ? 'التسلسل' : data.field.label }}</span>
        </template>
        <template #head(first_name)="data">
          <span>{{ data.field.key === 'first_name' ? 'الاسم الاول' : data.field.label }}</span>
        </template>
        <template #head(last_name)="data">
          <span>{{ data.field.key === 'last_name' ? 'الاسم الثانى' : data.field.label }}</span>
        </template>
        <template #head(name)="data">
          <span>{{ data.field.key === 'name' ? 'الإسم' : data.field.label }}</span>
        </template>
        <template #head(email)="data">
          <span>{{ data.field.key === 'email' ? 'البريد الإلكترونى' : data.field.label }}</span>
        </template>
        <template #head(mobile)="data">
          <span>{{ data.field.key === 'mobile' ? 'الهاتف' : data.field.label }}</span>
        </template>
        <template #head(avatar)="data">
          <span>{{ data.field.key === 'avatar' ? 'الصورة' : data.field.label }}</span>
        </template>
        <template #head(status)="data">
          <span>{{ data.field.key === 'status' ? 'الحاله' : data.field.label }}</span>
        </template>
        <template #head(country)="data">
          <span>{{ data.field.key === 'country' ? 'الدولة' : data.field.label }}</span>
        </template>
        <template #head(music_status)="data">
          <span>{{ data.field.key === 'music_status' ? 'الصوت' : data.field.label }}</span>
        </template>
        <template #head(owner)="data">
          <span>{{ data.field.key === 'owner' ? 'البريد الإلكترونى' : data.field.label }}</span>
        </template>
        <template #head(school_group)="data">
          <span>{{ data.field.key === 'school_group' ? 'اسم المجموعة' : data.field.label }}</span>
        </template>
        <template #head(level_school_group)="data">
          <span>{{
              data.field.key === 'level_school_group' ? 'اسم المجموعة' : data.field.label
            }}</span>
        </template>
        <template #head(subscription_start_date)="data">
          <span>{{
              data.field.key === 'subscription_start_date' ? 'بداية التعاقد' : data.field.label
            }}</span>
        </template>
        <template #head(subscription_end_date)="data">
          <span>{{
              data.field.key === 'subscription_end_date' ? 'نهاية التعاقد' : data.field.label
            }}</span>
        </template>
        <template #head(logo)="data">
          <span>{{ data.field.key === 'logo' ? 'الشعار' : data.field.label }}</span>
        </template>
        <template #head(is_super_admin)="data">
          <span class="d-none"></span>
        </template>
        <template #head(social_media)="data">
          <span class="d-none"></span>
        </template>
        <template #head(verification_sent_at)="data">
          <span class="d-none"></span>
        </template>
        <template #head(last_attempt)="data">
          <span class="d-none"></span>
        </template>
        <template #head(username)="data">
          <span>{{ data.field.key === 'username' ? 'اسم المستخدم' : data.field.label }}</span>
        </template>
        <template #head(useremail)="data">
          <span class="d-none"></span>
        </template>

        <template #cell(avatar)="data">
          <div class="hold-image">
            <img class="image-in-table" :src="data.item.avatar">
          </div>
        </template>
        <template #cell(type)="data">
          <span>{{ data.item.type === 'international' ? 'دولى' : 'محلى'}}</span>
        </template>
        <template #cell(status)="data">
          <span>{{ data.item.status === 1 ? "مفعل" : "غير مفعل" }}</span>
        </template>
        <template #cell(music_status)="data">
          <span>{{ data.item.music_status === 1 ? "متاح" : "غير متاح"}}</span>
        </template>
        <template #cell(country)="data">
          <span>{{ data.value.name }}</span>
        </template>
        <template #cell(email.owner)="data">
          <span>{{ data.item.owner.email}}</span>
        </template>
        <template #cell(logo)="data">
          <img :src="data.item.logo">
        </template>
        <template #cell(school_type)="data">
          <span>{{ data.item.school_type.name}}</span>
        </template>
        <template #cell(school_group)="data">
          <span>{{ data.item.school_group.name}}</span>
        </template>
        <template #cell(package)="data">
          <span>{{ data.item.package.name}}</span>
        </template>
        <template #cell(question_type)="data">
          <span>{{ data.item.question_type.name}}</span>
        </template>
        <template #cell(question_difficulty)="data">
          <span>{{ data.item.question_difficulty.name}}</span>
        </template>
        <template #cell(is_super_admin)="data">
          <span class="d-none"></span>
        </template>
        <template #cell(social_media)="data">
          <span class="d-none"></span>
        </template>
        <template #cell(verification_sent_at)="data">
          <span class="d-none"></span>
        </template>
        <template #cell(last_attempt)="data">
          <span class="d-none"></span>
        </template>
        <template #cell(actions)="data">
          <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <img src="@/assets/images/icons/actions.svg">
            </template>
            <b-dropdown-item @click="detailItem(data.item.id)">{{
                $t('CONTROLS.detailBtn')
              }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="editItem(data.item.id)">{{
                $t('CONTROLS.editBtn')
              }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="deleteItem(data.item.id)">{{
                $t('CONTROLS.deleteBtn')
              }}
            </b-dropdown-item>

            <b-dropdown-item v-if="videoList" @click="addVideoQuestion(data.item.id)">{{
                $t('CONTROLS.addVideoQuestion')
              }}
            </b-dropdown-item>
          </b-dropdown>

        </template>
      </b-table>
    </div>
  </section>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      editIcon: require("@/assets/edit.svg"),
      deleteIcon: require("@/assets/delete.svg"),
      inputValue: "",
      items: [],
    }
  },
  props: {
    headerName: {
      type: String,
      default: ""
    },
    numberOfItem: {
      type: Number,
      default: 0
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
            value: 'aec',
            name: 'تصاعديا',
          },
          {
            id: 2,
            value: 'dec',
            name: 'تنازليا',
          }
        ]
      }
    },
    tableItems: {
      type: Array,
      default: function () {
        return []
      }
    },
    fieldsList: {
      type: Array,
      default: () => []
    },
    videoList:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    vSearchModel(newVal) {
      this.inputValue = newVal
    },
    inputValue(newVal) {
      this.$emit('searchBy', newVal)
    },
    tableItems(newVal) {
      this.items = newVal
    },
  },
  methods: {
    sortBy(sort) {
      this.$emit('sortBy', sort)
    },
    detailItem(id) {
      this.$emit('detailItem', id)
    },
    editItem(id) {
      this.$emit('editItem', id)
    },
    deleteItem(id) {
      this.$emit('deleteItem', id)
    },
    addVideoQuestion(id){
      this.$emit('addVideoQuestion', id)
    }
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
