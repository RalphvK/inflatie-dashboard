<template>
  <dashboard-card :color="themeColor">
    <div>

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title :color="themeColor">
          <template #default>
          Top {{this.groupCount}} grootste stijgers
          </template>
        </widget-title>

        <div class="-mx-7 -mb-3">
          <table class="mx-0 w-full">
            <tbody :class="`divide-y divide-${themeColor}-900/10`">
              <tr v-for="item in TopGroups">
                <cpi-group-row :item="item" padding-size="7" />
              </tr>
            </tbody>
          </table>
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
import CpiGroupRow from '@/components/CpiGroupRow.vue';
import { colorMappingDesc } from '@/helpers/colorMapping.js';
import { THEME } from '@/config/constants.js';
import { toNumber } from '@vue/shared';
import { SentientPercentage } from '@/helpers/SentientNumbers.js';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    CpiGroupRow
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
          value: new SentientPercentage(topGroups[i].Value)
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