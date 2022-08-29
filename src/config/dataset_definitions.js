import { trimYear } from "../../dataloader/modules/trimYear.js";
import { distillPeriods } from "../../dataloader/modules/distillPeriods.js";
import { joinMeasures } from "../../dataloader/modules/joinMeasures.js";
import { selectPeriod } from "../../dataloader/modules/selectPeriod.js";
import { mutationToIndex } from "../../dataloader/modules/mutationToIndex.js";

export const destination = `./public/datasets/dashboard_datasets.json`;

export const datasets = {

  cpi: {
    description: "Consumentenprijsindex",
    url: "https://odata4.cbs.nl/CBS/83133NED/Observations?$filter=(Measure in ('M001500')) and (Bestedingscategorieen in ('T001112')) and (Perioden ge '2018MM01') and (ValueAttribute in ('None', 'Zero'))&csv=83133NED",
    transform(records) {
      return distillPeriods(records, 'MM');
    }
  },
  cpi_voedingsmiddelen: {
    description: "Consumentenprijsindex voedingsmiddelen",
    url: "https://odata4.cbs.nl/CBS/83133NED/Observations?$filter=(Measure in ('M001500')) and (Bestedingscategorieen in ('CPI011000')) and (Perioden ge '2022MM04') and (ValueAttribute in ('None', 'Zero'))&csv=8313NED",
    transform(records) {
      return distillPeriods(records, 'MM');
    }
  },
  cpi_energie: {
    description: "Consumentenprijsindex energie",
    url: "https://odata4.cbs.nl/CBS/83133NED/Observations?$filter=(Measure in ('M001500')) and (Bestedingscategorieen in ('CPI045000')) and (Perioden ge '2022MM04') and (ValueAttribute in ('None', 'Zero'))&csv=83133NED",
    transform(records) {
      return distillPeriods(records, 'MM');
    }
  },
  cpi_groepen: {
    description: "Consumentenprijsindex per groep",
    url: "https://odata4.cbs.nl/CBS/83133NED/Observations?$filter=(Measure in ('M001500')) and (Bestedingscategorieen in ('CPI011000', 'CPI012000', 'CPI021000', 'CPI022000', 'CPI031000', 'CPI032000', 'CPI041000', 'CPI042000', 'CPI043000', 'CPI044000', 'CPI045000', 'CPI051000', 'CPI052000', 'CPI053000', 'CPI054000', 'CPI055000', 'CPI056000', 'CPI061000', 'CPI062000', 'CPI063000', 'CPI071000', 'CPI072000', 'CPI073000', 'CPI081000', 'CPI082000', 'CPI083000', 'CPI091000', 'CPI092000', 'CPI093000', 'CPI094000', 'CPI095000', 'CPI096000', 'CPI102000', 'CPI104000', 'CPI105000', 'CPI111000', 'CPI112000', 'CPI121000', 'CPI123000', 'CPI124000', 'CPI125000', 'CPI126000', 'CPI127000', 'CPI131000', 'CPI132000', 'CPI133000', 'CPI134000', 'CPI141000', 'CPI142000', 'CPI143000', 'CPI144000', 'CPI145000')) and (Perioden ge ('2022MM06')) and (ValueAttribute in ('None', 'Zero'))&csv=83133NED",
    transform(records) {
      let months = distillPeriods(records, 'MM');
      return selectPeriod(months, months[months.length - 1].Perioden_code);
    }
  },
  koopwoningen: {
    description: "Verkoopprijs koopwoningen",
    url: "https://odata4.cbs.nl/CBS/83906NED/Observations?$filter=(Measure in ('M001505_2', 'M005355', 'M001534')) and (Perioden ge '2021MM01') and (ValueAttribute in ('None', 'Zero'))&csv=83906NED",
    transform(records) {
      // distill months
      records = distillPeriods(records, 'MM');
      // trim to one year
      records = trimYear(records);
      // join rows and retunr
      return joinMeasures(records, {
        'Prijsindex verkoopprijzen\\Prijsindex bestaande koopwoningen': 'Prijsindex',
        'Prijsindex verkoopprijzen\\Ontwikkeling  t.o.v. een jaar eerder': 'Prijsindex_ontwikkeling'
      });
    }
  },
  cao_lonen_mutatie: {
    description: "Ontwikkeling CAO lonen",
    url: "https://odata4.cbs.nl/CBS/82838NED/Observations?$filter=(Measure in ('M001736_2')) and (BedrijfstakkenBranchesSBI2008 in ('T001081')) and (CaoSectoren in ('T001020')) and (Versie in ('A045600')) and (Perioden ge '2000MM07') and (ValueAttribute in ('None', 'Zero'))&csv=82838NED",
    transform(records) {
      return distillPeriods(records, 'MM');
    }
  },
  cao_lonen: {
    description: "Ontwikkeling CAO lonen",
    url: "https://odata4.cbs.nl/CBS/82838NED/Observations?$filter=(Measure in ('M001736_2')) and (BedrijfstakkenBranchesSBI2008 in ('T001081')) and (CaoSectoren in ('T001020')) and (Versie in ('A045600')) and (Perioden ge '2022MM06') and (ValueAttribute in ('None', 'Zero'))&csv=82838NED",
    transform(records) {
      return distillPeriods(records, 'MM');
    }
  },
  cao_uurloon: {
    description: "CAO lonen",
    url: "https://odata4.cbs.nl/CBS/82838NED/Observations?$filter=(Measure in ('M001736_1')) and (BedrijfstakkenBranchesSBI2008 in ('T001081')) and (CaoSectoren in ('T001020')) and (Versie in ('A045600')) and (Perioden ge '2010MM06') and (ValueAttribute in ('None', 'Zero'))&csv=82838NED",
    transform(records) {
      // first get all month periods
      const months = distillPeriods(records, 'MM');
      // get latest month
      const latestMonth = months[months.length - 1];
      const latestMonthKeyWord = latestMonth.Perioden_code.slice(4); // eg: MM07
      // select all periods with same month as latest
      return distillPeriods(records, latestMonthKeyWord);
    }
  },
  cao_uurloon_cpi: {
    description: "HICP index in zelfde perioden als CAO uurloon index",
    url: "https://odata4.cbs.nl/CBS/83133NED/Observations?$filter=(Measure in ('M001500')) and (Bestedingscategorieen in ('T001112')) and (Perioden ge '2010MM06') and (ValueAttribute in ('None', 'Zero'))&csv=83133NED",
    transform(records) {
      // first get all month periods
      const months = distillPeriods(records, 'MM');
      // get latest month
      const latestMonth = months[months.length - 1];
      const latestMonthKeyWord = latestMonth.Perioden_code.slice(4); // eg: MM07
      // select all periods with same month as latest
      const selection = distillPeriods(records, latestMonthKeyWord);
      // transform to index value (first record = 100)
      return mutationToIndex(selection, 'Value');
    }
  },
}