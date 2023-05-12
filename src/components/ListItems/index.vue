<template>
  <section class="list">
    <div class="header">
      <div class="list-of-item">
        <p class="name-of-item">{{ headerName }}</p>
        <span class="no-of-item">{{ numberOfItem }}</span>
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
      <b-table :head-variant="'gradient'" responsive striped :items="items" :fields="fields">
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
        <template #head(updated_at)="data">
          <span class="d-none"></span>
        </template>
        <template #head(created_at)="data">
          <span class="d-none"></span>
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
          <span class="d-none"></span>
        </template>
        <template #head(useremail)="data">
          <span class="d-none"></span>
        </template>

        <template #cell(updated_at)="data">
          <span class="d-none"></span>
        </template>
        <template #cell(avatar)="data">
          <div class="hold-image">
            <img class="image-in-table" :src="data.value">
          </div>
        </template>
        <template #cell(status)="data">
          <span>{{ data.value === 1 ? "مفتوح" :"مغلق" }}</span>
        </template>
        <template #cell(music_status)="data">
          <span>{{ data.value === 1 ? "متاح" :"غير متاح" }}</span>
        </template>
        <template #cell(country)="data">
          <span>{{ data.value.name }}</span>
        </template>
        <template #cell(owner)="data">
          <span>{{ data.value.email }}</span>
        </template>
        <template #cell(created_at)="data">
          <span class="d-none"></span>
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
      </b-table>
    </div>
  </section>
</template>
<script>
import {getAllUsersRequest} from "@/api/user";

export default {
  name: "index",
  data() {
    return {
      inputValue: "",
      fields: [],
      items: [
        {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
        {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
        {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
        {age: 38, first_name: 'Jami', last_name: 'Carney'}
      ],
    }
  },
  props: {
    headerName: {
      type: String,
      default: "header name"
    },
    numberOfItem: {
      type: Number,
      default: 5
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
    }
  },
  methods: {
    sortBy(sort) {
      this.$emit('sortBy', sort)
    }
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
