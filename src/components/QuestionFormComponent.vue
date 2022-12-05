<script setup lang="ts">
import type { Question } from "@/models/Question.model";
import { onBeforeMount, ref } from "vue";
import { useQuestionsStore } from "@/stores/questionsStore";
import TagInput from "./TagInputComponent.vue";

interface Props {
  update: boolean;
  ogQues: Question;
}
const props = withDefaults(defineProps<Props>(), {
  update: false,
  ogQues: () => ({} as Question),
});

interface Emits {
  // eslint-disable-next-line no-unused-vars
  (eventName: "submit", question: Question): void;
  // eslint-disable-next-line no-unused-vars
  (eventName: "cancel"): void;
}
const emit = defineEmits<Emits>();

const questionsStore = useQuestionsStore();

const categories = questionsStore.getCategories();
const tags = questionsStore.getTags();
const oldTags = ref();

const updateTags = (tags: Array<string>) => {
  newQuestion.value.tags = tags;
};

const newQuestion = ref({} as Question);

const handleSubmit = () => {
  if (!newQuestion.value.tags) {
    newQuestion.value.tags = [];
  }

  emit("submit", newQuestion.value);
};

const cancel = (e: Event) => {
  e.preventDefault();
  emit("cancel");
};

onBeforeMount(async () => {
  if (props.update) {
    oldTags.value = props.ogQues.tags;

    newQuestion.value = { ...props.ogQues }; //remove reactivity
  }
});
</script>

<template>
  <div class="form-container">
    <FormKit
      type="form"
      v-model="newQuestion"
      @submit="handleSubmit"
      class="question-form"
      :actions="false"
    >
      <FormKit
        type="text"
        name="text"
        label="প্রশ্ন"
        validation="required"
        :validation-messages="{ required: 'প্রশ্ন ফিল্ডটি বাধ্যতামূলক' }"
        autocomplete="off"
      />
      <FormKit
        type="text"
        name="answer"
        label="উত্তর"
        validation="required"
        :validation-messages="{ required: 'উত্তর ফিল্ডটি বাধ্যতামূলক' }"
        autocomplete="off"
      />
      <FormKit
        type="text"
        name="opt1"
        label="অপশন ১"
        validation="required"
        :validation-messages="{ required: 'অপশন ১ ফিল্ডটি বাধ্যতামূলক' }"
        autocomplete="off"
      />
      <FormKit
        type="text"
        name="opt2"
        label="অপশন ২"
        validation="required"
        :validation-messages="{ required: 'অপশন ২ ফিল্ডটি বাধ্যতামূলক' }"
        autocomplete="off"
      />
      <FormKit
        type="text"
        name="opt3"
        label="অপশন ৩"
        validation="required"
        :validation-messages="{ required: 'অপশন ৩ ফিল্ডটি বাধ্যতামূলক' }"
        autocomplete="off"
      />
      <FormKit
        type="text"
        name="category"
        label="ক্যাটাগরি"
        validation="required"
        :validation-messages="{ required: 'ক্যাটাগরি ফিল্ডটি বাধ্যতামূলক' }"
        list="categories-list"
        autocomplete="off"
      />
      <TagInput @updated="updateTags" :oldTags="oldTags" :tagList="tags" />
      <div class="buttons-holder">
        <FormKit type="submit" label="সাবমিট" />
        <FormKit
          type="button"
          label="ক্যান্সেল"
          input-class="cancel-button"
          @click="cancel"
        />
      </div>
    </FormKit>
    <datalist id="categories-list">
      <option v-for="cat in categories" :key="cat" :value="cat" />
    </datalist>
  </div>
</template>

<style lang="scss">
.form-container {
  max-width: 25em;
  margin-inline: auto;
}

.buttons-holder {
  display: flex;
  justify-content: space-between;
}

[data-type="button"] .cancel-button {
  --button-color: hsl(0, 0%, 85%);
  background-color: var(--button-color);
  color: black;
}

[data-type="button"] .cancel-button:hover {
  background-color: var(--button-color);
}
</style>
