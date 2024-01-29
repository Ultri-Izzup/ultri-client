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
    headline: "Fediverse Co-op"
  }
};

const locale = { ...enUS, ...override };

console.log(locale);

export default locale;
