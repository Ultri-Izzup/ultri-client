import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

export default boot(({ app }) => {
  let defaultLocale;

  switch (process.env.REALM) {
    case "ultri.shop":
      defaultLocale = "en-US-ultri-shop";
      break;

    case "ultri.space":
      defaultLocale = "en-US-ultri-space";
      break;

    default:
      defaultLocale = "en-US";
      break;
  }

  const i18n = createI18n({
    locale: defaultLocale,
    globalInjection: true,
    messages
  });

  // Set i18n instance on app
  app.use(i18n);
});
