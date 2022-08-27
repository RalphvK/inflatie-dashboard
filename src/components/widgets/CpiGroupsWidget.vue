<template>
  <dashboard-card :color="themeColor">
    <div class="flex flex-col md:flex-row gap-5">

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title :color="themeColor">
          <template #default>
          Top {{this.groupCount}} jaarmutatie
          </template>
        </widget-title>

        <div>
          <div class="text-sm" v-for="item in TopGroups">
            {{item.name}}: {{item.value}}
          </div>
        </div>
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
import { colorMappingDesc } from '@/helpers/colorMapping.js';
import { THEME } from '@/config/constants.js';
import { toNumber } from '@vue/shared';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    MeasurePrimary,
    MeasureSecondary
  },
  props: {
    groupCount: {
      type: Number,
      default: 5
    }
  },
  computed: {
    themeColor() {
      if (!this.datasets._ready || !this.TopGroupValue) { return 'neutral'; }
      return colorMappingDesc(this.TopGroupValue);
    },
    TopGroups() {
      if (!Array.isArray(this.datasets.g_cpiGroups_top)) { return null; }
      // get first three groups as sentient number object
      const topGroups = this.datasets.g_cpiGroups_top.slice(0, this.groupCount);
      let displayItems = [];
      for (let i = 0; i < topGroups.length; i++) {
        displayItems.push({
          name: topGroups[i].Bestedingscategorieen_title.slice(7),
          value: topGroups[i].Value
        });
      }
      return displayItems;
    },
    TopGroupValue() {
      if (!Array.isArray(this.datasets.g_cpiGroups_top)) { return null; }
      return toNumber(this.datasets.g_cpiGroups_top[0].Value);
    }
  }
}
</script>