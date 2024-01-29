import enUS from "../en-US";

console.log(enUS);

const override = {
  site: {
    copyright: {
      holder: {
        short: "Ultri",
        long: "Brian Winkers dba Ultri"
      }
    },
    name: "Ultri"
  },
  homepage: {
    headline2: "Ultri Tech Co-op",
    headline: "Break free from Big Tech",
    headline3_1: "Community Supported",
    headline3_2: "Open Source",
    headline3_3: "Publishing and Sharing",
    headline3_4: "Software Solutions"
  }
};

const locale = { ...enUS, ...override };

console.log(locale);

export default locale;
