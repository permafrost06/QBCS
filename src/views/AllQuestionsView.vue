<script setup lang="ts">
import { ref } from "vue";
import { getAllQuestions } from "@/firebase/controllers/questions";
import type { Question } from "@/models/Question.model";
import QuestionComponent from "../components/QuestionComponent.vue";

const props = defineProps<{ editMode: boolean }>();

const allQuestions = ref([] as Question[]);

const loadQuestions = async () => {
  allQuestions.value = await getAllQuestions();
};

await loadQuestions();
</script>

<template>
  <div class="container">
    <h1>সব প্রশ্ন</h1>
    <QuestionComponent
      v-for="question in allQuestions"
      :key="question.id"
      :question="question"
      :edit-mode="props.editMode"
      @update-list="loadQuestions"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.5rem;
}
</style>
