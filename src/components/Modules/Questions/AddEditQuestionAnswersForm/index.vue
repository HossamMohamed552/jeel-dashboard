<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-question-form">
        <slot v-if="questionSlug.slug === 'choose_answer'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.question"
                      :label="$t('QUESTIONS.QUESTION')"
                      :name="$t('QUESTIONS.QUESTION')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.question_audio ? formValues.question_audio : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.hint"
                      :label="$t('QUESTIONS.HINT')"
                      :name="$t('QUESTIONS.HINT')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
              </b-row>
              <!-- --answersList: {{ answersList }} -->
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListMcQ" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="answer.answer"
                      :label="$t('QUESTIONS.ANSWER')"
                      :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                      :id="`ANSWER ${idx}`"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="answer.audio ? answer.audio : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <SelectSearch
                      v-model="answer.correct"
                      :label="$t('QUESTIONS.ANSWER_TYPE')"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerMcQ($event,answersListMcQ)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span class="success" v-if="answersListMcQ.length - 1 === idx"
                          @click="addAnswerMcq">إضافة</span>
                    <span class="mx-3 danger" v-if="answersListMcQ.length > 1"
                          @click="answersListMcQ.splice(idx, 1)">حذف</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button type="submit" :loading="loading"
                            :disabled="invalid || answersListMcQ.length <= 1 || checkOneCorrectAnswerMcq"
                            :custom-class="'submit-btn'">
                      {{ $t("GLOBAL_NEXT") }}
                    </Button>
                    <Button class="mx-3" @click="handleBack" :custom-class="'submit-btn back-btn'">
                      {{ $t("GLOBAL_BACK") }}
                    </Button>
                  </div>
                  <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </slot>
        <slot v-if="questionSlug.slug === 'chosse_answers'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.question"
                      :label="$t('QUESTIONS.QUESTION')"
                      :name="$t('QUESTIONS.QUESTION')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.question_audio ? formValues.question_audio : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.hint"
                      :label="$t('QUESTIONS.HINT')"
                      :name="$t('QUESTIONS.HINT')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListSelect" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="answer.answer"
                      :label="$t('QUESTIONS.ANSWER')"
                      :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                      :id="`ANSWER ${idx}`"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="answer.audio ? answer.audio : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <SelectSearch
                      v-model="answer.correct"
                      :label="$t('QUESTIONS.ANSWER_TYPE')"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerSelect($event,answersListSelect)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span class="success" v-if="answersListSelect.length - 1 === idx"
                          @click="addAnswerSelect">إضافة</span>
                    <span class="mx-3 danger" v-if="answersListSelect.length > 1"
                          @click="answersListSelect.splice(idx, 1)">حذف</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button type="submit" :loading="loading"
                            :disabled="invalid || answersListSelect.length <= 1 || checkMultiCorrectAnswerSelect"
                            :custom-class="'submit-btn'">
                      {{ $t("GLOBAL_NEXT") }}
                    </Button>
                    <Button class="mx-3" @click="handleBack" :custom-class="'submit-btn back-btn'">
                      {{ $t("GLOBAL_BACK") }}
                    </Button>
                  </div>
                  <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </slot>
        <slot v-if="questionSlug.slug === 'chosse_true_false'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.question"
                      :label="$t('QUESTIONS.QUESTION')"
                      :name="$t('QUESTIONS.QUESTION')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.question_audio ? formValues.question_audio : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.hint"
                      :label="$t('QUESTIONS.HINT')"
                      :name="$t('QUESTIONS.HINT')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListTrueFalse" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <TextField v-model="answer.answer" :label="$t('QUESTIONS.ANSWER')"
                               :name="`${$t('QUESTIONS.ANSWER')} ${idx}`" :id="`ANSWER ${idx}`"
                               disabled="disabled"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>
                    <ValidationProvider v-slot="{ errors }"
                                        :rules="$route.params.id ? '' : 'required'" name="audio">
                      <b-form-file accept="audio/*"
                                   :placeholder="answer.audio ? answer.audio : 'اختر ملف'"
                                   v-model="answer.audio" name="audio"></b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <SelectSearch
                      v-model="answer.correct"
                      :label="$t('QUESTIONS.ANSWER_TYPE')"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="checkAnswerTureFalse($event, answersListTrueFalse)"
                    ></SelectSearch>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button type="submit" :loading="loading"
                            :disabled="invalid || checkOneAnswerTureFalse"
                            :custom-class="'submit-btn'">{{ $t("GLOBAL_NEXT") }}
                    </Button>
                    <Button class="mx-3" @click="handleBack" :custom-class="'submit-btn back-btn'">
                      {{ $t("GLOBAL_BACK") }}
                    </Button>
                  </div>
                  <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </slot>
        <slot v-if="questionSlug.slug === 'drag_and_drop_one'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.question"
                      :label="$t('QUESTIONS.QUESTION')"
                      :name="$t('QUESTIONS.QUESTION')"
                      :rules="'required'"
                    ></TextField>
                    <div class="preview-question-heading">عرض السؤال</div>
                    <div v-html="previewQuestion"
                         class="preview-question d-flex align-items-center my-3"></div>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <label class="invisible">إضافه مساحه خالية</label>
                  <div class="hold-field d-flex justify-content-between align-items-center">
                    <Button :custom-class="'rounded-btn'" @click="addSpace" :disabled="lockBtn">
                      إضافه مساحه خالية
                    </Button>
                    <Button :custom-class="'rounded-btn transparent-btn'" @click="removeSpace">
                      إعاده ضبط
                    </Button>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.question_audio ? formValues.question_audio : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.hint"
                      :label="$t('QUESTIONS.HINT')"
                      :name="$t('QUESTIONS.HINT')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListDragOne" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <TextField v-model="answer.answer" :label="$t('QUESTIONS.ANSWER')"
                               :name="`${$t('QUESTIONS.ANSWER')} ${idx}`" :id="`ANSWER ${idx}`"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>
                    <ValidationProvider v-slot="{ errors }"
                                        :rules="$route.params.id ? '' : 'required'" name="audio">
                      <b-form-file accept="audio/*"
                                   :placeholder="answer.audio ? answer.audio : 'اختر ملف'"
                                   v-model="answer.audio" name="audio"></b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <SelectSearch
                      v-model="answer.correct"
                      :label="$t('QUESTIONS.ANSWER_TYPE')"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="checkAnswerDragOne($event, answersListDragOne)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span class="success" v-if="answersListDragOne.length - 1 === idx"
                          @click="addAnswerDragOne">إضافة</span>
                    <span class="mx-3 danger" v-if="answersListDragOne.length > 1"
                          @click="answersListDragOne.splice(idx, 1)">حذف</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button type="submit" :loading="loading"
                            :disabled="invalid || checkOneAnswerDragOne || answersListDragOne.length <=1"
                            :custom-class="'submit-btn'">{{ $t("GLOBAL_NEXT") }}
                    </Button>
                    <Button class="mx-3" @click="handleBack" :custom-class="'submit-btn back-btn'">
                      {{ $t("GLOBAL_BACK") }}
                    </Button>
                  </div>
                  <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </slot>
        <slot v-if="questionSlug.slug === 'drag_and_drop_many'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.question"
                      :label="$t('QUESTIONS.QUESTION')"
                      :name="$t('QUESTIONS.QUESTION')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.question_audio ? formValues.question_audio : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback
                        v-for="(error, index) in errors"
                        :key="index"
                      >
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="12" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="formValues.hint"
                      :label="$t('QUESTIONS.HINT')"
                      :name="$t('QUESTIONS.HINT')"
                      :rules="'required'"
                    ></TextField>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="7">
                  <b-row>
                    <b-col lg="12" class="mb-3">
                      <div class="hold-field">
                        <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                      </div>
                    </b-col>
                    <slot v-for="(answer, idx) in answersListDragSort">
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <TextField v-model="answer.answer" :label="$t('QUESTIONS.ANSWER')"
                                     :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                                     :id="`ANSWER ${idx}`"
                          ></TextField>
                        </div>
                      </b-col>
                      <b-col lg="4" class="mb-3">
                        <div class="hold-field">
                          <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>
                          <ValidationProvider v-slot="{ errors }"
                                              :rules="$route.params.id ? '' : 'required'"
                                              name="audio">
                            <b-form-file accept="audio/*"
                                         :placeholder="answer.audio ? answer.audio : 'اختر ملف'"
                                         v-model="answer.audio" name="audio"></b-form-file>
                            <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                              {{ error }}
                            </b-form-invalid-feedback>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col lg="2" class="btn-holder">
                        <div class="hold-field">
                                          <span class="success"
                                                v-if="answersListDragSort.length - 1 === idx"
                                                @click="addAnswerDragSort">إضافة</span>
                          <span class="mx-3 danger" v-if="answersListDragSort.length > 1"
                                @click="answersListDragSort.splice(idx, 1)">حذف</span>
                        </div>
                      </b-col>
                    </slot>
                  </b-row>
                </b-col>

                <b-col lg="5">
                  <b-row>
                    <b-col lg="12" class="mb-3">
                      <div class="hold-field">
                        <label class="mx-0">{{ $t("QUESTIONS.sortAnswers") }}:</label>
                      </div>
                    </b-col>
                    <draggable v-model="answersListDragSort" group="items" :animation="150"
                               class="list-group" :sort="true" v-if="answersListDragSort.length>=2">
                      <div v-for="(item,index) in answersListDragSort" :key="item.id"
                           class="list-group-item">
                        <p class="answer-name">{{ index + 1 }} - {{ item.answer }}</p>
                      </div>
                    </draggable>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button type="submit" :loading="loading"
                            :disabled="invalid || answersListDragSort.length < 2"
                            :custom-class="'submit-btn'">{{ $t("GLOBAL_NEXT") }}
                    </Button>
                    <Button class="mx-3" @click="handleBack" :custom-class="'submit-btn back-btn'">
                      {{ $t("GLOBAL_BACK") }}
                    </Button>
                  </div>
                  <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import getData from "@/mixins/getData/getData";
import draggable from "vuedraggable";

export default {
  mixins: [getData("question")],
  components: {
    draggable,
    TextField,
    SelectSearch,
    Button,
  },
  props: {
    questionSlug: {
      type: Object,
      default: function () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lockBtn: false,
      previewQuestion: "",
      checkOneCorrectAnswerMcq: true,
      checkOneAnswerTureFalse: true,
      checkOneAnswerDragOne: true,
      checkMultiCorrectAnswerSelect: true,
      formValues: {
        question: "",
        hint: "",
        question_audio: null,
        answers: [],
      },
      answersListDragSort: [
        {
          answer: "",
          order: 0,
          audio: null,
          correct: 0
        }
      ],
      answersListMcQ: [
        {
          answer: "",
          audio: null,
          correct: 0
        },
      ],
      answersListSelect: [
        {
          answer: "",
          audio: null,
          correct: 0
        },
      ],
      answersListDragOne: [
        {
          answer: "",
          audio: null,
          correct: 0
        },
      ],
      answersListTrueFalse: [
        {
          answer: "صحيح",
          audio: null,
          correct: 0
        },
        {
          answer: "خطأ",
          audio: null,
          correct: 0
        },
      ],
      correctList: [
        {
          id: 1,
          name: "إجابة صحيحة",
        },
        {
          id: 0,
          name: "إجابة خطأ",
        },
      ],
      answersDragSortToSend: []
    };
  },
  methods: {
    addSpace() {
      this.formValues.question += '%s'
      this.lockBtn = true
      this.previewQuestion = this.formValues.question
    },
    removeSpace() {
      this.formValues.question = this.formValues.question.replace(/%s/g, '')
      this.lockBtn = false
      this.previewQuestion = this.formValues.question
    },
    answerMcQ($event, answersListMcQ) {
      let checkOneCorrect = answersListMcQ.filter((item) => item.correct === 1)
      if (checkOneCorrect.length >= 2) {
        this.checkOneCorrectAnswerMcq = true
      } else if (checkOneCorrect.length === 1) {
        this.checkOneCorrectAnswerMcq = false
      } else {
        this.checkOneCorrectAnswerMcq = true
      }
    },
    answerSelect($event, answersListSelect) {
      let checkOneWrong = answersListSelect.filter((item) => item.correct === 0)
      let checkOneCorrect = answersListSelect.filter((item) => item.correct === 1)
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 1) {
        this.checkMultiCorrectAnswerSelect = false
      } else {
        this.checkMultiCorrectAnswerSelect = true
      }
    },
    checkAnswerTureFalse($event, answersListTrueFalse) {
      let checkOneCorrect = answersListTrueFalse.filter((item) => item.correct === 1)
      if (checkOneCorrect.length === 1) {
        this.checkOneAnswerTureFalse = false
      } else {
        this.checkOneAnswerTureFalse = true
      }
    },
    checkAnswerDragOne($event, answersListDragOne) {
      let checkOneCorrect = answersListDragOne.filter((item) => item.correct === 1)
      if (checkOneCorrect.length === 1) {
        this.checkOneAnswerDragOne = false
      } else {
        this.checkOneAnswerDragOne = true
      }
    },
    onSubmit() {
      if (this.questionSlug.slug === 'choose_answer') {
        this.assignAnswersMcq();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === 'chosse_true_false') {
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === 'chosse_answers') {
        this.assignAnswersSelect();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === 'drag_and_drop_one') {
        this.assignAnswersDragOne();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === 'drag_and_drop_many') {
        this.assignAnswersDragSort();
        this.$emit("onSubmit", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    addAnswerSelect() {
      this.answersListSelect.push({
        answer: "",
        audio: null,
        correct: 0
      });
    },
    addAnswerMcq() {
      this.answersListMcQ.push({
        answer: "",
        audio: null,
        correct: 0
      });
    },
    addAnswerDragOne() {
      this.answersListDragOne.push({
        answer: "",
        audio: null,
        correct: 0
      });
    },
    addAnswerDragSort() {
      this.answersListDragSort.push({
        answer: "",
        order: 0,
        audio: null
      })
    },
    assignAnswersDragOne() {
      this.formValues.answers = this.answersListDragOne.filter(
        (answer) => answer.answer
      );
    },
    assignAnswersTrueFalse() {
      this.formValues.answers = this.answersListTrueFalse.filter(
        (answer) => answer.answer
      );
    },
    assignAnswersSelect() {
      this.formValues.answers = this.answersListSelect.filter(
        (answer) => answer.answer
      );
    },
    assignAnswersMcq() {
      this.formValues.answers = this.answersListMcQ.filter(
        (answer) => answer.answer
      );
    },
    assignAnswersDragSort() {
      this.formValues.answers = this.answersDragSortToSend
      console.log('this.formValues.answers', this.formValues.answers)
    },
  },
  watch: {
    answersListDragSort(newList) {
      newList = newList.map((item, index) => {
        return {answer: item.answer, order: index + 1, audio: item.audio, correct: 0}
      })
      this.answersDragSortToSend = newList
    },
    "formValues.question"(newVal) {
      this.lockBtn = newVal.includes('%s')
      this.previewQuestion = newVal
      this.previewQuestion = this.previewQuestion.replace(/%s/g, "<span style='display: inline-block; width: 100px; height: 50px; background: #eee; border-radius: 1rem;border: 1px solid; margin: 0 .5rem'></span>")
    },
    question(questionEdit) {
      this.formValues.question = questionEdit.question;
      this.formValues.question_audio = questionEdit.question_audio;
      this.formValues.hint = questionEdit.hint;
      this.formValues.answers = questionEdit.answers;
      this.answersListMcQ = this.formValues.answers;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
