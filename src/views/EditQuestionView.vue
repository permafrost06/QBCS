<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { useRoute, useRouter } from "vue-router";
import { addQuestion } from "@/firebase/controllers/questions";
import QuestionForm from "../components/QuestionFormComponent.vue";

const router = useRouter();
const route = useRoute();

const id = route.params.id as string;

// (async () => {
//   if (isText(id)) question.value = await getQuestion(id);
// })();

const handleEditQuestion = async (newQuestion: Question) => {
  newQuestion.tags = (newQuestion.tags as unknown as string)
    .split(",")
    .map((tag) => tag.trim());

  addQuestion(newQuestion);
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
