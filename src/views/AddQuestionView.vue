<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import type { FormKitNode } from "@formkit/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCategories } from "@/firebase";
import { addQuestion } from "@/firebase/controllers/questions";

const categories = ref();

const loadCategories = async () => {
  const cats = await getCategories();
  categories.value = Array.from(cats, ([value, label]) => ({ value, label }));
};

await loadCategories();

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

    if (tags.length < 20) {
      return true;
    }
  }

  return false;
};

const quesFormSchema = ref([
  {
    $formkit: "text",
    name: "text",
    label: "প্রশ্ন",
    // help: 'আপনার প্রশ্ন টি লিখুন',
    validation: "required",
    validationMessages: {
      required: "প্রশ্ন ফিল্ডটি বাধ্যতামূলক",
    },
  },
  {
    $formkit: "text",
    name: "answer",
    label: "উত্তর",
    // help: 'প্রশ্নের সঠিক উত্তরটি লিখুন',
    validation: "required",
    validationMessages: {
      required: "উত্তর ফিল্ডটি বাধ্যতামূলক",
    },
  },
  {
    $formkit: "text",
    name: "opt1",
    label: "অপশন ১",
    help: "প্রশ্নটির জন্য একটি (ভুল) অপশন লিখুন",
    validation: "required",
    validationMessages: {
      required: "অপশন ১ ফিল্ডটি বাধ্যতামূলক",
    },
  },
  {
    $formkit: "text",
    name: "opt2",
    label: "অপশন ২",
    help: "প্রশ্নটির জন্য একটি (ভুল) অপশন লিখুন",
    validation: "required",
    validationMessages: {
      required: "অপশন ২ ফিল্ডটি বাধ্যতামূলক",
    },
  },
  {
    $formkit: "text",
    name: "opt3",
    label: "অপশন ৩",
    help: "প্রশ্নটির জন্য একটি (ভুল) অপশন লিখুন",
    validation: "required",
    validationMessages: {
      required: "অপশন ৩ ফিল্ডটি বাধ্যতামূলক",
    },
  },
  {
    $formkit: "select",
    name: "category",
    label: "ক্যাটাগরি",
    // help: 'প্রশ্নের ক্যাটাগরি সিলেক্ট করুন',
    options: categories,
    validation: "required",
  },
  {
    $formkit: "text",
    name: "tags",
    label: "প্রশ্নের ট্যাগ",
    help: 'একাধিক ট্যাগ কমা দিয়ে আলাদা করুন। যেমন: "গুরুত্বপুর্ণ, সাম্প্রতিক"।',
    validation: "validateTags|maxTags",
    validationRules: { validateTags, maxTags },
    validationMessages: {
      validateTags: "ট্যাগ সঠিকভাবে লিখুন",
      maxTags: "সর্বোচ্চ ২০টি ট্যাগ গ্রহণযোগ্য",
    },
    validationVisibility: "live",
  },
]);

const newQuestion = ref({} as Question);

const router = useRouter();

const handleAddQuestion = async () => {
  newQuestion.value.tags = (newQuestion.value.tags as unknown as string)
    .split(",")
    .map((tag) => tag.trim());

  addQuestion(newQuestion.value);
  router.push({ name: "All Questions" });
};
</script>

<template>
  <div class="question-container">
    <FormKit
      type="form"
      submit-label="সাবমিট"
      v-model="newQuestion"
      @submit="handleAddQuestion"
    >
      <FormKitSchema :schema="quesFormSchema" />
    </FormKit>
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
