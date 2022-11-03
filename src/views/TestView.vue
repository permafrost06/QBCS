<script setup lang="ts">
import { useQuestionsStore } from "@/stores/questionsStore";
import { ref } from "vue";

const questionsStore = useQuestionsStore();

const num_questions = ref(10);

const testQuestions = ref(questionsStore.getTestQuestions(num_questions.value));
</script>

<template>
  <div class="container">
    <div
      class="test-question"
      v-for="question in testQuestions"
      :key="question.id"
    >
      {{ question.text }}
      <fieldset>
        <div v-for="(opt, idx) in question.options" :key="idx">
          <input type="radio" :id="question.id + 'opt' + idx" :value="opt" />
          <label :for="question.id + 'opt' + idx">{{ opt }}</label>
        </div>
      </fieldset>
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

.test-question {
  border: 1px solid hsl(0, 0%, 70%);
  width: 20rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  position: relative;
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

label {
  margin-left: 0.35rem;
}
</style>
