<template>
  <div>
    <!--        mcq_text_text_one_option-->
    <slot v-if="questionSlug.slug === 'mcq_text_text_one_option'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="12" class="mb-3">
              <div class="hold-field">
                <TextField
                  v-model="formValues.question"
                  :label="$t('QUESTIONS.QUESTION')"
                  :name="$t('QUESTIONS.QUESTION')"
                  :placeholder="$t('QUESTIONS.enterQUESTION')"
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="12">
              <UploadAttachment :type-of-attachment="'audio'"
                                :dropIdRef="'audioFile'"
                                :accept-files="'audio/*'" :label="'ملف الصوت لنص السؤال'"
                                :name="'audioFile'"
                                :rules="'required'"
                                @setFileId="setQuestionAudioId('question_audio',$event)"
                                @setFileUrl="setQuestionAudioUrl('question_audioUser',$event)"/>
            </b-col>
            <b-col lg="12" class="mb-3">
              <div class="hold-field">
                <TextField
                  v-model="formValues.hint"
                  :label="$t('QUESTIONS.HINT')"
                  :name="$t('QUESTIONS.HINT')"
                  :placeholder="$t('QUESTIONS.enterHINT')"
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="12">
              <UploadAttachment :type-of-attachment="'audio'"
                                :dropIdRef="'audioHintFile'"
                                :accept-files="'audio/*'" :label="$t('QUESTIONS.HINT_TITLE_AUDIO')"
                                :name="'audioHintFile'"
                                :rules="'required'"
                                @setFileId="setQuestionAudioId('hint_audio',$event)"
                                @setFileUrl="setQuestionAudioUrl('hint_audioUser',$event)"/>
            </b-col>
          </b-row>
          <b-col lg="12" class="my-3">
            <div class="hold-field">
              <label class="m-0">{{ $t("QUESTIONS.ANSWERS") }}</label>
            </div>
          </b-col>
          <b-row v-for="(answer, idx) in answersListMcQ" :key="idx">
            <b-col lg="9" class="mb-3">
              <div class="hold-field">
                <TextField
                  :rules="'required|max:100'"
                  v-model="answer.answer"
                  :label="$t('QUESTIONS.ANSWER')"
                  :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                  :id="`ANSWER ${idx}`"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="3" class="mb-3">
              <div class="hold-field">
                <label><span><i class="fa-solid fa-asterisk"></i></span>
                  {{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
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
            <b-col lg="12">
              <UploadAttachment :type-of-attachment="'audio'"
                                :dropIdRef="`audioFile ${idx}`"
                                :accept-files="'audio/*'"
                                :label="$t('QUESTIONS.QUESTION_ANSWER_AUDIO')"
                                :name="`audioFile${idx}`"
                                :rules="'required'"
                                @setFileId="setQuestionAudioId('',$event,true,'answersListMcQ',idx,'audio')"
                                @setFileUrl="setQuestionAudioUrl('',$event,true,'answersListMcQ',idx,'answerAudioUser')"/>
            </b-col>
            <b-col lg="2" class="btn-holder">
              <div class="hold-field">
                <div class="addAnswer mt-3" v-if="answersListMcQ.length - 1 === idx"
                     @click="addAnswerMcq">
                  <img src="@/assets/images/icons/add_answer.png"> <span>إضافة إجابة</span>
                </div>
                <span class="mx-3 danger" v-if="answersListMcQ.length > 1"
                      @click="deleteAnswer(idx)">حذف</span>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="answersListMcQ.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder mt-5">
              <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                {{ $t("GLOBAL_CANCEL") }}
              </Button>
              <div>
                <Button @click="handleBack" :custom-class="'submit-btn back-btn'" class="mr-3">
                  {{ $t("GLOBAL_BACK") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListMcQ.length <= 1 ||
                        answersListMcQ.length > 8 ||
                        checkOneCorrectAnswerMcq
                      "
                  :custom-class="'submit-btn'"
                >
                  {{ $t("GLOBAL_NEXT") }}
                </Button>
              </div>
            </div>
          </b-row>
        </form>
      </validation-observer>
    </slot>
    <!--        mcq_image_images_one_option-->
    <slot v-if="questionSlug.slug === 'mcq_image_images_one_option'">
      <validation-observer v-slot="{ invalid }" ref="addImageOneQuestionForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="8" class="mb-3">
              <div class="hold-field">
                <ImageUploader
                  :rules="'required'"
                  v-model="formValues.question"
                  :isRequired="true"
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
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span>
                  {{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
                >
                  <b-form-file
                    type="file"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  :rules="'required'"
                  :name="`answerImage${idx}`"
                  v-model="answer.answer"
                  :is-required="true"
                  :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                  @imageUpload="handleUploadImageOnAnswers(answer, $event)"
                  @deleteImage="answer.answer = answer.answerImage = null"
                  :item-image="answer.answerImage"
                />
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`audioAnswer${idx}`"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                    v-model="answer.audio"
                    :name="`audio-${idx}`"
                  ></b-form-file>
                  <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </div>
            </b-col>
            <b-col lg="2" class="mb-3">
              <div class="hold-field">
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
          <b-row v-if="answersListMcQImage.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListMcQImage.length <= 1 ||
                        checkOneCorrectAnswerMcq ||
                        answersListMcQImage.length > 8
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
    <!--        mcq_voice_images_one_option-->
    <slot v-if="questionSlug.slug === 'mcq_voice_images_one_option'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="12" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider v-slot="{ errors }" :rules="'required|audio'" name="audio">
                  <b-form-file
                    accept="audio/*"
                    :placeholder="formValues.question ? formValues.question.name : 'اختر ملف'"
                    v-model="formValues.question"
                    name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span>
                  {{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  v-model="answer.answer"
                  :name="`questionImage ${idx + 1}`"
                  :is-required="true"
                  :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                  @imageUpload="handleUploadImageOnAnswers(answer, $event)"
                  @deleteImage="answer.answer = answer.answerImage = null"
                  :item-image="answer.answerImage"
                />
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span>
                  {{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`answerAudio ${idx + 1}`"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
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
          <b-row v-if="answersListMcQImage.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListMcQImage.length <= 1 ||
                        checkOneCorrectAnswerMcq ||
                        answersListMcQImage.length > 8
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
    <!--        mcq_voice_text_one_option-->
    <slot v-if="questionSlug.slug === 'mcq_voice_text_one_option'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="12" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="formValues.question ? formValues.question.name : 'اختر ملف'"
                    v-model="formValues.question"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  :rules="'required|max:100'"
                  v-model="answer.answer"
                  :label="$t('QUESTIONS.ANSWER')"
                  :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                  :id="`ANSWER ${idx}`"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`answerAudio ${idx + 1}`"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
          <b-row v-if="answersListMcQ.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListMcQ.length <= 1 ||
                        checkOneCorrectAnswerMcq ||
                        answersListMcQ.length > 8
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider v-slot="{ errors }" :rules="'required'" name="hintAudio">
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  :rules="'required|max:100'"
                  v-model="answer.answer"
                  :label="$t('QUESTIONS.ANSWER')"
                  :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                  :id="`ANSWER ${idx}`"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`answerAudio ${idx + 1}`"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
          <b-row v-if="answersListSelect.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListSelect.length <= 1 ||
                        checkMultiCorrectAnswerSelect ||
                        answersListSelect.length > 8
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
    <!--        mcq_multi_images-->
    <slot v-if="questionSlug.slug === 'mcq_multi_images'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="8" class="mb-3">
              <TextField
                v-model="formValues.question"
                :label="$t('QUESTIONS.QUESTION')"
                :name="$t('QUESTIONS.QUESTION')"
                :rules="'required|max:100'"
              ></TextField>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  v-model="answer.answer"
                  :is-required="true"
                  :name="`questionImage ${idx + 1}`"
                  :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                  @imageUpload="handleUploadImageOnAnswers(answer, $event)"
                  @deleteImage="answer.answer = answer.answerImage = null"
                  :item-image="answer.answerImage"
                />
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`audio ${idx + 1}`"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
          <b-row v-if="answersListSelectImage.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListSelectImage.length <= 1 ||
                        checkMultiCorrectAnswerSelect ||
                        answersListSelectImage.length > 8
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
    <!--        mcq_mtli_voices-->
    <slot v-if="questionSlug.slug === 'mcq_mtli_voices'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="8" class="mb-3">
              <TextField
                v-model="formValues.question"
                :label="$t('QUESTIONS.QUESTION')"
                :name="$t('QUESTIONS.QUESTION')"
                :rules="'required|max:100'"
              ></TextField>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`audio ${idx + 1}`"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="answer.audio ? answer.audio.name : 'اختر ملف'"
                    v-model="answer.answer"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
                  @click="deleteAnswerSelectAudio(idx)"
                >حذف</span
                >
              </div>
            </b-col>
          </b-row>
          <b-row v-if="answersListSelectAudio.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListSelectAudio.length <= 1 ||
                        checkMultiCorrectAnswerSelect ||
                        answersListSelectAudio.length > 8
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
                  :is-required="true"
                  v-model="formValues.question"
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
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider v-slot="{ errors }" :rules="'required|audio'" name="audio">
                  <b-form-file
                    accept="audio/*"
                    :placeholder="formValues.question ? formValues.question.name : 'اختر ملف'"
                    v-model="formValues.question"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
    <!--        drag_and_drop_text_text-->
    <slot v-if="questionSlug.slug === 'drag_and_drop_text_text'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <TextField
                  @paste.prevent
                  @drop.prevent
                  v-model="formValues.question"
                  :label="$t('QUESTIONS.QUESTION')"
                  :name="$t('QUESTIONS.QUESTION')"
                  :rules="'required|max:100'"
                ></TextField>
                <div v-if="validSpace" class="text-danger">
                  يجب ان يوجد مساحة خالية واحده فقط
                </div>
                <div v-if="!lockBtn && formValues.question" class="text-danger">
                  يجب إضافة مساحة خالية واحده فقط
                </div>
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
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  :rules="'required|max:100'"
                  v-model="answer.answer"
                  :label="$t('QUESTIONS.ANSWER')"
                  :name="`${$t('QUESTIONS.ANSWER')} ${idx + 1}`"
                  :id="`ANSWER ${idx}`"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`audio ${idx + 1}`"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
          <b-row v-if="answersListDragOne.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        checkOneAnswerDragOne ||
                        answersListDragOne.length <= 1 ||
                        validSpace ||
                        !lockBtn ||
                        answersListDragOne.length > 8
                      "
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
                  @paste.prevent
                  @drop.prevent
                  v-model="formValues.question"
                  :label="$t('QUESTIONS.QUESTION')"
                  :name="$t('QUESTIONS.QUESTION')"
                  :rules="'required|max:100'"
                ></TextField>
                <div v-if="validSpace" class="text-danger">
                  يجب ان يوجد مساحة خالية واحده فقط
                </div>
                <div v-if="!lockBtn && formValues.question" class="text-danger">
                  يجب إضافة مساحة خالية واحده فقط
                </div>
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
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                      v-model="formValues.question_image"
                      :is-required="true"
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
                          :rules="'required|max:100'"
                        ></TextField>
                      </div>
                    </b-col>
                    <b-col lg="4" class="mb-3">
                      <div class="hold-field">
                        <label
                        ><span><i class="fa-solid fa-asterisk"></i></span
                        >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                        >
                        <ValidationProvider
                          v-slot="{ errors }"
                          :rules="'required|audio'"
                          name="hintAudio"
                        >
                          <b-form-file
                            accept="audio/*"
                            :placeholder="
                                  formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                                "
                            v-model="formValues.hint_audio"
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
                  :rules="'required|max:100'"
                  v-model="answer.answer"
                  :label="$t('QUESTIONS.ANSWER')"
                  :name="`${$t('QUESTIONS.ANSWER')} ${idx + 1}`"
                  :id="`ANSWER ${idx}`"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  :name="`answerAudio${idx + 1}`"
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
                <label>{{ $t("QUESTIONS.ANSWER_TYPE") }}</label>
                <SelectSearch
                  :rules="'required'"
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
          <b-row v-if="answersListDragOne.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        checkOneAnswerDragOne ||
                        answersListDragOne.length <= 1 ||
                        validSpace ||
                        !lockBtn ||
                        answersListDragOne.length > 8
                      "
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
      v-if="
            questionSlug.slug === 'order_text_with_question' ||
            questionSlug.slug === 'order_text_without_question'
          "
    >
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="8" class="mb-3">
              <div class="hold-field">
                <TextField
                  v-model="formValues.question"
                  :label="$t('QUESTIONS.QUESTION')"
                  :name="$t('QUESTIONS.QUESTION')"
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                        :rules="'required|max:100'"
                        v-model="answer.answer"
                        :label="$t('QUESTIONS.ANSWER')"
                        :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                        :id="`ANSWER ${idx}`"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4" class="mb-3">
                    <div class="hold-field">
                      <label
                      ><span><i class="fa-solid fa-asterisk"></i></span
                      >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                      >
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="'required|audio'"
                        :name="`answerAudio ${idx + 1}`"
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
          <b-row v-if="answersListDragSort.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid || answersListDragSort.length < 2 || answersListDragSort.length > 8
                      "
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
    <!--        order_voice_without_question-->
    <slot v-if="questionSlug.slug === 'order_voice_without_question'">
      <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="8" class="mb-3">
              <div class="hold-field">
                <TextField
                  v-model="formValues.question"
                  :label="$t('QUESTIONS.QUESTION')"
                  :name="$t('QUESTIONS.QUESTION')"
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                <slot v-for="(answer, idx) in answersListDragSortAudio">
                  <b-col lg="10" class="mb-3">
                    <div class="hold-field">
                      <label
                      ><span><i class="fa-solid fa-asterisk"></i></span
                      >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                      >
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="'required|audio'"
                        :name="`answerAudio ${idx + 1}`"
                      >
                        <b-form-file
                          accept="audio/*"
                          :placeholder="answer.answer ? answer.answer.name : 'اختر ملف'"
                          v-model="answer.answer"
                          name="audio"
                          @input="answer.audioName = answer.answer.name"
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
                            v-if="answersListDragSortAudio.length - 1 === idx"
                            @click="addAnswersListDragSortAudio"
                          >إضافة</span
                          >
                      <span
                        class="mx-3 danger"
                        v-if="answersListDragSortAudio.length > 1"
                        @click="answersListDragSortAudio.splice(idx, 1)"
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
                  v-model="answersListDragSortAudio"
                  group="items"
                  :animation="150"
                  class="list-group"
                  :sort="true"
                  v-if="answersListDragSortAudio.length >= 2"
                >
                  <div
                    v-for="(item, index) in answersListDragSortAudio"
                    :key="item.id"
                    class="list-group-item"
                  >
                    <p>{{ index + 1 }} - {{ item.audioName }}</p>
                  </div>
                </draggable>
              </b-row>
            </b-col>
          </b-row>
          <b-row v-if="answersListDragSortAudio.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListDragSortAudio.length < 2 ||
                        answersListDragSortAudio.length > 8
                      "
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
                  <b-col lg="6" class="mb-3" :key="idx + 1">
                    <div class="hold-field">
                      <ImageUploader
                        :is-required="true"
                        v-model="answer.answer"
                        :name="'questionImage'"
                        :text="$t('QUESTIONS.UPLOAD_IMAGE_ANSWER')"
                        @imageUpload="handleUploadImageOnAnswers(answer, $event)"
                        @deleteImage="answer.answer = answer.answerImage = null"
                        :item-image="answer.answerImage"
                      />
                    </div>
                  </b-col>
                  <b-col lg="4" class="mb-3">
                    <div class="hold-field">
                      <label
                      ><span><i class="fa-solid fa-asterisk"></i></span
                      >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                      >
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="'required|audio'"
                        :name="`answerAudio ${idx + 1}`"
                      >
                        <b-form-file
                          accept="audio/*"
                          :placeholder="answer.audio ? answer.audioName : 'اختر ملف'"
                          v-model="answer.audio"
                          @input="answer.audioName = answer.audio.name"
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
                    <div
                      class="d-flex justify-content-center align-items-center"
                      v-if="item.answerImage"
                    >
                      <img class="answer-img" :src="item.answerImage"/>
                    </div>
                  </div>
                </draggable>
              </b-row>
            </b-col>
          </b-row>
          <b-row v-if="answersListDragSortImage.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="
                        invalid ||
                        answersListDragSortImage.length < 2 ||
                        answersListDragSortImage.length > 8
                      "
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
    <slot v-if="questionSlug.slug.includes('match')">
      <validation-observer v-slot="{ invalid }" ref="addAnswer">
        <form @submit.prevent="onSubmit" class="mt-5">
          <b-row>
            <b-col lg="8" class="mb-3">
              <div class="hold-field">
                <TextField
                  v-model="formValues.question"
                  :label="$t('QUESTIONS.QUESTION')"
                  :name="$t('QUESTIONS.QUESTION')"
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.QUESTION_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="questionAudio"
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
                  :rules="'required|max:100'"
                ></TextField>
              </div>
            </b-col>
            <b-col lg="4" class="mb-3">
              <div class="hold-field">
                <label
                ><span><i class="fa-solid fa-asterisk"></i></span
                >{{ $t("QUESTIONS.HINT_TITLE_AUDIO") }}</label
                >
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="'required|audio'"
                  name="hintAudio"
                >
                  <b-form-file
                    accept="audio/*"
                    :placeholder="
                          formValues.hint_audio ? formValues.hint_audio.name : 'اختر ملف'
                        "
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
          <!-- answer from section -->
          <b-col lg="12" class="mb-3">
            <div class="hold-field">
              <label class="mx-0">{{ $t("QUESTIONS.ANSWERSFROM") }}:</label>
            </div>
            <!-- add answer from with type based on answer patter -->
            <b-row v-if="!confirmAnswersFrom">
              <validation-observer
                v-slot="{ invalid }"
                ref="addAnswerFromForm"
                class="row w-100"
              >
                <b-col lg="6" class="mb-3 px-0" v-if="answerMatch.answer_pattern === 'text'">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.ANSWER") }}</label>
                    <TextField
                      v-model="answerMatch.answer"
                      :name="$t('QUESTIONS.ANSWERSFROM')"
                      :id="`ANSWER`"
                      :rules="'required|max:100'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3 px-0" v-if="answerMatch.answer_pattern === 'image'">
                  <div class="hold-field">
                    <ImageUploader
                      v-model="answerMatch.answer"
                      :is-required="true"
                      :name="`answerMatchImage`"
                      :text="'صوره الإجابة'"
                      @imageUpload="handleUploadImageOnAnswers(answerMatch, $event)"
                      @deleteImage="answerMatch.answer = answerMatch.answerImage = null"
                      :item-image="answerMatch.answerImage"
                    />
                  </div>
                </b-col>
                <b-col
                  lg="4"
                  class="mb-3"
                  v-if="
                        answerMatch.answer_pattern === 'text' ||
                        answerMatch.answer_pattern === 'image'
                      "
                >
                  <div class="hold-field">
                    <label
                    ><span><i class="fa-solid fa-asterisk"></i></span
                    >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                    >
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="'required|audio'"
                      :name="$t('QUESTIONS.QUESTION_ANSWER_AUDIO')"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="answerMatch.audio ? answerMatch.audio.name : 'اختر ملف'"
                        v-model="answerMatch.audio"
                        name="answerMatchAudio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3" v-if="answerMatch.answer_pattern === 'audio'">
                  <div class="hold-field">
                    <label
                    ><span><i class="fa-solid fa-asterisk"></i></span
                    >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                    >
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="'required|audio'"
                      name="audio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="answerMatch.answer ? answerMatch.answer.name : 'اختر ملف'"
                        v-model="answerMatch.answer"
                        name="answerMatchAudioAnswer"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="px-0">
                  <div class="hold-field">
                    <label class="mx-0 hidden-text">{{ $t("QUESTIONS.ANSWERSFROM") }}:</label>
                    <button
                      class="add-btn"
                      @click.prevent="addAnswerMatch()"
                      :disabled="invalid"
                    >
                      {{ $t("ADD_ANSWER") }}
                    </button>
                  </div>
                </b-col>
              </validation-observer>
            </b-row>
            <!-- show answer based on answer patter -->
            <slot v-if="answersListMatch.length > 0">
              <b-row class="mb-3">
                <b-col lg="2" class="answer-item">الترتيب</b-col>
                <b-col lg="3" class="answer-item">الإجابة</b-col>
                <b-col lg="3" class="answer-item" v-if="answerMatch.answer_pattern !== 'audio'">
                  التسجيل الصوتى للإجابة
                </b-col>
                <b-col lg="2" class="answer-item"></b-col>
              </b-row>
              <b-row v-for="(answer, index) in answersListMatch" :key="index" class="mb-3">
                <b-col lg="2" class="answer-item">{{ index + 1 }}</b-col>
                <b-col lg="3" class="answer-item" v-if="answer.answer_pattern === 'text'">
                  {{ answer.answer }}
                </b-col>
                <b-col lg="3" class="answer-item" v-if="answer.answer_pattern === 'image'">
                  <img :src="answer.answerImage" alt="answer image" class="answer_image"/>
                </b-col>
                <b-col lg="3" class="answer-item" v-if="answer.answer_pattern === 'audio'">
                  {{ answer.answer.name }}
                </b-col>
                <b-col lg="3" class="answer-item" v-if="answer.answer_pattern !== 'audio'">
                  {{ answer.audio.name }}
                </b-col>
                <b-col lg="2">
                  <button
                    class="remove-btn"
                    @click.prevent="removeAnswerMatch(index)"
                    v-if="!confirmAnswersFrom"
                  >
                    {{ $t("remove_ANSWER") }}
                  </button>
                </b-col>
              </b-row>
              <b-row v-if="answersListMatch.length > 8">
                <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
              </b-row>
              <b-row>
                <b-col lg="12">
                  <div class="hold-field my-3">
                    <button
                      class="add-btn"
                      @click="confirmAnswersFrom = true"
                      v-if="!confirmAnswersFrom"
                      :disabled="answersListMatch.length <= 1 || answersListMatch.length > 8"
                    >
                      {{ $t("QUESTIONS.confirm") }}
                    </button>
                  </div>
                </b-col>
                <b-col lg="12">
                  <div class="hold-field my-3">
                    <button
                      class="remove-btn"
                      @click.prevent="resetAnswers()"
                      v-if="confirmAnswersFrom"
                    >
                      {{ $t("QUESTIONS.reset") }}
                    </button>
                  </div>
                </b-col>
              </b-row>
            </slot>
          </b-col>
          <!-- answer to section -->
          <b-col lg="12" class="mb-3" v-if="confirmAnswersFrom">
            <div class="hold-field">
              <label class="mx-0">{{ $t("QUESTIONS.ANSWERSTO") }}:</label>
            </div>
            <!-- add answer to with type based on answer patter -->
            <b-row>
              <validation-observer v-slot="{ invalid }" ref="addAnswerToForm" class="row w-100">
                <b-col lg="6" class="mb-3 px-0" v-if="answerMatchTo.answer_pattern === 'text'">
                  <div class="hold-field">
                    <label>{{ $t("QUESTIONS.ANSWER") }}</label>
                    <TextField
                      :rules="'required|max:100'"
                      v-model="answerMatchTo.answer"
                      :name="`${$t('QUESTIONS.ANSWER')}`"
                      :id="`ANSWER`"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3 px-0" v-if="answerMatchTo.answer_pattern === 'image'">
                  <div class="hold-field">
                    <ImageUploader
                      v-model="answerMatchTo.answer"
                      :is-required="true"
                      :name="`answerMatchToImage`"
                      :text="'صوره الإجابة'"
                      @imageUpload="handleUploadImageOnAnswers(answerMatchTo, $event)"
                      @deleteImage="answerMatchTo.answer = answerMatchTo.answerImage = null"
                      :item-image="answerMatchTo.answerImage"
                    />
                  </div>
                </b-col>
                <b-col
                  lg="4"
                  class="mb-3"
                  v-if="
                        answerMatchTo.answer_pattern === 'text' ||
                        answerMatchTo.answer_pattern === 'image'
                      "
                >
                  <div class="hold-field">
                    <label
                    ><span><i class="fa-solid fa-asterisk"></i></span
                    >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                    >
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="'required|audio'"
                      name="answerMatchToAudio"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="
                              answerMatchTo.audio ? answerMatchTo.audio.name : 'اختر ملف'
                            "
                        v-model="answerMatchTo.audio"
                        name="answerMatchToAudio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-3" v-if="answerMatchTo.answer_pattern === 'audio'">
                  <div class="hold-field">
                    <label
                    ><span><i class="fa-solid fa-asterisk"></i></span
                    >{{ $t("QUESTIONS.QUESTION_ANSWER_AUDIO") }}</label
                    >
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="'required|audio'"
                      name="answerMatchToAudioAnswer"
                    >
                      <b-form-file
                        accept="audio/*"
                        :placeholder="
                              answerMatchTo.answer ? answerMatchTo.answer.name : 'اختر ملف'
                            "
                        v-model="answerMatchTo.answer"
                        name="audio"
                      >
                      </b-form-file>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </ValidationProvider>
                  </div>
                </b-col>
                <b-col lg="2" class="px-0">
                  <div class="hold-field">
                    <label class="mx-0 hidden-text">{{ $t("QUESTIONS.ANSWERSTO") }}:</label>
                    <button
                      class="add-btn"
                      @click.prevent="addAnswerMatchTo()"
                      :disabled="invalid"
                    >
                      {{ $t("ADD_ANSWER") }}
                    </button>
                  </div>
                </b-col>
              </validation-observer>
              <p
                v-if="
                      answersListMatchTo.length !== 1 &&
                      (questionSlug.slug === 'match_many_image_images' ||
                        questionSlug.slug === 'match_many_image_voices')
                    "
                class="text-danger font-weight-bold"
              >
                يجب إضافة صوره واحدة
              </p>
              <p
                v-if="
                      answersListMatchTo.length !== 2 &&
                      (questionSlug.slug === 'match_many_images_images' ||
                        questionSlug.slug === 'match_many_images_text' ||
                        questionSlug.slug === 'match_many_images_voices')
                    "
                class="text-danger font-weight-bold"
              >
                يجب إضافة صورتين فقط
              </p>
            </b-row>
            <!-- show answer to based on answer patter -->
            <slot v-if="answersListMatchTo.length > 0">
              <b-row>
                <b-col lg="2" class="answer-item">الترتيب</b-col>
                <b-col lg="3" class="answer-item">الإجابة</b-col>
                <b-col
                  lg="3"
                  class="answer-item"
                  v-if="answerMatchTo.answer_pattern !== 'audio'"
                >التسجيل الصوتى للإجابة
                </b-col>
                <b-col lg="2" class="answer-item">الإجابة المقابلة</b-col>
                <b-col lg="2" class="answer-item"></b-col>
              </b-row>
              <b-row v-for="(answer, index) in answersListMatchTo" :key="index" class="mb-3">
                <validation-observer v-slot="{ invalid }" ref="selectAnswers" class="row w-100">
                  <b-col lg="2" class="answer-item">{{ index + 1 }}</b-col>
                  <b-col lg="3" class="answer-item" v-if="answer.answer_pattern === 'text'">
                    {{ answer.answer }}
                  </b-col>
                  <b-col lg="3" class="answer-item" v-if="answer.answer_pattern === 'image'">
                    <img :src="answer.answerImage" alt="answer image" class="answer_image"/>
                  </b-col>
                  <b-col lg="3" class="answer-item" v-if="answer.answer_pattern === 'audio'">
                    {{ answer.answer.name }}
                  </b-col>
                  <b-col lg="3" class="answer-item" v-if="answer.answer_pattern !== 'audio'">
                    {{ answer.audio.name }}
                  </b-col>
                  <b-col lg="2" class="answer-item select">
                    <validation-provider
                      v-slot="{ errors, invalid }"
                      :name="`الإجابة`"
                      rules="required"
                      v-if="questionSlug.slug.includes('match_one')"
                    >
                      <el-select
                        v-model="answer.answerToId"
                        clearable
                        :multiple="questionSlug.slug.includes('match_many')"
                        placeholder="إختر الإجابة المقابلة"
                        @mouseenter.native="getId(answer.answerToId)"
                        @change="assignAnswerMatch($event)"
                        @clear="backToInitValue()"
                        class="custom-select-answer"
                      >
                        <el-option
                          v-for="item in answersListMatch"
                          :key="item.id"
                          :label="item.id"
                          :disabled="item.isSelected"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors, invalid }"
                      :name="`الإجابة المقابلة`"
                      rules="required"
                      v-if="questionSlug.slug.includes('match_many')"
                    >
                      <el-select
                        v-model="answer.answerToId"
                        clearable
                        multiple
                        placeholder="إختر الإجابة المقابلة"
                        @mouseenter.native="getIds(answer.answerToId)"
                        @change="assignAnswersMatch($event)"
                        @clear="backToInitValues()"
                        class="custom-select-answer"
                      >
                        <el-option
                          v-for="item in answersListMatch"
                          :key="item.id"
                          :label="item.id"
                          :disabled="item.isSelected"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-col>
                  <b-col lg="2">
                    <button class="remove-btn" @click.prevent="removeAnswersMatchTo(index)">
                      {{ $t("remove_ANSWER") }}
                    </button>
                  </b-col>
                </validation-observer>
              </b-row>
            </slot>
          </b-col>
          <b-row v-if="answersListMatchTo.length > 8">
            <b-col lg="12" class="text-danger">الحد الأقصى لعدد الإجابات 8</b-col>
          </b-row>
          <b-row>
            <div class="action-holder">
              <div>
                <Button
                  v-if="questionSlug.slug.includes('match_one')"
                  type="submit"
                  :loading="loading"
                  :custom-class="'submit-btn'"
                  :disabled="
                        checkAssignAnswers ||
                        answersListMatch.length !== answersListMatchTo.length ||
                        answersListMatch.length > 8 ||
                        answersListMatchTo.length > 8
                      "
                >
                  {{ $t("GLOBAL_NEXT") }}
                </Button>
                <Button
                  v-if="
                        questionSlug.slug.includes('match_many') &&
                        (questionSlug.slug === 'match_many_image_images' ||
                          questionSlug.slug === 'match_many_image_voices')
                      "
                  type="submit"
                  :loading="loading"
                  :custom-class="'submit-btn'"
                  :disabled="
                        checkAssignAnswers ||
                        answersListMatchTo.length !== 1 ||
                        answersListMatch.length > 8 ||
                        answersListMatchTo.length > 8
                      "
                >
                  {{ $t("GLOBAL_NEXT") }}
                </Button>
                <Button
                  v-if="
                        questionSlug.slug.includes('match_many') &&
                        (questionSlug.slug === 'match_many_images_images' ||
                          questionSlug.slug === 'match_many_images_text' ||
                          questionSlug.slug === 'match_many_images_voices')
                      "
                  type="submit"
                  :loading="loading"
                  :custom-class="'submit-btn'"
                  :disabled="
                        checkAssignAnswers ||
                        answersListMatchTo.length !== 2 ||
                        answersListMatch.length > 8 ||
                        answersListMatchTo.length > 8
                      "
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
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import getData from "@/mixins/getData/getData";
import draggable from "vuedraggable";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import vSelect from "vue-select";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import id from "vue2-datepicker/locale/es/id";

export default {
  computed: {
    id() {
      return id
    }
  },
  mixins: [getData("question")],
  components: {
    UploadAttachment,
    vSelect,
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
      validSpace: false,
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
        hint_audioUser: null,
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
          answerImage: null,
        },
      ],
      answersListDragSortImage: [
        {
          answer: null,
          order: 0,
          audio: null,
          correct: 0,
          answerImage: null,
          audioName: "",
        },
      ],
      answersListDragSortAudio: [
        {
          answer: null,
          order: 0,
          correct: 0,
          answer_pattern: "audio",
          audioName: "",
        },
      ],
      answersListMcQ: [
        {
          answer: "",
          audio: null,
          answerAudioUser: null,
          correct: 0,
          answer_pattern: "text",
        },
      ],
      answersListMcQImage: [
        {
          answer: null,
          audio: null,
          correct: 0,
          answerImage: "",
          answer_pattern: "image",
        },
      ],
      answersListSelect: [
        {
          answer: "",
          audio: null,
          correct: 0,
          answer_pattern: "text",
        },
      ],
      answersListSelectImage: [
        {
          answer: null,
          audio: null,
          correct: 0,
          answer_pattern: "image",
          answerImage: null,
        },
      ],
      answersListSelectAudio: [
        {
          answer: null,
          audio: null,
          correct: 0,
          answer_pattern: "audio",
        },
      ],
      answersListDragOne: [
        {
          answer: "",
          audio: null,
          correct: 0,
          answer_pattern: "text",
        },
      ],
      // ture false
      answersListTrueFalse: [
        {
          answer: "صحيح",
          correct: 0,
          answer_pattern: "text",
        },
        {
          answer: "خطأ",
          correct: 0,
          answer_pattern: "text",
        },
      ],
      answersListMatch: [],
      answersListMatchTo: [],
      answerMatch: {
        answer: null,
        match_from: 1,
        audio: null,
        answers_to: [],
        answer_pattern: "text",
        answerImage: null,
        isSelected: false,
      },
      answerId: 0,
      answerMatchTo: {
        answer: null,
        match_to: 1,
        audio: null,
        answer_pattern: "text",
        answerImage: null,
        answerToId: "",
      },
      currentSelectId: null,
      currentSelectIds: null,
      answerToId: 0,
      confirmAnswersFrom: false,
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
      checkAssignAnswers: true,
    };
  },
  methods: {
    // matching functions
    resetAnswers() {
      this.confirmAnswersFrom = false;
      this.answersListMatchTo = [];
      this.answersListMatch.forEach((item) => {
        item.isSelected = false;
      });
    },
    addAnswerMatch() {
      this.answerId++;
      this.answersListMatch.push({id: this.answerId, ...this.answerMatch});
      this.answerMatch.answer = null;
      this.answerMatch.answerImage = null;
      this.answerMatch.audio = null;
      this.$nextTick(() => {
        this.$refs.addAnswerFromForm.reset();
      });
    },
    addAnswerMatchTo() {
      this.answerToId++;
      this.answersListMatchTo.push({id: this.answerToId, ...this.answerMatchTo});
      this.answerMatchTo.answer = null;
      this.answerMatchTo.audio = null;
      this.answerMatchTo.answerImage = null;
      this.$nextTick(() => {
        this.$refs.addAnswerToForm.reset();
      });
    },
    removeAnswerMatch(index) {
      this.answersListMatch.splice(index, 1);
    },
    removeAnswerMatchTo(index) {
      let indexToBeChangeAnswerMatchTo = this.answersListMatchTo[index];
      this.getId(indexToBeChangeAnswerMatchTo.answerToId);
      this.backToInitValue();
      this.answersListMatchTo.splice(index, 1);
    },
    removeAnswersMatchTo(index) {
      let indexToBeChangeAnswerMatchTo = this.answersListMatchTo[index];
      this.getIds(indexToBeChangeAnswerMatchTo.answerToId);
      this.backToInitValues();
      this.answersListMatchTo.splice(index, 1);
    },
    assignAnswerMatch($event) {
      if ($event) {
        this.backToInitValue();
        let indexToBeChange = this.answersListMatch.findIndex((item) => item.id === $event);
        this.answersListMatch[indexToBeChange].isSelected = true;
      }
    },
    assignAnswersMatch($event) {
      if ($event) {
        this.backToInitValues();
        $event.forEach((itemAnswer) => {
          let indexToBeChange = this.answersListMatch.findIndex((item) => item.id === itemAnswer);
          this.answersListMatch[indexToBeChange].isSelected = true;
        });
      }
    },
    getId(id) {
      this.currentSelectId = id;
    },
    getIds(ids) {
      this.currentSelectIds = ids;
    },
    backToInitValue() {
      if (this.currentSelectId) {
        let indexToBeChange = this.answersListMatch.findIndex(
          (item) => item.id === this.currentSelectId
        );
        this.answersListMatch[indexToBeChange].isSelected = false;
      } else {
        return;
      }
    },
    backToInitValues() {
      if (this.currentSelectIds) {
        this.currentSelectIds.forEach((id) => {
          let indexToBeChange = this.answersListMatch.findIndex((item) => item.id === id);
          this.answersListMatch[indexToBeChange].isSelected = false;
        });
      } else {
        return;
      }
    },
    addSpace() {
      if (this.formValues.question !== null) {
        this.formValues.question += "%s";
        this.lockBtn = true;
        this.previewQuestion = this.formValues.question;
      }
    },
    removeSpace() {
      this.formValues.question = "";
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
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 2) {
        this.checkMultiCorrectAnswerSelect = false;
      } else {
        this.checkMultiCorrectAnswerSelect = true;
      }
    },
    answerSelectImage($event, answersListSelect) {
      let checkOneWrong = answersListSelect.filter((item) => item.correct === 0);
      let checkOneCorrect = answersListSelect.filter((item) => item.correct === 1);
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 2) {
        this.checkMultiCorrectAnswerSelect = false;
      } else {
        this.checkMultiCorrectAnswerSelect = true;
      }
    },
    answerSelectAudio($event, answersListSelect) {
      let checkOneWrong = answersListSelect.filter((item) => item.correct === 0);
      let checkOneCorrect = answersListSelect.filter((item) => item.correct === 1);
      if (checkOneWrong.length >= 1 && checkOneCorrect.length >= 2) {
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
    async setQuestionAudioId(keyName, $event, isAnswer = false, answerList = '', indexWillChange = 0, answerOrAudio = 'answer') {
      if (isAnswer) {
        if (answerList === 'answersListMcQ'){
          console.log('this.answersListMcQ[indexWillChange][answerOrAudio]', this.answersListMcQ[indexWillChange][answerOrAudio])
          this.answersListMcQ[indexWillChange][answerOrAudio] = $event
        }
      } else {
        this.formValues[keyName] = $event
      }
    },
    async setQuestionAudioUrl(keyName, $event, isAnswer = false, answerList = '', indexWillChange = 0, answerOrAudio = 'answer') {
      if (isAnswer) {
        if (answerList === 'answersListMcQ')
          this.answersListMcQ[indexWillChange][answerOrAudio] = $event
      } else {
        this.formValues[keyName] = $event
      }
    },
    onSubmit() {
      if (this.questionSlug.slug === "mcq_text_text_one_option") {
        this.assignAnswersMcq();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_image_images_one_option") {
        this.formValues.question_pattern = "image";
        this.assignAnswersMcqImage();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_voice_images_one_option") {
        this.formValues.question_pattern = "audio";
        this.assignAnswersMcqImage();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_voice_text_one_option") {
        this.formValues.question_pattern = "audio";
        this.assignAnswersMcq();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "true_false_text_question") {
        this.formValues.question_pattern = "text";
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "true_false_image_question") {
        this.formValues.question_pattern = "image";
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "true_false_voice_question") {
        this.formValues.question_pattern = "audio";
        this.assignAnswersTrueFalse();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_text_text_multi_option") {
        this.formValues.question_pattern = "text";
        this.assignAnswersSelect();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_multi_images") {
        this.formValues.question_pattern = "text";
        this.assignAnswersSelectImages();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "mcq_mtli_voices") {
        this.formValues.question_pattern = "text";
        this.assignAnswersSelectAudio();
        this.$emit("onSubmit", this.formValues);
      } else if (
        this.questionSlug.slug === "drag_and_drop_text_text" ||
        this.questionSlug.slug === "drag_and_drop_text_image_text"
      ) {
        this.formValues.question_pattern = "text";
        this.assignAnswersDragOne();
        this.$emit("onSubmit", this.formValues);
      } else if (
        this.questionSlug.slug === "order_text_with_question" ||
        this.questionSlug.slug === "order_text_without_question"
      ) {
        this.formValues.question_pattern = "text";
        this.assignAnswersDragSort();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "order_image_without_question") {
        this.formValues.question_pattern = "text";
        this.assignAnswersDragSort();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug === "order_voice_without_question") {
        this.formValues.question_pattern = "text";
        this.assignAnswersDragSort();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug.includes("match_one")) {
        this.formValues.question_pattern = "text";
        this.assignAnswersMatchOneToOne();
        this.$emit("onSubmit", this.formValues);
      } else if (this.questionSlug.slug.includes("match_many")) {
        this.formValues.question_pattern = "text";
        this.assignAnswersMatchOneToMany();
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
        answer_pattern: "text",
      });
    },
    addAnswerSelectImage() {
      this.answersListSelectImage.push({
        answer: null,
        audio: null,
        correct: 0,
        answer_pattern: "image",
        answerImage: null,
      });
    },
    addAnswerSelectAudio() {
      this.answersListSelectAudio.push({
        answer: null,
        audio: null,
        correct: 0,
        answer_pattern: "audio",
      });
    },
    addAnswerMcq() {
      this.answersListMcQ.push({
        answer: "",
        audio: null,
        answerAudioUser: null,
        correct: 0,
        answer_pattern: "text",
      });
    },
    addAnswerMcqImage() {
      this.answersListMcQImage.push({
        answer: null,
        audio: null,
        correct: 0,
        answerImage: "",
        answer_pattern: "image",
      });
    },
    addAnswerDragOne() {
      this.answersListDragOne.push({
        answer: "",
        audio: null,
        correct: 0,
        answer_pattern: "text",
      });
    },
    addAnswerDragSort() {
      this.answersListDragSort.push({
        answer: "",
        order: 0,
        audio: null,
        answer_pattern: "text",
        answerImage: null,
      });
    },
    addAnswerDragSortImage() {
      this.answersListDragSortImage.push({
        answer: null,
        order: 0,
        audio: null,
        answer_pattern: "image",
        answerImage: null,
        audioName: "",
      });
    },
    addAnswersListDragSortAudio() {
      this.answersListDragSortAudio.push({
        answer: null,
        order: 0,
        correct: 0,
        answer_pattern: "audio",
        audioName: "",
      });
    },
    // remove answer and check correct
    deleteAnswer(index) {
      this.answersListMcQ.splice(index, 1);
      this.answerMcQ(_, this.answersListMcQ);
    },
    deleteAnswerSelectAudio(index) {
      this.answersListSelectAudio.splice(index, 1);
      this.answerSelectAudio(_, this.answersListSelectAudio);
    },
    // assign answer
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
      this.formValues.answers = this.answersListSelectAudio.filter((answer) => answer.answer);
    },
    assignAnswersMcq() {
      this.formValues.answers = this.answersListMcQ;
      console.log('this.formValues.answers',this.formValues.answers)
    },
    assignAnswersMcqImage() {
      this.formValues.answers = this.answersListMcQImage.filter((answer) => answer.answer);
    },
    assignAnswersMatchOneToOne() {
      this.answersListMatch.forEach((item) => {
        let holder;
        holder = this.answersListMatchTo.filter((answerTo) => {
          return answerTo.answerToId === item.id;
        });
        return (item.answers_to = holder);
      });
      this.formValues.answers = this.answersListMatch;
    },
    assignAnswersMatchOneToMany() {
      this.formValues.answers.answersListMatch = this.answersListMatch;
      this.formValues.answers.answersListMatchTo = this.answersListMatchTo;
      // console.log('this.formValues.answers', this.formValues.answers)
    },
    assignAnswersDragSort() {
      this.formValues.answers = this.answersDragSortToSend;
    },
    handleUploadImage(e) {
      this.formValues.questionImage = URL.createObjectURL(e.target.files[0]);
      if (e) this.formValues.question = e.target.files[0];
      else return;
    },
    handleUploadDragImage(e) {
      this.formValues.questionImage = URL.createObjectURL(e.target.files[0]);
      if (e) this.formValues.question_image = e.target.files[0];
      else return;
    },
    handleUploadImageOnAnswers(item, e) {
      item.answerImage = URL.createObjectURL(e.target.files[0]);
      if (e) item.answer = e.target.files[0];
      else return;
    },
  },
  watch: {
    answersListMatch: {
      handler(newVal) {
        this.answersListMatch = newVal;
      },
      deep: true,
    },
    answersListMatchTo: {
      handler(newVal) {
        let checkArray = [];
        // console.log('newVal', newVal)
        newVal.forEach((item) => {
          checkArray.push(item.answerToId);
        });
        // console.log('checkArray', checkArray.includes(''))
        this.checkAssignAnswers = checkArray.includes("");
      },
      deep: true,
    },
    answersListDragSort: {
      handler(newList) {
        const list = newList.map((item, index) => {
          return {
            answer: item.answer,
            order: index + 1,
            audio: item.audio,
            correct: 0,
            answer_pattern: "text",
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
            answer_pattern: "image",
            audioName: item.audioName,
          };
        });
        this.answersDragSortToSend = list;
      },
      deep: true,
    },
    answersListDragSortAudio: {
      handler(newList) {
        const list = newList.map((item, index) => {
          return {
            answer: item.answer,
            order: index + 1,
            correct: 0,
            answer_pattern: "audio",
            audioName: item.audioName,
          };
        });
        this.answersDragSortToSend = list;
      },
      deep: true,
    },
    "formValues.question"(newVal) {
      if (typeof newVal === "string") {
        this.lockBtn = newVal.includes("%s");
        this.previewQuestion = newVal;
        this.previewQuestion = this.previewQuestion.replace(
          /%s/g,
          "<span style='display: inline-block; width: 100px; height: 50px; background: #eee; border-radius: 1rem;border: 1px solid; margin: 0 .5rem'></span>"
        );

        let countRepeatedWords = (newVal) => {
          let words = newVal.split("");
          let wordMap = {};
          for (let i = 0; i < words.length; i++) {
            let currentWordCount = wordMap[words[i]];
            let count = currentWordCount ? currentWordCount : 0;
            wordMap[words[i]] = count + 1;
          }
          if (wordMap["%"] >= 2 && wordMap["s"] >= 2) {
            this.validSpace = true;
          } else {
            this.validSpace = false;
          }
        };
        countRepeatedWords(newVal);
      }
    },
    question(questionEdit) {
      this.formValues.question = questionEdit.question;
      this.formValues.question_audio = questionEdit.question_audio;
      this.formValues.hint = questionEdit.hint;
      this.formValues.answers = questionEdit.answers;
      this.answersListMcQ = this.formValues.answers;
      console.log('watch answersListMcQ',this.answersListMcQ)
      this.answersListMatchOneToOne = this.formValues.answers;
    },
  },
  mounted() {
    // console.log('questionSlug', this.questionSlug.slug)
    if (this.questionSlug.slug === "match_one_voice_text") {
      this.answerMatchTo.answer_pattern = "audio";
    } else if (this.questionSlug.slug === "match_one_voice_voice") {
      this.answerMatch.answer_pattern = "audio";
      this.answerMatchTo.answer_pattern = "audio";
    } else if (this.questionSlug.slug === "match_one_text_image") {
      this.answerMatchTo.answer_pattern = "image";
    } else if (this.questionSlug.slug === "match_one_voice_image") {
      this.answerMatch.answer_pattern = "audio";
      this.answerMatchTo.answer_pattern = "image";
    } else if (
      this.questionSlug.slug === "match_many_image_images" ||
      this.questionSlug.slug === "match_many_images_images"
    ) {
      this.answerMatch.answer_pattern = "image";
      this.answerMatchTo.answer_pattern = "image";
    } else if (this.questionSlug.slug === "match_many_image_voices") {
      this.answerMatch.answer_pattern = "audio";
      this.answerMatchTo.answer_pattern = "image";
    } else if (this.questionSlug.slug === "match_many_images_text") {
      this.answerMatch.answer_pattern = "text";
      this.answerMatchTo.answer_pattern = "image";
    } else if (this.questionSlug.slug === "match_many_images_voices") {
      this.answerMatch.answer_pattern = "audio";
      this.answerMatchTo.answer_pattern = "image";
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
