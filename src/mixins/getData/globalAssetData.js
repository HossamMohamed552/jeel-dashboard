import {getLearningPathsRequest, getLevelsRequest} from "@/api/question";
import {getTermsRequest} from "@/api/term";
import {getCountryRequest} from "@/api/country";

export default {
  data(){
    return{
      levels: [],
      learningPaths: [],
      terms:[],
      countries:[]
    }
  },
  methods:{
    getLevels() {
      const params = {page: 1,};
      this.ApiService(getLevelsRequest(params)).then((response) => {
        this.levels = response.data.data;
      });
    },
    getLearningPaths() {
      const params = {page: 1,};
      this.ApiService(getLearningPathsRequest(params)).then((response) => {
        this.learningPaths = response.data.data;
      });
    },
    getTerms() {
      this.ApiService(getTermsRequest()).then((response) => {
        this.terms = response.data.data;
      });
    },
    getCountries() {
      this.ApiService(getCountryRequest()).then((response) => {
        this.countries = response.data.data;
      });
    }
  },
  mounted() {
    this.getLevels();
    this.getLearningPaths();
    this.getTerms();
    this.getCountries();
  },
}
