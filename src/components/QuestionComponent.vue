<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import type { Question } from "@/models/Question.model";
import {
  updateQuestion,
  deleteQuestion,
} from "@/firebase/controllers/questions";
import { ref } from "vue";

const props = defineProps<{
  question: Question;
  categories: Map<string, string>;
  editMode: boolean;
}>();

const emit = defineEmits(["update-list"]);

const userStore = useUserStore();

const deleteDialog = ref(true);

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

const handleDelete = async () => {
  await deleteQuestion(props.question.id);
  emit("update-list");
};

const promptDelete = () => {
  deleteDialog.value = true;
};

const cancelDelete = () => {
  deleteDialog.value = false;
};
</script>

<template>
  <div class="question" :key="question.id">
    <div class="delete-overlay" v-if="deleteDialog">
      Delete?
      <div>
        <button @click="handleDelete">Yes</button
        ><button @click="cancelDelete">No</button>
      </div>
    </div>
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
      <button @click="promptDelete">Delete</button>
    </div>
  </div>
</template>

<style lang="scss">
.question {
  border: 1px solid hsl(0, 0%, 70%);
  width: 20rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  position: relative;

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

  .delete-overlay {
    position: absolute;
    background-color: hsla(0, 100%, 63%, 0.7);
    inset: 0 0 0 0;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
  }
}
</style>
