<template>
  <apexchart :class="class" type="area" :height="height" width="100%" :options="apexOptions" :series="dataSeries" v-if="dataAvailable"></apexchart>
</template>

<script>
import { isObject } from '@vue/shared';
import colors from 'tailwindcss/colors';

export default {
  props: {
    dataSeries: {
      type: [Object, null],
      required: true
    },
    categories: {
      type: [Array, null],
      required: true
    },
    yMin: {
      type: Number,
      default: 0
    },
    yMax: {
      type: Number
    },
    color: {
      type: String,
      default: 'slate'
    },
    colorVariant: {
      type: Number,
      default: 300
    },
    colorSecondary: {
      type: String,
      default: 'slate'
    },
    colorSecondaryVariant: {
      type: Number,
      default: 300
    },
    xFormatter: {
      type: Function
    },
    annotations: {
      type: Object
    },
    class: {
      type: [String, Array, Object],
      default: '-mb-16 -mt-8 max-h-full'
    },
    height: {
      type: String,
      default: '250px'
    }
  },
  computed: {
    dataAvailable() {
      if (!this.dataSeries || !isObject(this.dataSeries)) { return false; }
      return (Object.keys(this.dataSeries).length > 0);
    },
    getColorSecondary() {
      return this.colorSecondary ? this.colorSecondary : this.color;
    },
    apexOptions() {
      if (!this.dataAvailable) { return null; }
      return {
        colors: [
          colors[this.color][this.colorVariant],
          colors[this.getColorSecondary][this.colorSecondaryVariant]
        ],
        chart: {
          type: 'area',
          animations: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          height: '100%'
        },
        yaxis: {
          labels: {
            show: false
          },
          min: this.yMin,
          max: this.yMax
        },
        xaxis: {
          categories: this.categories,
          labels: {
            show: true,
            formatter: this.xFormatter,
            style: {
              fontSize: '12px',
              cssClass: 'x-labels'
            },
            hideOverlappingLabels: true
          },
          axisBorder: {
            show: false
          }
        },
        grid: {
          show: false
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        annotations: this.annotations

      }
    }
  }
}
</script>

<style lang="scss">
  .x-labels {
    opacity: 0.8;

    tspan {
      font-size: 8px;
    }
  }
</style>