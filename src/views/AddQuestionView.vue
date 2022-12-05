<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { useRouter } from "vue-router";
import { addQuestion } from "@/firebase/controllers/questions";
import QuestionForm from "../components/QuestionFormComponent.vue";
import { isString } from "@/composables";

const router = useRouter();

const handleAddQuestion = async (newQuestion: Question) => {
  if (isString(newQuestion.tags))
    newQuestion.tags = newQuestion.tags.split(",").map((tag) => tag.trim());

  try {
    await addQuestion(newQuestion);
  } catch (error) {
    router.push({ name: "Log in" });
  }

  router.push({ name: "All Questions" });
};
</script>

<template>
  <h1 class="page-title">নতুন প্রশ্ন</h1>
  <QuestionForm @submit="handleAddQuestion" />
</template>
