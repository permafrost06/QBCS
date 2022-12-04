<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "@/models/Question.model";
import QuestionComponent from "../components/QuestionComponent.vue";
import { useQuestionsStore } from "@/stores/questionsStore";
import { FirebaseError } from "@firebase/util";
import { useRouter } from "vue-router";

const router = useRouter();

const questionsStore = useQuestionsStore();

const props = defineProps<{ editMode: boolean }>();

const allQuestions = ref([] as Question[]);

const loadQuestions = async () => {
  try {
    await questionsStore.loadQuestions();
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.message === "Missing or insufficient permissions.") {
        router.push({ name: "Log in" });
      }
    }
  }
  allQuestions.value = questionsStore.getQuestions();
};

await loadQuestions();
</script>

<template>
  <div class="container">
    <h1>সকল প্রশ্ন</h1>
    <div class="questions-container">
      <QuestionComponent
        v-for="question in allQuestions"
        :key="question.id"
        :question="question"
        :edit-mode="props.editMode"
        @update-list="loadQuestions"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.questions-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.5rem;

  margin: 1rem;
}
</style>
