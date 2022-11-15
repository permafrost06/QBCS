<script setup lang="ts">
import { useQuestionsStore } from "@/stores/questionsStore";
import { ref } from "vue";

const questionsStore = useQuestionsStore();

const answers = ref({} as { [key: string]: string });
const result = ref("");

const num_questions = ref(10);

const submitted = ref(false);

const divs = ref({} as { [key: string]: any });

const testQuestions = ref(questionsStore.getTestQuestions(num_questions.value));

testQuestions.value.forEach((question) => {
  answers.value[question.id] = "";
});

const logChange = (id: string, answer: string) => {
  answers.value[id] = answer;
};

const handleTestSubmit = () => {
  submitted.value = true;

  let correct = 0;
  let incorrect = 0;
  let empty = 0;
  let score = 0;

  for (const id in answers.value) {
    const answer = questionsStore.getAnswer(id);
    const quesObj = testQuestions.value.find((question) => question.id === id);

    if (quesObj) quesObj.ans = answer;

    if (answers.value[id]) {
      if (answer === answers.value[id]) {
        correct += 1;
        score += 1;

        (divs.value[id] as HTMLDivElement).classList.add("correct-ans");
      } else {
        incorrect += 1;
        score -= 0.5;

        (divs.value[id] as HTMLDivElement).classList.add("incorrect-ans");
      }
    } else {
      empty += 1;

      (divs.value[id] as HTMLDivElement).classList.add("incorrect-ans");
    }
  }

  result.value = `মার্কস: ${score}, সঠিক: ${correct}, বেঠিক: ${incorrect}, উত্তরহীন: ${empty}`;
};

const resetQuestionStyles = () => {
  for (const id in divs.value) {
    (divs.value[id] as HTMLDivElement).classList.remove("correct-ans");
    (divs.value[id] as HTMLDivElement).classList.remove("incorrect-ans");
  }
};

const restart = () => {
  resetQuestionStyles();
  testQuestions.value = questionsStore.getTestQuestions(num_questions.value);
  result.value = "";

  answers.value = {};

  testQuestions.value.forEach((question) => {
    answers.value[question.id] = "";
  });

  submitted.value = false;
};

const restartWithSame = () => {
  resetQuestionStyles();
  result.value = "";

  testQuestions.value.forEach((question) => {
    answers.value[question.id] = "";
  });

  submitted.value = false;
};
</script>

<template>
  <div class="container">
    <div
      class="test-question"
      v-for="question in testQuestions"
      :key="question.id"
      :ref="
        (el) => {
          divs[question.id] = el;
        }
      "
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
            :disabled="submitted"
          />
          <label
            :for="question.id + 'opt' + idx"
            :class="{
              correct: submitted && question.ans === opt,
              incorrect:
                submitted &&
                question.ans !== opt &&
                answers[question.id] === opt,
            }"
            >{{ opt }}</label
          >
        </div>
      </fieldset>
    </div>
    <button @click="handleTestSubmit" :disabled="submitted">জমা দিন</button>
    <p>{{ result }}</p>
    <button v-if="submitted" @click="restart">নতুন টেস্ট দিন</button>
    <button v-if="submitted" @click="restartWithSame">
      এই টেস্টটি পুনরায় দিন
    </button>
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

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.correct-ans {
  background-color: hsl(120, 48%, 75%);
}

.incorrect-ans {
  background-color: hsl(0, 75%, 75%);
}
</style>
