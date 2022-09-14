<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getAllQuestions } from "../firebase";
import type { Question } from "@/models/Question.model";

const allQuestions = ref([] as Question[]);

const loadQuestions = async () => {
  allQuestions.value = await getAllQuestions();
};

loadQuestions();
</script>

<template>
  <div class="container">
    <RouterLink :to="{ name: 'Add Question' }">
      <button>Add New Question</button>
    </RouterLink>
    <div class="question" v-for="question in allQuestions" :key="question.id">
      <div>Question: {{ question.text }}</div>
      <div>Answer: {{ question.answer }}</div>
      <div>Option 1: {{ question.opt1 }}</div>
      <div>Option 2: {{ question.opt2 }}</div>
      <div>Option 3: {{ question.opt3 }}</div>
    </div>
  </div>
</template>

<style>
.question {
  margin-bottom: 1rem;
  border: 1px solid black;
  width: 20vw;
  padding: 0.5rem;
  border-radius: 0.75rem;
}
</style>
