import { defineStore } from "pinia";
import type { Question } from "@/models/Question.model";
import { getAllQuestions } from "@/firebase/controllers/questions";
import { selectRandomElements, shuffleArray } from "@/composables";
import type { TestQuestion } from "@/models/TestQuestion.model";

export const useQuestionsStore = defineStore("questions", {
  state: () => ({
    questions: [] as Question[],
  }),
  actions: {
    async loadQuestions() {
      if (this.questions.length == 0) {
        this.questions = await getAllQuestions();
      }
    },

    getQuestions() {
      return this.questions;
    },

    getTestQuestions(num_questions: number) {
      return selectRandomElements(this.questions, num_questions).map(
        (question) => {
          return {
            id: question.id,
            text: question.text,
            options: shuffleArray([
              question.answer,
              question.opt1,
              question.opt2,
              question.opt3,
            ]),
          } as TestQuestion;
        }
      );
    },

    getAnswer(id: string) {
      return this.questions.filter((question) => question.id === id)[0].answer;
    },
  },
});
