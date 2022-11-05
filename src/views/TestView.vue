<script setup lang="ts">
import { useQuestionsStore } from "@/stores/questionsStore";
import { ref } from "vue";

const questionsStore = useQuestionsStore();

const answers = ref({} as { [key: string]: string });
const result = ref("");

const num_questions = ref(10);

const testQuestions = ref(questionsStore.getTestQuestions(num_questions.value));

testQuestions.value.forEach((question) => {
  answers.value[question.id] = "";
});

const handleTestSubmit = () => {
  let correct: number = 0;
  let incorrect: number = 0;

  for (const id in answers.value) {
    if (questionsStore.getAnswer(id) === answers.value[id]) {
      correct += 1;
    } else {
      incorrect += 1;
    }
  }

  result.value = `Correct: ${correct}, Incorrect: ${incorrect}`;
};

const logChange = (id: string, answer: string) => {
  answers.value[id] = answer;
};
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
          <input
            type="radio"
            :name="question.text"
            :id="question.id + 'opt' + idx"
            :value="opt"
            @change="logChange(question.id, opt)"
          />
          <label :for="question.id + 'opt' + idx">{{ opt }}</label>
        </div>
      </fieldset>
    </div>
    <button @click="handleTestSubmit">Submit</button>
    <p>{{ result }}</p>
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
