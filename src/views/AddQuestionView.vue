<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { addQuestion } from "../firebase";

const newQuestion = ref({} as Question);

const router = useRouter();

const handleAddQuestion = async () => {
  addQuestion(newQuestion.value);
  router.push({ name: "All Questions" });
};
</script>

<template>
  <div class="question-container">
    <input type="text" v-model="newQuestion.text" placeholder="Question" />
    <input type="text" v-model="newQuestion.answer" placeholder="Answer" />
    <input type="text" v-model="newQuestion.opt1" placeholder="Option 1" />
    <input type="text" v-model="newQuestion.opt2" placeholder="Option 2" />
    <input type="text" v-model="newQuestion.opt3" placeholder="Option 3" />
    <button @click="handleAddQuestion">Add Question</button>
    <RouterLink :to="{ name: 'All Questions' }">
      <button>Cancel</button>
    </RouterLink>
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
