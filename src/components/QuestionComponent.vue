<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import type { Question } from "@/models/Question.model";
import {
  updateQuestion,
  deleteQuestion,
} from "@/firebase/controllers/questions";

const props = defineProps<{
  question: Question;
  categories: Map<string, string>;
  editMode: boolean;
}>();

const emit = defineEmits(["update-list"]);

const userStore = useUserStore();

const getCategoryLabel = (category: string): string => {
  if (category) {
    const label = props.categories.get(category);
    if (label) return label;
  }
  return "Uncategorized";
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
  emit("update-list");
};
</script>

<template>
  <div class="question" :key="question.id">
    <div class="category">
      <span class="category-text">{{
        getCategoryLabel(props.question.category)
      }}</span>
    </div>
    <div class="text">{{ props.question.text }}</div>
    <div>{{ props.question.answer }}</div>
    <div class="meta">
      <div class="owner">{{ props.question.owner?.name.split(" ")[0] }}</div>
      <div class="tags">{{ printTags(props.question.tags) }}</div>
    </div>
    <div v-if="props.editMode && isOwner(props.question.owner?.uid)">
      <button @click="handleEditQuestion(props.question)">Edit</button>
      <button @click="handleDeleteQuestion(props.question.id)">Delete</button>
    </div>
  </div>
</template>

<style lang="scss">
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
