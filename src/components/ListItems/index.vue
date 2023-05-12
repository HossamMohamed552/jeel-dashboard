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
          <option v-for="sort in  sortArray" :id="sort.id" @change="sortBy(sort)" :value="sort.value">{{ sort.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="hold-table">
      <b-table :head-variant="'gradient'" responsive striped :items="items" :fields="fields"></b-table>
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
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
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
            value:'aec',
            name: 'تصاعديا',
          },
          {
            id: 2,
            value: 'dec',
            name: 'تنازليا',
          }
        ]
      }
    }
  },
  watch: {
    vSearchModel(newVal) {
      this.inputValue = newVal
    },
    inputValue(newVal) {
      this.$emit('searchBy', newVal)
    }
  },
  methods: {
    sortBy(sort) {
      this.$emit('sortBy', sort)
    }
  },
  mounted() {
    console.log('process.env.VUE_APP_BASE_URL', process.env.VUE_APP_BASE_URL)
    this.ApiService(getAllUsersRequest()).then((response)=>{
      console.log('response', response)
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
