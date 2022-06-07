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
      let day = date.getDate();
      let month = date.getMonth();
      const year = date.getFullYear();

      if (day.length === 1) {
        day = '0' + day;
      }
      if (month.length === 1) {
        month = '0' + month;
      }

      this.displayDate = day + '.' + month + '.' + year;
    }
  }
}
</script>

<style scoped>
@import '../../global.css';
</style>
