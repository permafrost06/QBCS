<script setup lang="ts">
const props = defineProps<{
    open: boolean;
}>();
</script>

<template>
    <span :class="['add-button', { 'button-open': props.open }]"> + </span>
</template>

<style lang="scss">
.add-button {
    position: fixed;
    bottom: 1rem;
    right: 2rem;

    z-index: 9999;

    display: inline-block;

    width: 3.125rem;
    height: 3.125rem;

    margin: 0;
    padding: 0;

    color: white;
    text-align: center;
    font-size: 2.25rem;
    font-weight: 500;
    line-height: 2.75rem;
    text-decoration: none;

    background-color: hsl(211, 60%, 60%);

    border: 0.125rem solid hsl(211, 60%, 60%);
    border-radius: 1.6875rem;

    cursor: pointer;

    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, 0.3);
    }
}

.button-open {
    rotate: 45deg;
}
</style>
