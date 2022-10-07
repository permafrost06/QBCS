<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { useRoute, useRouter } from "vue-router";
import { addQuestion, getQuestion } from "@/firebase/controllers/questions";
import QuestionForm from "../components/QuestionFormComponent.vue";
import { ref } from "vue";
import { isText } from "@/composables";

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const question = ref<Question>();

(async () => {
  if (isText(id)) question.value = await getQuestion(id);
})();

const handleEditQuestion = async (newQuestion: Question) => {
  newQuestion.tags = (newQuestion.tags as unknown as string)
    .split(",")
    .map((tag) => tag.trim());

  addQuestion(newQuestion);
  router.push({ name: "All Questions" });
};
</script>

<template>
  <QuestionForm update :oldQues="question" @submit="handleEditQuestion" />
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.3rem;
}
</style>
