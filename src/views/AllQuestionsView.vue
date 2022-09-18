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
    <h1>সব প্রশ্ন</h1>
    <div class="question" v-for="question in allQuestions" :key="question.id">
      <!-- <div>প্রশ্ন: {{ question.text }}</div>
      <div>উত্তর: {{ question.answer }}</div>
      <div>অপশন ১: {{ question.opt1 }}</div>
      <div>অপশন ২: {{ question.opt2 }}</div>
      <div>অপশন ৩: {{ question.opt3 }}</div> -->
      <div class="text">{{ question.text }}</div>
      <div>{{ question.answer }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.5rem;
}

.question {
  /* margin-bottom: 1rem; */
  border: 1px solid hsl(0, 0%, 70%);
  width: 20rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;

  .text {
    font-weight: 700;
  }
}
</style>
