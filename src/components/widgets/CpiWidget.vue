<template>
  <dashboard-card color="red">
    <div class="flex flex-col md:flex-row gap-5">

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title color="red">
          <template #default>
          Consumentenprijsindex (CPI)
          </template>
          <template #subtitle>
            Stijging consumentenprijzen t.o.v. juli 2021
          </template>
        </widget-title>

        <measure-primary
          icon="bi-cash-coin"
          icon-class="mt-2"
          :value="CpiYtd"
          tickerSymbol="up"
          color="red"
        >
        </measure-primary>
        
        <measure-secondary :value="PctPointPrevMonth" color="red">
          t.o.v. voorgaande maand
        </measure-secondary>
      </div>

      <!-- right column -->
      <div class="col flex-grow">
        <apexchart class="-mb-12 -mt-8" type="area" height="240" width="100%" :options="chartOptions" :series="seriesValues" v-if="datasets.cpi"></apexchart>
      </div>

    </div>
  </dashboard-card>
</template>

<script setup>
  import {useDatasets} from '@/store/DatasetsStore.js';
  const datasets = useDatasets();
</script>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import WidgetTitle from '@/components/WidgetTitle.vue';
import MeasurePrimary from '@/components/MeasurePrimary.vue';
import MeasureSecondary from '@/components/MeasureSecondary.vue';
import { SentientPercentage, SentientPercentagePoint } from '../../helpers/SentientNumbers';
import { dataToSeries } from '@/helpers/dataToSeries.js';
import dataGetMax from '@/helpers/dataGetMax.js';
import { getShortYearAndMonth } from '@/helpers/shortMonthDutch.js';
import colors from 'tailwindcss/colors';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    MeasurePrimary,
    MeasureSecondary
  },
  computed: {
    CpiYtd() {
      return new SentientPercentage(this.datasets.getCpiYtd);
    },
    PctPointPrevMonth() {
      return new SentientPercentagePoint(this.datasets.getCpiPercentagePointIncreaseToMonth);
    },
    series() {
      if (!this.datasets.cpi) { return null; }
      let series = dataToSeries(this.datasets.cpi, [
        'Perioden_title',
        'Value'
      ]);
      return series;
    },
    seriesValues() {
      return [{
        name: 'Jaarmutatie CPI',
        data: this.series['Value']
      }]
    },
    chartOptions() {
      if (!this.datasets.cpi) { return null; }
      let series = this.series;
      return {
        colors: [colors.red[300]],
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
          min: 0,
          max: dataGetMax(this.series.Value)
        },
        xaxis: {
          categories: series['Perioden_title'],
          labels: {
            show: true,
            formatter: function (value) {
              return getShortYearAndMonth(value);
            },
            style: {
              fontSize: '8px',
              cssClass: 'x-labels'
            }
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
        annotations: {
          yaxis: [
            {
              y: 2,
              borderColor: colors.emerald[500],
              label: {
                borderColor: 'transparent',
                style: {
                  color: colors.emerald[500],
                  background: 'transparent'
                },
                text: 'Target: 2%'
              }
            }
          ]
        }

      }
    }
  }
}
</script>

<style>
  .x-labels {
    opacity: 0.8;
  }
</style>