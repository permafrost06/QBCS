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

  addQuestion(newQuestion);
  router.push({ name: "All Questions" });
};
</script>

<template>
  <QuestionForm @submit="handleAddQuestion" />
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.3rem;
}
</style>
