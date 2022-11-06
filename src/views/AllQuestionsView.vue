<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "@/models/Question.model";
import QuestionComponent from "../components/QuestionComponent.vue";
import { useQuestionsStore } from "@/stores/questionsStore";

const questionsStore = useQuestionsStore();

const props = defineProps<{ editMode: boolean }>();

const allQuestions = ref([] as Question[]);

const loadQuestions = async () => {
  await questionsStore.loadQuestions();
  allQuestions.value = questionsStore.getQuestions();
};

await loadQuestions();
</script>

<template>
  <div class="container">
    <h1>সকল প্রশ্ন</h1>
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
