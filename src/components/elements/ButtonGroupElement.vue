<template>
  <div>
    <button
        v-on:click="firstButtonClicked()"
        :disabled='isDisabled'
        class="basic-button basic-button-border-radius button-border-color-blue background-color-white font-color-blue"
    >{{ firstButtonText }}</button>
    <button
        v-on:click="secondButtonClicked()"
        :disabled='isDisabled'
        class="basic-button basic-button-border-radius basic-border-none background-color-blue font-color-white margin-left-10-px"
    >{{ secondButtonText }}</button>
  </div>
</template>

<script>
export default {
  name: "ButtonGroupElement",
  props: {
    firstButtonText: { type: String, required: true },
    secondButtonText: { type: String, required: true },
    isDisabled: { type: Boolean, required: false },
  },
  methods: {
    firstButtonClicked() {
      this.$emit("first-button-clicked");
    },

    secondButtonClicked() {
      this.$emit("second-button-clicked");
    }
  }
}
</script>

<style scoped>
@import '../../global.css';
</style>
