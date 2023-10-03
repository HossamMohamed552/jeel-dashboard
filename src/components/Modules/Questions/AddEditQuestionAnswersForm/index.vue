<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-question-form">
        <!--        mcq_text_text_one_option-->
        <slot v-if="questionSlug.slug === 'mcq_text_text_one_option'">
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
                        :placeholder="formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
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
                        :placeholder="answer.audio ? answer.audio.name: 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerMcQ($event, answersListMcQ)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListMcQ.length - 1 === idx"
                      @click="addAnswerMcq"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListMcQ.length > 1"
                      @click="answersListMcQ.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListMcQ.length <= 1 || checkOneCorrectAnswerMcq"
                      :custom-class="'submit-btn'"
                    >
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
        <!--        mcq_image_images_one_option-->
        <slot v-if="questionSlug.slug === 'mcq_image_images_one_option'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE')"
                      @imageUpload="handleUploadImage"
                      @deleteImage="formValues.question = formValues.questionImage = null"
                      :item-image="formValues.questionImage"
                    />
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
                        :placeholder="formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListMcQImage" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                      @imageUpload="handleUploadImageOnAnswers(answer,$event)"
                      @deleteImage="answer.answer = answer.answerImage= null"
                      :item-image="answer.answerImage"
                    />
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answersMcQImage($event, answersListMcQImage)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListMcQImage.length - 1 === idx"
                      @click="addAnswerMcqImage"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListMcQImage.length > 1"
                      @click="answersListMcQImage.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListMcQImage.length <= 1 || checkOneCorrectAnswerMcq"
                      :custom-class="'submit-btn'"
                    >
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
        <!--        mcq_voice_images_one_option-->
        <slot v-if="questionSlug.slug === 'mcq_voice_images_one_option'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="12" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider v-slot="{ errors }"
                                        :rules="$route.params.id ? '' : 'required'" name="audio">
                      <b-form-file accept="audio/*"
                                   :placeholder=" formValues.question ? formValues.question.name : 'اختر ملف'"
                                   v-model="formValues.question" name="audio">
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListMcQImage" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                      @imageUpload="handleUploadImageOnAnswers(answer,$event)"
                      @deleteImage="answer.answer = answer.answerImage= null"
                      :item-image="answer.answerImage"
                    />
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answersMcQImage($event, answersListMcQImage)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListMcQImage.length - 1 === idx"
                      @click="addAnswerMcqImage"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListMcQImage.length > 1"
                      @click="answersListMcQImage.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListMcQImage.length <= 1 || checkOneCorrectAnswerMcq"
                      :custom-class="'submit-btn'"
                    >
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
        <!--        mcq_voice_text_one_option-->
        <slot v-if="questionSlug.slug === 'mcq_voice_text_one_option'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="12" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider v-slot="{ errors }"
                                        :rules="$route.params.id ? '' : 'required'" name="audio">
                      <b-form-file accept="audio/*"
                                   :placeholder="formValues.question ? formValues.question.name : 'اختر ملف'"
                                   v-model="formValues.question" name="audio">
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerMcQ($event, answersListMcQ)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListMcQ.length - 1 === idx"
                      @click="addAnswerMcq"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListMcQ.length > 1"
                      @click="answersListMcQ.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListMcQ.length <= 1 || checkOneCorrectAnswerMcq"
                      :custom-class="'submit-btn'"
                    >
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
        <!--        mcq_text_text_multi_option-->
        <slot v-if="questionSlug.slug === 'mcq_text_text_multi_option'">
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerSelect($event, answersListSelect)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListSelect.length - 1 === idx"
                      @click="addAnswerSelect"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListSelect.length > 1"
                      @click="answersListSelect.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="
                        invalid || answersListSelect.length <= 1 || checkMultiCorrectAnswerSelect
                      "
                      :custom-class="'submit-btn'"
                    >
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
        <!--        true_false_text_question-->
        <slot v-if="questionSlug.slug === 'true_false_text_question'">
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListTrueFalse" :key="idx">
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="answer.answer"
                      :label="$t('QUESTIONS.ANSWER')"
                      :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                      :id="`ANSWER ${idx}`"
                      disabled="disabled"
                    ></TextField>
                  </div>
                </b-col>
                <!--                <b-col lg="4" class="mb-3">-->
                <!--                  <div class="hold-field">-->
                <!--                    <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>-->
                <!--                    <ValidationProvider-->
                <!--                      v-slot="{ errors }"-->
                <!--                      :rules="$route.params.id ? '' : 'required'"-->
                <!--                      name="audio"-->
                <!--                    >-->
                <!--                      <b-form-file-->
                <!--                        accept="audio/*"-->
                <!--                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"-->
                <!--                        v-model="answer.audio"-->
                <!--                        name="audio"-->
                <!--                      ></b-form-file>-->
                <!--                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">-->
                <!--                        {{ error }}-->
                <!--                      </b-form-invalid-feedback>-->
                <!--                    </ValidationProvider>-->
                <!--                  </div>-->
                <!--                </b-col>-->
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
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
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkOneAnswerTureFalse"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        true_false_image_question-->
        <slot v-if="questionSlug.slug === 'true_false_image_question'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE')"
                      @imageUpload="handleUploadImage"
                      @deleteImage="formValues.question = formValues.questionImage = null"
                      :item-image="formValues.questionImage"
                    />
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListTrueFalse" :key="idx">
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="answer.answer"
                      :label="$t('QUESTIONS.ANSWER')"
                      :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                      :id="`ANSWER ${idx}`"
                      disabled="disabled"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
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
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkOneAnswerTureFalse"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        true_false_voice_question-->
        <slot v-if="questionSlug.slug === 'true_false_voice_question'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="12" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label>
                    <ValidationProvider v-slot="{ errors }"
                                        :rules="$route.params.id ? '' : 'required'" name="audio">
                      <b-form-file accept="audio/*"
                                   :placeholder=" formValues.question ? formValues.question.name : 'اختر ملف'"
                                   v-model="formValues.question" name="audio">
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListTrueFalse" :key="idx">
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="answer.answer"
                      :label="$t('QUESTIONS.ANSWER')"
                      :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                      :id="`ANSWER ${idx}`"
                      disabled="disabled"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
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
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkOneAnswerTureFalse"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        mcq_multi_images-->
        <slot v-if="questionSlug.slug === 'mcq_multi_images'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE')"
                      @imageUpload="handleUploadImage"
                      @deleteImage="formValues.question = formValues.questionImage = null"
                      :item-image="formValues.questionImage"
                    />
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
                        :placeholder="formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListSelectImage" :key="idx">
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                      @imageUpload="handleUploadImageOnAnswers(answer,$event)"
                      @deleteImage="answer.answer = answer.answerImage= null"
                      :item-image="answer.answerImage"
                    />
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerSelectImage($event, answersListSelectImage)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListSelectImage.length - 1 === idx"
                      @click="addAnswerSelectImage"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListSelectImage.length > 1"
                      @click="answersListSelectImage.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListSelectImage.length <= 1 || checkMultiCorrectAnswerSelect"
                      :custom-class="'submit-btn'"
                    >
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
        <!--        mcq_mtli_voices-->
        <slot v-if="questionSlug.slug === 'mcq_mtli_voices'">
          <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="8" class="mb-3">
                  <div class="hold-field">
                    <ImageUploader
                      :name="'questionImage'"
                      :text="$t('QUESTIONS.UPLOAD_IMAGE')"
                      @imageUpload="handleUploadImage"
                      @deleteImage="formValues.question = formValues.questionImage = null"
                      :item-image="formValues.questionImage"
                    />
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
                        :placeholder="formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'"
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListSelectAudio" :key="idx">
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
                      :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                      :id="idx"
                      :options="correctList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      @input="answerSelectAudio($event, answersListSelectAudio)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListSelectAudio.length - 1 === idx"
                      @click="addAnswerSelectAudio"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListSelectAudio.length > 1"
                      @click="answersListSelectAudio.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListSelectAudio.length <= 1 || checkMultiCorrectAnswerSelect"
                      :custom-class="'submit-btn'"
                    >
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
        <!--        drag_and_drop_text_text-->
        <slot v-if="questionSlug.slug === 'drag_and_drop_text_text'">
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
                    <div
                      v-html="previewQuestion"
                      class="preview-question d-flex align-items-center my-3"
                    ></div>
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      ></b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
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
                    <span
                      class="success"
                      v-if="answersListDragOne.length - 1 === idx"
                      @click="addAnswerDragOne"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListDragOne.length > 1"
                      @click="answersListDragOne.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkOneAnswerDragOne || answersListDragOne.length <= 1"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        drag_and_drop_text_image_text-->
        <slot v-if="questionSlug.slug === 'drag_and_drop_text_image_text'">
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
                    <div
                      v-html="previewQuestion"
                      class="preview-question d-flex align-items-center my-3"
                    ></div>
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="12">
                  <b-row>
                    <b-col lg="4">
                      <div class="hold-field">
                        <ImageUploader
                          :name="'questionImage'"
                          :text="$t('QUESTIONS.UPLOAD_IMAGE')"
                          @imageUpload="handleUploadDragImage"
                          @deleteImage="formValues.question_image = formValues.questionImage = null"
                          :item-image="formValues.questionImage"
                        />
                      </div>
                    </b-col>
                    <b-col lg="8">
                      <b-row>
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
                        <b-col lg="4" class="mb-3">
                          <div class="hold-field">
                            <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                            <ValidationProvider
                              v-slot="{ errors }"
                              :rules="$route.params.id ? '' : 'required'"
                              name="audio"
                            >
                              <b-form-file
                                accept="audio/*"
                                :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                                v-model="formValues.hint_audio"
                                name="audio"
                              >
                              </b-form-file>
                              <b-form-invalid-feedback v-for="(error, index) in errors"
                                                       :key="index">
                                {{ error }}
                              </b-form-invalid-feedback>
                            </ValidationProvider>
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
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
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      ></b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t('QUESTIONS.ANSWER_TYPE') }}</label>
                    <SelectSearch
                      v-model="answer.correct"
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
                    <span
                      class="success"
                      v-if="answersListDragOne.length - 1 === idx"
                      @click="addAnswerDragOne"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListDragOne.length > 1"
                      @click="answersListDragOne.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkOneAnswerDragOne || answersListDragOne.length <= 1"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        order_text_with_question-->
        <slot
          v-if="questionSlug.slug === 'order_text_with_question' || questionSlug.slug === 'order_text_without_question'">
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
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
                              :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                              v-model="answer.audio"
                              name="audio"
                            ></b-form-file>
                            <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                              {{ error }}
                            </b-form-invalid-feedback>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col lg="2" class="btn-holder">
                        <div class="hold-field">
                          <span
                            class="success"
                            v-if="answersListDragSort.length - 1 === idx"
                            @click="addAnswerDragSort"
                          >إضافة</span
                          >
                          <span
                            class="mx-3 danger"
                            v-if="answersListDragSort.length > 1"
                            @click="answersListDragSort.splice(idx, 1)"
                          >حذف</span
                          >
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
                    <draggable
                      v-model="answersListDragSort"
                      group="items"
                      :animation="150"
                      class="list-group"
                      :sort="true"
                      v-if="answersListDragSort.length >= 2"
                    >
                      <div
                        v-for="(item, index) in answersListDragSort"
                        :key="item.id"
                        class="list-group-item"
                      >
                        <p class="answer-name">{{ index + 1 }} - {{ item.answer }}</p>
                      </div>
                    </draggable>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListDragSort.length < 2"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        order_image_without_question-->
        <slot v-if="questionSlug.slug === 'order_image_without_question'">
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
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
                    <slot v-for="(answer, idx) in answersListDragSortImage">
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <ImageUploader
                            :name="'questionImage'"
                            :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                            @imageUpload="handleUploadImageOnAnswers(answer,$event)"
                            @deleteImage="answer.answer = answer.answerImage= null"
                            :item-image="answer.answerImage"
                          />
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
                              :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                              v-model="answer.audio"
                              name="audio"
                            ></b-form-file>
                            <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                              {{ error }}
                            </b-form-invalid-feedback>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col lg="2" class="btn-holder">
                        <div class="hold-field">
                          <span
                            class="success"
                            v-if="answersListDragSortImage.length - 1 === idx"
                            @click="addAnswerDragSortImage"
                          >إضافة</span
                          >
                          <span
                            class="mx-3 danger"
                            v-if="answersListDragSortImage.length > 1"
                            @click="answersListDragSortImage.splice(idx, 1)"
                          >حذف</span
                          >
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
                    <draggable
                      v-model="answersListDragSortImage"
                      group="items"
                      :animation="150"
                      class="list-group"
                      :sort="true"
                      v-if="answersListDragSortImage.length >= 2"
                    >
                      <div
                        v-for="(item, index) in answersListDragSortImage"
                        :key="item.id"
                        class="list-group-item"
                      >
                        <p>{{ index + 1 }} -</p>
                        <div class="d-flex justify-content-center align-items-center"
                             v-if="item.answerImage">
                          <img class="answer-img" :src="item.answerImage"/>
                        </div>
                      </div>
                    </draggable>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListDragSortImage.length < 2"
                      :custom-class="'submit-btn'"
                    >{{ $t("GLOBAL_NEXT") }}
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
        <!--        match_one_to_one-->
        <slot v-if="questionSlug.slug === 'match_one_to_one'">
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
                        :placeholder="
                          formValues.question_audio ? formValues.question_audio.name : 'اختر ملف'
                        "
                        v-model="formValues.question_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
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
                <b-col lg="4" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'"
                        v-model="formValues.hint_audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
              </b-row>

              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label class="mx-0">{{ $t("QUESTIONS.ANSWERS") }}:</label>
                </div>
              </b-col>
              <b-row v-for="(answer, idx) in answersListMatchOneToOne" :key="idx">
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <<<<<<< HEAD
                    <label>{{ $t('QUESTIONS.ANSWER') }}</label>
                    =======
                    <label>{{ $t("QUESTIONS.ANSWER") }}</label>
                    >>>>>>> 95ce408c5bab5c96cda8cf47e838dfb9e81d43cc
                    <TextField
                      v-model="answer.answer"
                      :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                      :id="`ANSWER ${idx}`"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="$route.params.id ? '' : 'required'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                        v-model="answer.audio"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col col="8" v-for="(answerTo, idx) in answer.answers_to" :key="idx">
                  <b-row>
                    <b-col lg="6" class="mb-3">
                      <div class="hold-field">
                        <TextField
                          v-model="answerTo.answer"
                          :label="$t('QUESTIONS.ANSWER_MATCH_TO')"
                          :name="`${$t('QUESTIONS.ANSWER_MATCH_TO')} ${idx}`"
                          :id="`ANSWER ${idx}`"
                        ></TextField>
                      </div>
                    </b-col>
                    <b-col lg="6" class="mb-3">
                      <div class="hold-field">
                        <label>{{ $t("QUESTIONS.QUESTION_ANSWER_MATCH_TO_AUDIO") }}</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          :rules="$route.params.id ? '' : 'required'"
                          name="audio"
                        >
                          <b-form-file
                            accept="audio/*"
                            :placeholder="answerTo.audio ? answerTo.audio.name : 'اختر ملف'"
                            v-model="answerTo.audio"
                            name="audio"
                          >
                          </b-form-file>
                          <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                            {{ error }}
                          </b-form-invalid-feedback>
                        </ValidationProvider>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col lg="2" class="btn-holder">
                  <div class="hold-field">
                    <span
                      class="success"
                      v-if="answersListMatchOneToOne.length - 1 === idx"
                      @click="addAnswerMatchOneToOne"
                    >إضافة</span
                    >
                    <span
                      class="mx-3 danger"
                      v-if="answersListMatchOneToOne.length > 1"
                      @click="answersListMatchOneToOne.splice(idx, 1)"
                    >حذف</span
                    >
                  </div>
                </b-col>
                <b-col lg="12">
                  <hr class="my-4"/>
                </b-col>
              </b-row>
              <b-row>
                <div class="action-holder">
                  <div>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || answersListMatchOneToOne.length <= 1"
                      :custom-class="'submit-btn'"
                    >
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
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";

export default {
  mixins: [getData("question")],
  components: {
    ImageUploader,
    draggable,
    TextField,
    SelectSearch,
    Button,
  },
  props: {
    questionSlug: {
      type: Object,
      default: function () {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    questionPattern: {
      type: String,
      default: "text",
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
        question: null,
        hint: null,
        question_audio: null,
        question_audioUser: null,
        hint_audio: null,
        answers: [],
        questionImage: null,
        question_image: null,
        img_url: "",
      },
      answersListDragSort: [
        {
          answer: "",
          order: 0,
          audio: null,
          correct: 0,
          answerImage: null
        },
      ],
      answersListDragSortImage: [
        {
          answer: null,
          order: 0,
          audio: null,
          correct: 0,
          answerImage: null
        },
      ],
      answersListMcQ: [
        {
          answer: "",
          audio: null,
          correct: 0,
          answer_pattern: 'text'
        },
      ],
      answersListMcQImage: [
        {
          answer: null,
          audio: null,
          correct: 0,
          answerImage: '',
          answer_pattern: 'image'
        },
      ],
      answersListSelect: [
        {
          answer: "",
          audio: null,
          correct: 0,
          answer_pattern: 'text'
        },
      ],
      answersListSelectImage: [
        {
          answer: null,
          audio: null,
          correct: 0,
          answer_pattern: 'image',
          answerImage: null
        },
      ],
      answersListSelectAudio: [
        {
          answer: null,
          audio: null,
          correct: 0,
          answer_pattern: 'audio'
        },
      ],
      answersListDragOne: [
        {
          answer: "",
          audio: null,
          correct: 0,
          answer_pattern: 'text'
        },
      ],
      // ture false
      answersListTrueFalse: [
        {
          answer: "صحيح",
          correct: 0,
          answer_pattern: 'text'
        },
        {
          answer: "خطأ",
          correct: 0,
          answer_pattern: 'text'
        },
      ],
      answersListMatchOneToOne: [
        {
          answer: "",
          match_from: 1,
          audio: null,
          answers_to: [
            {
              answer: "",
              match_to: 1,
              audio: null,
            },
          ],
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
      answersDragSortToSend: [],
    };
  },
  methods: {
    addSpace() {
      this.formValues.question += "%s";
      this.lockBtn = true;
      this.previewQuestion = this.formValues.question;
    },
    removeSpace() {
      this.formValues.question = this.formValues.question.replace(/%s/g, "");
      this.lockBtn = false;
      this.previewQuestion = this.formValues.question;
    },
    answerMcQ($event, answersListMcQ) {
      let checkOneCorrect = answersListMcQ.filter((item) => item.correct === 1);
      if (checkOneCorrect.length >= 2) {
        this.checkOneCorrectAnswerMcq = true;
      } else if (checkOneCorrect.length === 1) {
        this.checkOneCorrectAnswerMcq = false;
      } else {
        this.checkOneCorrectAnswerMcq = true;
      }
    },
    answersMcQImage($event, answersListMcQImage) {
      let checkOneCorrect = answersListMcQImage.filter((item) => item.correct === 1);
      if (checkOneCorrect.length >= 2) {
        this.checkOneCorrectAnswerMcq = true;
      } else if (checkOneCorrect.length === 1) {
        this.checkOneCorrectAnswerMcq = false;
      } else {
        this.checkOneCorrectAnswerMcq = true;
      }
    },
    answerSelect($event, answersListSelect) {
      let checkOneWrong = answersListSelect.filter((item) => item.correct === 0);
      let checkOneCorrect = answersListSelect.filter((item) => item.correct === 1);
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 1) {
        this.checkMultiCorrectAnswerSelect = false;
      } else {
        this.checkMultiCorrectAnswerSelect = true;
      }
    },
    answerSelectImage($event, answersListSelect) {
      let checkOneWrong = answersListSelect.filter((item) => item.correct === 0);
      let checkOneCorrect = answersListSelect.filter((item) => item.correct === 1);
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 1) {
        this.checkMultiCorrectAnswerSelect = false;
      } else {
        this.checkMultiCorrectAnswerSelect = true;
      }
    },
    answerSelectAudio($event, answersListSelect) {
      let checkOneWrong = answersListSelect.filter((item) => item.correct === 0);
      let checkOneCorrect = answersListSelect.filter((item) => item.correct === 1);
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 1) {
        this.checkMultiCorrectAnswerSelect = false;
      } else {
        this.checkMultiCorrectAnswerSelect = true;
      }
    },
    checkAnswerTureFalse($event, answersListTrueFalse) {
      let checkOneCorrect = answersListTrueFalse.filter((item) => item.correct === 1);
      if (checkOneCorrect.length === 1) {
        this.checkOneAnswerTureFalse = false;
      } else {
        this.checkOneAnswerTureFalse = true;
      }
    },
    checkAnswerDragOne($event, answersListDragOne) {
      let checkOneCorrect = answersListDragOne.filter((item) => item.correct === 1);
      if (checkOneCorrect.length === 1) {
        this.checkOneAnswerDragOne = false;
      } else {
        this.checkOneAnswerDragOne = true;
      }
    },
    onSubmit() {
      if (this.questionSlug.slug === "mcq_text_text_one_option") {
        this.assignAnswersMcq();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_image_images_one_option") {
        this.formValues.question_pattern = 'image'
        this.assignAnswersMcqImage();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_voice_images_one_option") {
        this.formValues.question_pattern = 'audio'
        this.assignAnswersMcqImage();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_voice_text_one_option") {
        this.formValues.question_pattern = 'audio'
        this.assignAnswersMcq();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "true_false_text_question") {
        this.formValues.question_pattern = 'text'
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "true_false_image_question") {
        this.formValues.question_pattern = 'image'
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "true_false_voice_question") {
        this.formValues.question_pattern = 'audio'
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_text_text_multi_option") {
        this.formValues.question_pattern = 'text'
        this.assignAnswersSelect();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_multi_images") {
        this.formValues.question_pattern = 'image'
        this.assignAnswersSelectImages();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_mtli_voices") {
        this.formValues.question_pattern = 'audio'
        this.assignAnswersSelectAudio();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "drag_and_drop_text_text" || this.questionSlug.slug === "drag_and_drop_text_image_text") {
        this.assignAnswersDragOne();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "order_text_with_question") {
        this.formValues.question_pattern = 'text'
        this.assignAnswersDragSort();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "order_image_without_question") {
        this.formValues.question_pattern = 'text'
        this.assignAnswersDragSort();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "match_one_to_one") {
        this.assignAnswersMatchOneToOne();
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
        answer: null,
        audio: null,
        correct: 0,
        answer_pattern: 'text'
      });
    },
    addAnswerSelectImage() {
      this.answersListSelectImage.push({
        answer: null,
        audio: null,
        correct: 0,
        answer_pattern: 'image',
        answerImage: null
      })
    },
    addAnswerSelectAudio() {
      this.answersListSelectAudio.push({
        answer: null,
        audio: null,
        correct: 0,
        answer_pattern: 'audio'
      })
    },
    addAnswerMcq() {
      this.answersListMcQ.push({
        answer: "",
        audio: null,
        correct: 0,
        answer_pattern: 'text'
      });
    },
    addAnswerMcqImage() {
      this.answersListMcQImage.push({
        answer: null,
        audio: null,
        correct: 0,
        answerImage: '',
        answer_pattern: 'image'
      });
    },
    addAnswerMatchOneToOne() {
      this.answersListMatchOneToOne.push({
        answer: "",
        match_from: 1,
        audio: null,
        answers_to: [
          {
            answer: "",
            match_to: 1,
            audio: null,
          },
        ],
      });
    },
    addAnswerDragOne() {
      this.answersListDragOne.push(
        {
          answer: "",
          audio: null,
          correct: 0,
          answer_pattern: 'text'
        });
    },
    addAnswerDragSort() {
      this.answersListDragSort.push({
        answer: "",
        order: 0,
        audio: null,
        answer_pattern: 'text',
        answerImage: null
      });
    },
    addAnswerDragSortImage() {
      this.answersListDragSortImage.push({
        answer: null,
        order: 0,
        audio: null,
        answer_pattern: 'image',
        answerImage: null
      })
    },
    assignAnswersDragOne() {
      this.formValues.answers = this.answersListDragOne.filter((answer) => answer.answer);
    },
    assignAnswersTrueFalse() {
      this.formValues.answers = this.answersListTrueFalse.filter((answer) => answer.answer);
    },
    assignAnswersSelect() {
      this.formValues.answers = this.answersListSelect.filter((answer) => answer.answer);
    },
    assignAnswersSelectImages() {
      this.formValues.answers = this.answersListSelectImage.filter((answer) => answer.answer);
    },
    assignAnswersSelectAudio() {
      this.formValues.answers = this.answersListSelectAudio.filter((answer) => answer.audio);
    },
    assignAnswersMcq() {
      this.formValues.answers = this.answersListMcQ.filter((answer) => answer.answer);
    },
    assignAnswersMcqImage() {
      this.formValues.answers = this.answersListMcQImage.filter((answer) => answer.answer);
    },
    assignAnswersMatchOneToOne() {
      this.formValues.answers = this.answersListMatchOneToOne.filter((answer) => answer.answer);
    },
    assignAnswersDragSort() {
      this.formValues.answers = this.answersDragSortToSend;
    },
    handleUploadImage(e) {
      this.formValues.questionImage = URL.createObjectURL(e.target.files[0])
      if (e) this.formValues.question = e.target.files[0];
      else return;
    },
    handleUploadDragImage(e) {
      this.formValues.questionImage = URL.createObjectURL(e.target.files[0])
      if (e) this.formValues.question_image = e.target.files[0];
      else return;
    },
    handleUploadImageOnAnswers(item, e) {
      item.answerImage = URL.createObjectURL(e.target.files[0])
      if (e) item.answer = e.target.files[0];
      else return;
    }
  },
  watch: {
    answersListDragSort: {
      handler(newList) {
        const list = newList.map((item, index) => {
          return {
            answer: item.answer,
            order: index + 1,
            audio: item.audio,
            correct: 0,
            answer_pattern: 'text'
          };
        });
        this.answersDragSortToSend = list;
      },
      deep: true,
    },
    answersListDragSortImage: {
      handler(newList) {
        const list = newList.map((item, index) => {
          return {
            answer: item.answer,
            order: index + 1,
            audio: item.audio,
            correct: 0,
            answerImage: item.answerImage,
            answer_pattern: 'image'
          };
        });
        this.answersDragSortToSend = list;1
        console.log('this.answersDragSortToSend',this.answersDragSortToSend)
      },
      deep: true,
    },
    "formValues.question"(newVal) {
      if (typeof newVal === 'string') {
        this.lockBtn = newVal.includes("%s");
        this.previewQuestion = newVal;
        this.previewQuestion = this.previewQuestion.replace(
          /%s/g,
          "<span style='display: inline-block; width: 100px; height: 50px; background: #eee; border-radius: 1rem;border: 1px solid; margin: 0 .5rem'></span>"
        );
      }
    },
    question(questionEdit) {
      this.formValues.question = questionEdit.question;
      this.formValues.question_audio = questionEdit.question_audio;
      this.formValues.hint = questionEdit.hint;
      this.formValues.answers = questionEdit.answers;
      this.answersListMcQ = this.formValues.answers;
      this.answersListMatchOneToOne = this.formValues.answers;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
