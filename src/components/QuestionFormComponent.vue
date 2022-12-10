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

onBeforeMount(async () => {
    if (props.update) {
        oldTags.value = props.ogQues.tags;

        newQuestion.value = { ...props.ogQues }; //remove reactivity
    }
});
</script>

<template>
    <div class="modal-container">
        <transition name="form">
            <div class="form-container">
                <h1 v-if="props.update">প্রশ্ন সম্পাদনা</h1>
                <h1 v-else>নতুন প্রশ্ন</h1>
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
                        :validation-messages="{
                            required: 'প্রশ্ন ফিল্ডটি বাধ্যতামূলক',
                        }"
                        autocomplete="off"
                    />
                    <FormKit
                        type="text"
                        name="answer"
                        label="উত্তর"
                        validation="required"
                        :validation-messages="{
                            required: 'উত্তর ফিল্ডটি বাধ্যতামূলক',
                        }"
                        autocomplete="off"
                    />
                    <FormKit
                        type="text"
                        name="opt1"
                        label="অপশন ১"
                        validation="required"
                        :validation-messages="{
                            required: 'অপশন ১ ফিল্ডটি বাধ্যতামূলক',
                        }"
                        autocomplete="off"
                    />
                    <FormKit
                        type="text"
                        name="opt2"
                        label="অপশন ২"
                        validation="required"
                        :validation-messages="{
                            required: 'অপশন ২ ফিল্ডটি বাধ্যতামূলক',
                        }"
                        autocomplete="off"
                    />
                    <FormKit
                        type="text"
                        name="opt3"
                        label="অপশন ৩"
                        validation="required"
                        :validation-messages="{
                            required: 'অপশন ৩ ফিল্ডটি বাধ্যতামূলক',
                        }"
                        autocomplete="off"
                    />
                    <FormKit
                        type="text"
                        name="category"
                        label="ক্যাটাগরি"
                        validation="required"
                        :validation-messages="{
                            required: 'ক্যাটাগরি ফিল্ডটি বাধ্যতামূলক',
                        }"
                        list="categories-list"
                        autocomplete="off"
                    />
                    <TagInput
                        @updated="updateTags"
                        :oldTags="oldTags"
                        :tagList="tags"
                    />
                    <div class="buttons-holder">
                        <FormKit type="submit" label="সাবমিট" />
                    </div>
                </FormKit>
                <datalist id="categories-list">
                    <option v-for="cat in categories" :key="cat" :value="cat" />
                </datalist>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
.modal-container {
    position: fixed;
    inset: 0 0 0 0;
    z-index: 999;

    max-height: 100vh;

    transition: backdrop-filter 0.3s ease;

    backdrop-filter: blur(10px) opacity(1);
}

.form-container {
    position: absolute;
    inset: 0 0 0 0;

    max-height: 100vh;

    overflow-y: scroll;

    background-color: hsl(0, 0%, 100%);

    transition: transform 0.3s ease;

    form {
        max-width: 25em;
        margin-inline: auto;
    }

    $break-1: 1000px;
    $break-2: 800px;
    $break-3: 600px;

    @media (min-width: $break-3) {
        left: 40vw;
    }

    @media (min-width: $break-2) {
        left: 50vw;
    }

    @media (min-width: $break-1) {
        left: 60vw;
    }

    padding: 2rem 3rem;
}

.buttons-holder {
    display: flex;
    justify-content: space-between;
}
</style>
