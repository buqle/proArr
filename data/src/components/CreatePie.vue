<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle :cx="radius"
            :cy="radius"
            fill="none"
            stroke="#ccc"
            :r="normalizedRadius"
            :stroke-width="stroke" />



    <circle
      stroke="#1eab84"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset: strokeDashoffset }"
      :stroke-width="stroke"
      fill="transparent"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />


  </svg>
</template>

<script>
  export default {
    props:['radius','progress','stroke'],
    data() {
      const normalizedRadius = this.radius - this.stroke * 2;
      const circumference = normalizedRadius * 2 * Math.PI;

      return {
        normalizedRadius,
        circumference
      };
    },
    computed: {
      strokeDashoffset() {
        return this.circumference - this.progress / 100 * this.circumference;
      }
    },
  }
</script>
<style>


  text{fz:12px;bdb:1px solid #ccc;fill:#c2e2f7;text-decoration:underline;}
  circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
