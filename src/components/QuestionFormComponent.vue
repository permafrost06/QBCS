<script setup lang="ts">
import { getQuestion } from "@/firebase/controllers/questions";
import type { Question } from "@/models/Question.model";
import type { FormKitNode } from "@formkit/core";
import { isString } from "@/composables";
import { onBeforeMount, ref } from "vue";
import { useQuestionsStore } from "@/stores/questionsStore";

interface Props {
  update: boolean;
  quesId: string;
}
const props = withDefaults(defineProps<Props>(), {
  update: false,
  quesId: "",
});

interface Emits {
  // eslint-disable-next-line no-unused-vars
  (eventName: "submit", question: Question): void;
}
const emit = defineEmits<Emits>();

const questionsStore = useQuestionsStore();

const categories = questionsStore.getCategories();

const validateTags = ({ value }: FormKitNode) => {
  if (value) {
    const tags = (value as string).split(",");

    if (tags.length) {
      return true;
    }
  }

  return false;
};

const maxTags = ({ value }: FormKitNode) => {
  if (value) {
    const tags = (value as string).split(",");

    if (tags.length <= 20) {
      return true;
    }
  }

  return false;
};

const newQuestion = ref({} as Question);

const handleSubmit = () => {
  if (props.update) {
    newQuestion.value.id = props.quesId;
  }

  emit("submit", newQuestion.value);
};

onBeforeMount(async () => {
  if (props.update) {
    const question = await getQuestion(props.quesId);
    const tags = question.tags;

    if (!isString(tags)) {
      question.tags = tags.join(", ");
    }

    newQuestion.value = question;
  }
});
</script>

<template>
  <div class="question-container">
    <FormKit
      type="form"
      submit-label="সাবমিট"
      v-model="newQuestion"
      @submit="handleSubmit"
    >
      <FormKit
        type="text"
        name="text"
        label="প্রশ্ন"
        validation="required"
        :validation-messages="{ required: 'প্রশ্ন ফিল্ডটি বাধ্যতামূলক' }"
      />
      <FormKit
        type="text"
        name="answer"
        label="উত্তর"
        validation="required"
        :validation-messages="{ required: 'উত্তর ফিল্ডটি বাধ্যতামূলক' }"
      />
      <FormKit
        type="text"
        name="opt1"
        label="অপশন ১"
        validation="required"
        :validation-messages="{ required: 'অপশন ১ ফিল্ডটি বাধ্যতামূলক' }"
      />
      <FormKit
        type="text"
        name="opt2"
        label="অপশন ২"
        validation="required"
        :validation-messages="{ required: 'অপশন ২ ফিল্ডটি বাধ্যতামূলক' }"
      />
      <FormKit
        type="text"
        name="opt3"
        label="অপশন ৩"
        validation="required"
        :validation-messages="{ required: 'অপশন ৩ ফিল্ডটি বাধ্যতামূলক' }"
      />
      <FormKit
        type="text"
        name="category"
        label="ক্যাটাগরি"
        validation="required"
        :validation-messages="{ required: 'ক্যাটাগরি ফিল্ডটি বাধ্যতামূলক' }"
        list="categories-list"
        autocomplete="off"
      />
      <FormKit
        type="text"
        name="tags"
        label="প্রশ্নের ট্যাগ"
        validation="validateTags|maxTags"
        :validation-rules="{ validateTags, maxTags }"
        :validation-messages="{
          validateTags: 'ট্যাগ সঠিকভাবে লিখুন',
          maxTags: 'সর্বোচ্চ ২০টি ট্যাগ গ্রহণযোগ্য',
        }"
        validation-visibility="live"
      />
    </FormKit>
    <datalist id="categories-list">
      <option v-for="cat in categories" :key="cat" :value="cat" />
    </datalist>
  </div>
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.3rem;
}
</style>
