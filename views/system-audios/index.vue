<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الاصوات'"
      :number-of-item="totalNumber"
      :tableItems="systemAudiosList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSystemAudios"
      :loading="loading"
      :permission_edit="'edit-system-audio'"
      :permission_view="'show-system-audio'"
    />
  </section>
</template>

<script>
import ListItems from "@/components/ListItems/index.vue";
import { getSystemAudiosRequest } from "@/api/system-audios";

export default {
  components: { ListItems },
  data() {
    return {
      loading: false,
      groupSearchWord: "",
      questionsList: [],
      systemAudiosList: [],
      totalNumber: 3,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "category.name", label: "التصنيف" },
        { key: "name.ar", label: "اسم الصوت بالعربية" },
        { key: "audio_ar", label: "الصوت" },
        { key: "name.en", label: "اسم الصوت بالانجليزية" },
        { key: "audio_en", label: "الصوت" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    getSystemAudios(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSystemAudiosRequest(params))
        .then((response) => {
          this.systemAudiosList = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push({
        name: "show-system-audios",
        params: {
          id: $event.category.id,
          name: $event.name,
        },
      });
    },
    editItem($event) {
      this.$router.push({
        name: "edit-system-audios",
        params: {
          id: $event.category.id,
          name: $event.name,
        },
      });
    },
  },
  mounted() {
    this.getSystemAudios();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
