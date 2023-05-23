import {getSingleQuestionRequest} from "@/api/question";

export default function getData (type){
  return {
    data(){
      return{
        question:null
      }
    },
    mounted() {
      if (type === 'question') {
        this.ApiService(getSingleQuestionRequest(this.$route.params.id)).then((response) => {
          this.question =  response.data.data
        })
      }
    }
  }
}
