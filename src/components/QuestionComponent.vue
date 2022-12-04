<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { deleteQuestion } from "@/firebase/controllers/questions";
import { ref } from "vue";
import { isString } from "@/composables";
import { useRouter } from "vue-router";
import { getUid } from "@/firebase/controllers/user";
import EditButton from "./EditButtonComponent.vue";

const props = defineProps<{
  question: Question;
  editMode: boolean;
}>();

const emit = defineEmits(["update-list"]);

const router = useRouter();

const deleteDialog = ref(false);

const printTags = (tags: string[] | string): string => {
  if (!isString(tags)) {
    if (tags) {
      const tagString = tags.join(", ");

      const length = tagString.length;

      // this requires a better fix
      if (tagString[length - 1] === " ") {
        return tagString.substring(0, length - 2);
      } else {
        return tagString;
      }
    }
  }
  return "";
};

const isOwner = (uid: string) => {
  if (getUid() === uid) return true;
  return false;
};

const handleEditQuestion = async () => {
  router.push({ name: "Edit Question", params: { id: props.question.id } });
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
    <div
      class="category"
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      "
    >
      <span class="category-text">{{ props.question.category }}</span>
      <EditButton
        :visible="isOwner(props.question.owner?.uid)"
        :id="props.question.id"
      />
    </div>
    <div class="text">{{ props.question.text }}</div>
    <div>{{ props.question.answer }}</div>
    <div class="meta">
      <div class="owner">{{ props.question.owner?.name.split(" ")[0] }}</div>
      <div class="tags">{{ printTags(props.question.tags) }}</div>
    </div>
    <div v-if="props.editMode && isOwner(props.question.owner?.uid)">
      <button @click="handleEditQuestion">Edit</button>
      <button @click="promptDelete">Delete</button>
    </div>
  </div>
</template>

<style lang="scss">
.question {
  --color: hsl(300, 100%, 100%);

  border: 1px solid var(--color);
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;

  background-color: var(--color);

  position: relative;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

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
