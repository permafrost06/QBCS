<script setup lang="ts">
import { ref } from "vue";
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from "@/firebase/controllers/questions";
import { getCategories } from "@/firebase";
import { useUserStore } from "@/stores/userStore";
import type { Question } from "@/models/Question.model";

const userStore = useUserStore();

const props = defineProps<{ editMode: boolean }>();

const allQuestions = ref([] as Question[]);
const categories = ref();

const loadQuestions = async () => {
  allQuestions.value = await getAllQuestions();
};

const loadCategories = async () => {
  categories.value = await getCategories();
};

await loadCategories();
await loadQuestions();

const getCategoryLabel = (category: string): string => {
  if (category) return categories.value.get(category);
  else return "Uncategorized";
};

const printTags = (tags: string[]): string => {
  if (tags) return tags.join(", ");
  else return "";
};

const isOwner = (uid: string) => {
  if (userStore.getUid() === uid) return true;
  return false;
};

const handleEditQuestion = async (question: Question) => {
  await updateQuestion(question);
};

const handleDeleteQuestion = async (id: string) => {
  await deleteQuestion(id);
  await loadQuestions();
};
</script>

<template>
  <div class="container">
    <h1>সব প্রশ্ন</h1>
    <div class="question" v-for="question in allQuestions" :key="question.id">
      <div class="category">
        <span class="category-text">{{
          getCategoryLabel(question.category)
        }}</span>
      </div>
      <div class="text">{{ question.text }}</div>
      <div>{{ question.answer }}</div>
      <div class="meta">
        <div class="owner">{{ question.owner?.name.split(" ")[0] }}</div>
        <div class="tags">{{ printTags(question.tags) }}</div>
      </div>
      <div v-if="props.editMode && isOwner(question.owner?.uid)">
        <button @click="handleEditQuestion(question)">Edit</button>
        <button @click="handleDeleteQuestion(question.id)">Delete</button>
      </div>
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
  border: 1px solid hsl(0, 0%, 70%);
  width: 20rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 0.5rem;
  }

  .category {
    .category-text {
      font-size: 0.8rem;
      border: 1px solid hsl(0, 0%, 95%);
      padding: 0.1rem 0.2rem;
      background-color: hsl(0, 0%, 95%);
      border-radius: 0.25rem;
    }
  }

  .owner {
    font-size: 0.7rem;
  }

  .text {
    font-weight: 700;
  }

  .tags {
    text-align: right;
    font-size: 0.8rem;
    color: hsl(0, 0%, 40%);
  }
}
</style>
