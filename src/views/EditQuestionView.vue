<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { useRoute, useRouter } from "vue-router";
import { updateQuestion } from "@/firebase/controllers/questions";
import QuestionForm from "../components/QuestionFormComponent.vue";
import { isString } from "@/composables";

const router = useRouter();
const route = useRoute();

const id = route.params.id as string;

const handleEditQuestion = async (newQuestion: Question) => {
  if (isString(newQuestion.tags))
    newQuestion.tags = newQuestion.tags.split(",").map((tag) => tag.trim());

  try {
    await updateQuestion(newQuestion);
  } catch (e) {
    console.log(e);
  }
  router.push({ name: "All Questions" });
};
</script>

<template>
  <QuestionForm update :quesId="id" @submit="handleEditQuestion" />
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.3rem;
}
</style>
