<script setup lang="ts">
import { ref } from "vue";

interface Props {
  oldTags: Array<string>;
  tagList: Array<string>;
}
const props = withDefaults(defineProps<Props>(), {
  oldTags: () => [],
  tagList: () => [],
});

interface Emits {
  // eslint-disable-next-line no-unused-vars
  (eventName: "updated", tagsList: Array<string>): void;
}
const emit = defineEmits<Emits>();

const currentTag = ref("");
const tags = ref<Array<string>>([]);

const handleKey = (e: KeyboardEvent) => {
  if (e.key === "," || e.key === "Enter") {
    e.preventDefault();
    if (currentTag.value !== "") {
      tags.value.push(currentTag.value);
      currentTag.value = "";

      emit("updated", tags.value);
    }
  } else if (e.key === "Backspace" && currentTag.value === "") {
    e.preventDefault();
    tags.value.pop();

    emit("updated", tags.value);
  }
};

const removeTag = (tag: number) => {
  tags.value.splice(tag, 1);
  emit("updated", tags.value);
};

// hack to get question modification working
let x: number;
x = setInterval(() => {
  if (props.oldTags.length) {
    tags.value = props.oldTags;
    clearInterval(x);
  }
});
</script>

<template>
  <FormKit
    inner-class="tags-container"
    :input-class="{ 'no-text-cursor': !currentTag.length }"
    type="text"
    label="প্রশ্নের ট্যাগ"
    @keydown="handleKey"
    v-model="currentTag"
    list="tags-list"
    autocomplete="off"
    ignore="true"
    help="ট্যাগ লিখে কমা(,) অথবা এন্টার (Enter) প্রেস করুন"
  >
    <template #prefix>
      <div
        class="tag"
        :class="{ focused: !currentTag.length }"
        v-for="(tag, idx) in tags"
        :key="idx"
      >
        <span>{{ tag }}</span>
        <button @click="removeTag(idx)">x</button>
      </div>
    </template>
  </FormKit>
  <datalist id="tags-list">
    <option v-for="tag in props.tagList" :key="tag" :value="tag" />
  </datalist>
</template>

<style lang="scss">
.tags-container {
  background-color: white;
  padding-left: 0.2rem;
}

.tag {
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;

  padding: 0.4rem;
  margin: 0.1rem;

  font-size: 0.75rem;

  background-color: hsl(0, 0%, 89%);
  color: black;

  border: 1px solid hsl(0, 0%, 89%);
  border-radius: 20px;

  button {
    display: inline;

    background: none;

    padding: 0;
    margin: 0;

    border: none;

    cursor: pointer;

    font-size: 0.75rem;
    color: hsl(0, 0%, 20%);
  }
}

// does not work in firefox at the time of writing
.focused:has(+ .no-text-cursor:focus) {
  background-color: hsl(213, 100%, 50%);
  color: white;

  button {
    color: hsl(0, 0%, 80%);
  }
}

.no-text-cursor {
  color: white;
}
</style>
