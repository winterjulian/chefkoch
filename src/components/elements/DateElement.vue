<template>
  <div class="padding-bottom-5-px">
    {{ displayDate }}
  </div>
</template>

<script>
export default {
  name: "DateElement",
  props: {
    date: { type: Date, required: false }
  },
  data() {
    return {
      displayDate: ''
    }
  },
  created() {
    this.createDisplayDate(this.date);
  },
  methods: {
    createDisplayDate(date) {
      /**
       * Converts date into display format
       */
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.displayDate = date.toLocaleDateString('de-DE', options);
    }
  }
}
</script>

<style scoped>
@import '../../global.css';
</style>
