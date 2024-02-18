export default function useRealms() {
  const realmList = {
    "usevue.org": {
      displayName: "useVue",
      displayDomain: "useVue.org",
      contentHost: "I.useVue.org",
      description: "Vue related content"
    },
    "democratic.space": {
      displayName: "Democratic Space",
      displayDomain: "Democratic.Space",
      contentHost: "my.Democratic.Space",
      description: "open political discussion"
    },
    "cycleopedia.org": {
      displayName: "CycleOpedia",
      displayDomain: "CycleOpedia.org",
      contentHost: "member.CycleOpedia.org",
      description: "bicycle related, including ebikes"
    },
    "opensociocracy.org": {
      displayName: "OpenSociocracy",
      displayDomain: "OpenSociocracy.org",
      contentHost: "member.OpenSociocracy.org",
      description: "all things Sociocracy related"
    },
    "maxpets.com": {
      displayName: "Max Pets",
      displayDomain: "MaxPets.com",
      contentHost: "my.MaxPets.com",
      description: "never too many pet posts"
    },
    "maxrecipes.com": {
      displayName: "Max Recipes",
      displayDomain: "MaxRecipes.com",
      contentHost: "my.MaxRecipes.com",
      description: "recipes and cooking"
    },
    "homebrewingbeer.com": {
      displayName: "Homebrewing Beer",
      displayDomain: "HomebrewingBeer.com",
      contentHost: "member.HomebrewingBeer.com",
      description: "anything brewing related"
    },
    "sportsword.com": {
      displayName: "Sports Word",
      displayDomain: "SportsWord.com",
      contentHost: "my.SportsWord.com",
      description: "all things sports related"
    },
    "collectorsword.com": {
      displayName: "Collectors Word",
      displayDomain: "CollectorsWord.com",
      contentHost: "my.CollectorsWord.com",
      description: "related to collections of all kinds"
    },
    "expertgaming.com": {
      displayName: "Expert Gaming",
      displayDomain: "ExpertGaming.com",
      contentHost: "my.ExpertGaming.com",
      description: "taking gaming to a new level"
    },
    "dataencyclopedia.com": {
      displayName: "Data Encyclopedia",
      displayDomain: "DataEncyclopedia.com",
      contentHost: "my.DataEncyclopedia.com",
      description: "the art and science of data"
    }
  };

  const options = () => {
    const opts = [];
    for (const [key, value] of Object.entries(realmList)) {
      opts.push(value.displayDomain);
    }
    return opts;
  };

  return {
    options,
    realmList
  };
}
