// Japan in Figures — the numbers behind the site.
//
// Every figure below is a published statistic, with its source and year
// recorded beside it. Figures come from the World Bank's World Development
// Indicators (WDI, accessed 26 November 2026) and from the Statistics
// Bureau of Japan's 2020 Population Census. Nothing here is estimated by
// this site: where a value is rounded for display, the full value is kept
// in the table the page prints.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Total population, persons. Source: World Bank WDI SP.POP.TOTL.
export const POPULATION = [
  127141000, 127076000, 126972000, 126811000, 126633000,
  126261000, 125681593, 125124989, 124516650, 123975371,
];

// Nominal GDP, current US dollars. Source: World Bank WDI NY.GDP.MKTP.CD.
export const GDP_USD = [
  4534438580494.94, 5110357383254.44, 5038231631660.71, 5154293721629.56,
  5245755000479.03, 5189197543645.38, 5225933520753.10, 4447976207314.78,
  4384854269961.93, 4190008188358.57,
];

// GDP per capita, current US dollars, 2019-2024.
// Source: World Bank WDI NY.GDP.PCAP.CD.
export const GDP_PER_CAPITA = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [41424.87, 41098.97, 41580.74, 35548.26, 35215.00, 33797.10],
};

// Unemployment, % of total labour force (modelled ILO estimate).
// Source: World Bank WDI SL.UEM.TOTL.ZS.
export const UNEMPLOYMENT = [3.39, 3.13, 2.82, 2.47, 2.35, 2.81, 2.81, 2.61, 2.60, 2.50];

// Consumer-price inflation, annual %. Source: World Bank WDI FP.CPI.TOTL.ZG.
export const CPI_INFLATION = [0.80, -0.13, 0.48, 0.99, 0.47, -0.02, -0.23, 2.50, 3.27, 2.74];

// Exports and imports of goods and services, current US dollars.
// Source: World Bank WDI NE.EXP.GNFS.CD and NE.IMP.GNFS.CD.
export const TRADE = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  exports: [893761110034.08, 785057625362.30, 912551747360.23, 918412226913.95, 923420059650.996, 920960002390.34],
  imports: [908590987610.91, 798645128766.75, 938755726387.13, 1076977967308.71, 988160815442.39, 958381808469.15],
};

// Exports of goods and services, % of GDP. Source: World Bank WDI NE.EXP.GNFS.ZS.
export const EXPORTS_SHARE_GDP = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [17.04, 15.13, 17.46, 20.65, 21.06, 21.98],
};

// Age structure, % of total population, 2024.
// Source: World Bank WDI SP.POP.0014.TO.ZS and SP.POP.65UP.TO.ZS;
// the 15-64 share is the remainder.
export const AGE_STRUCTURE_2024 = [
  { label: 'Aged 0–14', value: 11.44, colour: '#c8402a' },
  { label: 'Aged 15–64', value: 58.78, colour: '#16233f' },
  { label: 'Aged 65 and over', value: 29.78, colour: '#d9a441' },
];

// Total fertility rate, births per woman. Source: World Bank WDI SP.DYN.TFRT.IN.
export const FERTILITY = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [1.36, 1.33, 1.30, 1.26, 1.20, 1.15],
};

// Life expectancy at birth, years. Source: World Bank WDI SP.DYN.LE00.IN.
export const LIFE_EXPECTANCY = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [84.36, 84.56, 84.45, 84.00, 84.04, 84.04],
};

// The ten largest prefectures, 2020 Population Census (1 October 2020).
// Source: Statistics Bureau of Japan, 2020 Population Census.
// National total at the census: 126,146,099.
export const PREFECTURES_2020 = [
  { name: 'Tokyo', population: 14047594, share: 11.1 },
  { name: 'Kanagawa', population: 9237337, share: 7.3 },
  { name: 'Osaka', population: 8837685, share: 7.0 },
  { name: 'Aichi', population: 7542415, share: 6.0 },
  { name: 'Saitama', population: 7344765, share: 5.8 },
  { name: 'Chiba', population: 6284480, share: 5.0 },
  { name: 'Hyogo', population: 5465002, share: 4.3 },
  { name: 'Hokkaido', population: 5224614, share: 4.1 },
  { name: 'Fukuoka', population: 5135214, share: 4.1 },
  { name: 'Shizuoka', population: 3633202, share: 2.9 },
];

// Headline indicators shown on the overview page. Each names its year.
export const HEADLINES = [
  {
    label: 'Population',
    value: '124.0m',
    note: '2024 · down 541,000 on 2023',
    source: 'World Bank WDI',
  },
  {
    label: 'GDP, nominal',
    value: '$4.19tn',
    note: '2024 · 4th largest in the world',
    source: 'World Bank WDI',
  },
  {
    label: 'GDP per capita',
    value: '$33,797',
    note: '2024 · current US dollars',
    source: 'World Bank WDI',
  },
  {
    label: 'Unemployment',
    value: '2.5%',
    note: '2024 · of the total labour force',
    source: 'World Bank WDI (ILO)',
  },
  {
    label: 'Consumer inflation',
    value: '+2.7%',
    note: '2024 · annual CPI change',
    source: 'World Bank WDI',
  },
  {
    label: 'Life expectancy',
    value: '84.0 years',
    note: '2024 · at birth',
    source: 'World Bank WDI',
  },
];

// Dated releases a visitor can check against the source.
export const RELEASES = [
  { date: '2024', title: 'Population falls below 124 million for the first time', detail: 'Total population 123,975,371 at 1 October 2024 (World Bank WDI).' },
  { date: '2024', title: 'Nominal GDP $4.19 trillion', detail: 'Down from $4.38 trillion in 2023, largely on the weaker yen (World Bank WDI).' },
  { date: '2024', title: 'Consumer prices rise 2.7%', detail: 'Second year above 2% after 3.3% in 2023 (World Bank WDI).' },
  { date: '2024', title: 'Fertility rate falls to 1.15', detail: 'Down from 1.20 in 2023 and 1.36 in 2019 (World Bank WDI).' },
  { date: '2020', title: 'Census counts 126,146,099 people', detail: 'The top eight prefectures hold 50.7% of the population (Statistics Bureau of Japan).' },
];
