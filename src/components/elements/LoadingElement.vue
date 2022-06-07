<template>
  <!-- loader, from https://loading.io/css/ -->
  <div>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
export default {
  name: "LoadingElement",
  props: {
    size: { type: String, required: false },
  },

  data() {
    return {
      source: 'https://loading.io/css/',
      elementFrame: '80px',
      elementSize: '64px',
      elementThickness: '8px'
    }
  },

  created() {
    console.log('loader source: https://loading.io/css/');
    if (this.size === 'small') {
      this.elementFrame = '50px';
      this.elementSize = '32px';
      this.elementThickness = '4px';
    }
  }
}
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: v-bind(elementFrame);
  height: v-bind(elementFrame);
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: v-bind(elementSize);
  height: v-bind(elementSize);
  margin: 8px;
  border: v-bind(elementThickness) solid #3D5DE8;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #3D5DE8 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
