<template>
  <span class="add-button" :to="{ name: 'Add Question' }"> + </span>
</template>

<style lang="scss">
.add-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 999;

  text-align: center;
  display: inline-block;
  cursor: pointer;
  width: 3.125rem;
  height: 3.125rem;
  border: 0.125rem solid hsl(211, 60%, 60%);
  background-color: hsl(211, 60%, 60%);
  padding: 0;
  text-decoration: none;
  text-align: center;
  color: white;
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 2.75rem;
  border-radius: 1.6875rem;
  margin: 0;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>
