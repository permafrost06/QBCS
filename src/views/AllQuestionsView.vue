<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "@/models/Question.model";
import QuestionComponent from "../components/QuestionComponent.vue";
import { useQuestionsStore } from "@/stores/questionsStore";
import { FirebaseError } from "@firebase/util";
import { useRouter } from "vue-router";
import QuestionForm from "@/components/QuestionFormComponent.vue";
import AddButton from "@/components/AddButtonComponent.vue";
import { addQuestion, updateQuestion } from "@/firebase/controllers/questions";

const router = useRouter();

const questionsStore = useQuestionsStore();

const props = defineProps<{ editMode: boolean }>();

const allQuestions = ref([] as Question[]);

const loadQuestions = async () => {
  try {
    await questionsStore.loadQuestions();
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.message === "Missing or insufficient permissions.") {
        router.push({ name: "Log in" });
      }
    }
  }
  allQuestions.value = questionsStore.getQuestions();
};

const showModal = ref(false);

const edit = ref(false);
const selectedQues = ref();

await loadQuestions();

const handleEdit = (id: string) => {
  selectedQues.value = questionsStore.getQuestion(id);
  edit.value = true;
  openModal();
};

const openModal = () => {
  showModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  showModal.value = false;
  document.body.style.overflow = "auto";
};

const handleAddNew = () => {
  if (showModal.value) {
    closeModal();
    return;
  }

  selectedQues.value = {};
  edit.value = false;
  openModal();
};

const handleSubmit = async (ques: Question) => {
  if (edit.value === true) {
    try {
      await updateQuestion(ques);
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await addQuestion(ques);
    } catch (error) {
      router.push({ name: "Log in" });
    }
  }

  loadQuestions();
  closeModal();
};
</script>

<template>
  <div class="container">
    <h1>সকল প্রশ্ন</h1>
    <AddButton @click="handleAddNew" :open="showModal" />
    <transition name="modal">
      <QuestionForm
        v-if="showModal"
        :update="edit"
        :ogQues="selectedQues"
        @submit="handleSubmit"
      />
    </transition>
    <div class="questions-container">
      <QuestionComponent
        v-for="question in allQuestions"
        :key="question.id"
        :question="question"
        :edit-mode="props.editMode"
        @update-list="loadQuestions"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>

<style lang="scss">
h1 {
  text-align: center;
}

.questions-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1.5rem;

  margin: 1rem 7rem;

  @media (max-width: 515px) {
    margin: 1rem;
  }
}

.modal-enter-from,
.modal-leave-to {
  backdrop-filter: blur(10px) opacity(0);

  .form-container {
    transform: translateX(100vw);
  }
}
</style>
