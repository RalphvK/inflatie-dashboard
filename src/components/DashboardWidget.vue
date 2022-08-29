<template>
  <dashboard-card :color="isExtreme ? themeColor : THEME.neutral">
    <div class="flex flex-col md:flex-row gap-5 h-full">

      <!-- left column -->
      <div class="col flex flex-col gap-5 justify-between">
        <widget-title :color="themeColor">
          <template #default>
            <slot name="primaryTitle"></slot>
          </template>
          <template #subtitle>
            <slot name="primarySubtitle"></slot>
          </template>
        </widget-title>

        <measure-primary
          :icon="icon"
          :icon-class="iconClass"
          :value="primaryValue"
          :tickerSymbol="tickerSymbol"
          :color="themeColor"
          :pulsing="isExtreme">
        </measure-primary>

        <measure-secondary :value="secondaryValue" :color="secondaryMeasureColor">
          <slot name="secondaryLabel"></slot>
        </measure-secondary>
      </div>

      <!-- right column -->
      <div class="col flex-grow" v-if="$slots.rightColumn">
        <slot name="rightColumn"></slot>
      </div>

    </div>
  </dashboard-card>
</template>

<script setup>
import { useDatasets } from '@/store/DatasetsStore.js';
import { THEME } from '@/config/constants.js';
const datasets = useDatasets();
</script>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import WidgetTitle from '@/components/WidgetTitle.vue';
import MeasurePrimary from '@/components/MeasurePrimary.vue';
import MeasureSecondary from '@/components/MeasureSecondary.vue';
import { colorMappingDesc } from '@/helpers/colorMapping.js';
import { THEME } from '@/config/constants.js';
import { getTickerSymbol } from '@/helpers/getTickerSymbol';
import { SentientPercentagePoint } from '@/helpers/SentientNumber.js'
import { mapping_PptMonth_PositiveYoY } from '@/helpers/colorMapping.js'

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    MeasurePrimary,
    MeasureSecondary
  },
  props: {
    primaryValue: {
      type: Object
    },
    secondaryValue: {
      type: Object
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String,
      default: null
    },
    colorMappingPrimary: {
      type: Array
    },
    colorMappingSecondary: {
      type: Array,
      default: mapping_PptMonth_PositiveYoY
    }
  },
  computed: {
    tickerSymbol() {
      return getTickerSymbol(this.primaryValue);
    },
    themeColor() {
      if (!this.datasets._ready) { return 'neutral'; }
      return colorMappingDesc(this.primaryValue.getFloat(), this.colorMappingPrimary);
    },
    secondaryMeasureColor() {
      if (!this.datasets._ready) { return 'neutral'; }
      return colorMappingDesc(this.secondaryValue.getFloat(), this.colorMappingSecondary);
    },
    isExtreme() {
      if (!this.primaryValue || typeof this.primaryValue.getFloat !== 'function' ) { return false; }
      return this.primaryValue.getFloat() > 20;
    },
  }
}
</script>