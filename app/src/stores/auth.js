import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

// SuperTokens/Ultri Auth support
import Session from "supertokens-web-js/recipe/session";
import {
  createCode,
  consumeCode
} from "supertokens-web-js/recipe/passwordless";

import { api } from "boot/axios";

const domains = [
  "it.Izzup.com 8080",
  "my.BikeMechanic.info 8090",
  "my.Brewmasters.us 8091",
  "my.CollectorsWord.com 8092",
  "my.CycleOpedia.org 8093",
  "my.DataEncyclopedia.com 8094",
  "my.eTownMall.com 8095",
  "my.ExpertGaming.com 8096",
  "my.EZVegetarian.com 8097",
  "help.FinanceAProperty.com 8098",
  "my.HomebrewingBeer.com 8099",
  "my.HomebrewRecipe.com 8084",
  "my.MaxPets.com 8085",
  "my.MaxRecipes.com 8086",
  "my.OpenSociocracy.org 8087",
  "my.SportsWord.com 8088",
  "i.useVue.org 8089"
];

const domainMap = new Map([
  [
    "izzup.com",
    {
      domDisplay: "Izzup.com",
      display: "Izzup",
      fediverseHost: "it",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "cycleopedia.org",
    {
      domDisplay: "CycleOpedia.org",
      display: "CycleOpedia",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "opensociocracy.org",
    {
      domDisplay: "OpenSociocracy.org",
      display: "OpenSociocracy",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "usevue.org",
    {
      domDisplay: "useVue.org",
      display: "useVue",
      fediverseHost: "i",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "bikemechanic.info",
    {
      domDisplay: "BikeMechanic.info",
      display: "Bike Mechanic",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "brewmasters.us",
    {
      domDisplay: "Brewmasters.us",
      display: "Brewmasters",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "sportsword.com",
    {
      domDisplay: "SportsWord.com",
      display: "Sports Word",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "expertgaming.com",
    {
      domDisplay: "ExpertGaming.com",
      display: "Expert Gaming",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "etownmall.com",
    {
      domDisplay: "eTownMall.com",
      display: "eTown Mall",
      fediverseHost: "for-sale",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "maxpets.com",
    {
      domDisplay: "MaxPets.com",
      display: "Max Pets",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "homebrewingbeer.com",
    {
      domDisplay: "HomebrewingBeer.com",
      display: "Homebrewing Beer",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "homebrewrecipe.com",
    {
      domDisplay: "HomebrewRecipe.com",
      display: "Homebrew Recipe",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "collectorsword.com",
    {
      domDisplay: "CollectorsWord.com",
      display: "Collectors Word",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "maxrecipes.com",
    {
      domDisplay: "MaxRecipes.com",
      display: "Max Recipes",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "ezvegetarian.com",
    {
      domDisplay: "EZVegetarian.com",
      display: "EZ Vegetarian",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "financeaproperty.com",
    {
      domDisplay: "FinanceAProperty.com",
      display: "Finance a Property",
      fediverseHost: "help",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ],
  [
    "dataencyclopedia.com",
    {
      domDisplay: "DataEncyclopedia.com",
      display: "Data Encyclopedia",
      fediverseHost: "my",
      matrixHost: "matrix",
      sipHost: "sip",
      xmppHost: "xmpp"
    }
  ]
]);

export const useAuthStore = defineStore("auth", {
  state: () => ({
    targetUrl: useStorage("targetUrl", null),
    email: useStorage("memberEmail", null),
    uid: useStorage("memberUid", null),
    memberFediverseAccounts: useStorage("memberFediverseAccounts", []),
    signInRequired: useStorage("signInRequired", false),
    signInRequiredMsg: useStorage("signInRequiredMsg", null),
    createdAt: useStorage("memberCreatedAt", null),
    updatedAt: useStorage("memberUpdatedAt", null),
    isNewMember: useStorage("isNewmember", false),
    accounts: useStorage("memberAccounts", new Map()),
    accountServices: useStorage("memberAccountServices", new Map()),
    welcomeAccount: useStorage("welcomeAccount", null)
  }),
  getters: {
    isSignedIn(state) {
      if (state.uid && state.uid.length > 0) {
        return true;
      }
      return false;
    },
    getMember(state) {
      let member = {
        uid: null,
        email: null,
        createdAt: null
      };
      if (state.memberUid && state.memberUid.length > 0) {
        member.uid = state.uid;
        member.email = state.email;
        member.createdAt = state.createdAt;
      }
      return member;
    },
    hasBaseAccount(state) {
      return this.accounts.has("izzup.com");
    },
    showWelcome(state) {
      return this.welcomeAccount ? true : false;
    },
    showNewMemberDialog(state) {
      return this.isNewMember && this.accounts.size < 1 ? true : false;
    },
    domains(state) {
      return domainMap;
    },
    availableDomains(state) {
      const available = [];

      domainMap.forEach((data, domain, map) => {
        if (!this.accounts.has(domain)) {
          available.push({ label: data.domDisplay, value: domain });
        }
      });
      return available;
    }
  },
  actions: {
    $reset() {
      this.targetUrl = null;
      this.email = null;
      this.uid = null;
      this.signInRequired = false;
      this.signInRequiredMsg = null;
      this.createdAt = null;
      this.updatedAt = null;
      this.isNewMember = false;
      this.accounts = new Map();
      this.welcomeAccount = null;
      this.accountServices = new Map();
    },
    setTargetUrl(url) {
      this.targetUrl = url;
    },
    setSignInRequired(bool = true) {
      this.signInRequired = bool;
    },
    setSignInRequiredMsg(msg) {
      console.log(msg);
      this.signInRequiredMsg = msg;
      this.signInRequired = true;
    },
    async passwordlessRequest(email) {
      try {
        console.log("SENDING Login Email: ", email);
        const response = await createCode({
          email
        });
        console.log("RESPONSE", response);
      } catch (err) {
        console.log("ERROR", err);
        if (e.response.status == 401) {
          this.signInRequired = true;
        }
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you,
          // or if the input email / phone number is not valid.
          window.alert(err.message);
        } else {
          window.alert("Oops! Something went wrong.");
        }
      }
    },
    async passwordlessOTP(otp) {
      try {
        const response = await consumeCode({
          userInputCode: otp
        });

        this.signInRequired = false;

        console.error("RESPONSE \n", response);

        if (response.status === "OK") {
          console.log("AUTHUSER", response.user);
          const createdAt = new Date(response.user.timeJoined).toISOString();
          this.setMember(response.user.id, response.user.emails[0], createdAt);

          if (response.createdNewUser || response.createdNewRecipeUser) {
            this.isNewMember = true;
            console.log("NEW MEMBER", this.isNewMember);
          } else {
            // user sign in success

            const accounts = await this.getMemberAccounts();
            this.setMemberAccounts(accounts);
          }

          if (this.targetUrl && this.targetUrl.length > 0) {
            this.router.push(this.targetUrl);
          }

          return { status: "OK" };
        } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
          return {
            status: "INCORRECT_USER_INPUT_CODE_ERROR",
            maximumCodeInputAttempts: response.maximumCodeInputAttempts,
            failedCodeInputAttemptCount: response.failedCodeInputAttemptCount
          };
        } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
          // it can come here if the entered OTP was correct, but has expired because
          // it was generated too long ago.
          return {
            status: "EXPIRED_USER_INPUT_CODE_ERROR"
          };
        } else {
          // this can happen if the user tried an incorrect OTP too many times.
          return {
            status: "LOGIN_FAILED_ERROR"
          };
        }
      } catch (err) {
        console.log("ERROR", err);
        if (err.response.status == 401) {
          this.signInRequired = true;
        }
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you.
          return {
            status: err.message
          };
        } else {
          return {
            status: "LOGIN_FAILED"
          };
        }
      }
    },
    setMember(id, email, createdAt) {
      console.log();
      this.uid = id;
      this.email = email;
      this.createdAt = createdAt;
    },
    setMemberAccounts(accounts) {
      console.log("ACCOUNT", accounts);
      // accounts.forEach(account => {
      //   console.log('AUTH ACCOUNT', account)
      //   this.accounts.set(account.domain, account);
      // });
    },
    async getMemberAccounts() {
      const result = await api.get("/member");
      console.log("ACCOUNTS", result);
      if (result.data.accounts && result.data.accounts.length > 0) {
        result.data.accounts.forEach((account) => {
          console.log("ACCOUNT", account);
          this.accounts.set(account.domain, account);
        });
      }
    },
    async getMemberAccountServices(realm) {
      const result = await api.get("/member/account/" + realm);
      console.log("ACCOUNT SERVICES", result);
      if (result.data.services && result.data.services.length > 0) {
        const domain = realm.replace("_", ".");

        const serviceObj = {};

        result.data.services.forEach((service) => {
          serviceObj[service.service] = {
            status: service.status
          };
        });

        console.log("SERV  OBJ", serviceObj);

        this.accountServices.set(domain, serviceObj);
      }
    },
    async signUp(email, password) {
      const supertokensInput = {
        formFields: [
          {
            id: "email",
            value: email
          },
          {
            id: "password",
            value: password
          }
        ]
      };
      const result = await api.post("/auth/signup", supertokensInput);

      if (result.data.status === "OK") {
        // try {
        //   let response = await sendVerificationEmail();
        //   if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
        //     // This can happen if the info about email verification in the session was outdated.
        //     // Redirect the user to the home page
        //     window.location.assign("/");
        //   } else {
        //     // email was sent successfully.
        //     window.alert("Please check your email and click the link in it");
        //   }
        // } catch (err) {
        //   if (err.isSuperTokensGeneralError === true) {
        //     // this may be a custom error message sent from the API by you.
        //     window.alert(err.message);
        //   } else {
        //     window.alert(err.message);
        //   }
        // }
      }

      return result;
    },
    async signOut(url = "/") {
      this.router.push(url);

      await Session.signOut();

      this.$reset();
    },
    async claimUsername(username, domain) {
      if (!username) {
        return {
          status: "ERROR",
          message: "username_too_short"
        };
      }

      const charCount = username.length;
      if (charCount < 5) {
        return {
          status: "ERROR",
          message: "username_too_short"
        };
      }
      if (charCount > 30) {
        return {
          status: "ERROR",
          message: "username_too_long"
        };
      }
      if (username != username.toLowerCase()) {
        return {
          status: "ERROR",
          message: "no_uppercase"
        };
      }
      const regex = /^[a-zA-Z0-9_]*$/;
      if (!regex.test(username)) {
        return {
          status: "ERROR",
          message: "invalid_characters"
        };
      }

      try {
        const claimResult = await api.post("/member/username/claim", {
          username: username,
          domain: domain
        });
        console.log("CALIMRESULT", claimResult);
        if (claimResult.data.account) {
          const newAcct = claimResult.data.account;
          this.accounts.set(newAcct.domain, newAcct);
          return { status: "OK" };
        } else {
          return { status: "ERROR", message: claimResult.data.message };
        }
      } catch (e) {
        if (e.response.status == 401) {
          this.signInRequired = true;
        }
        return {
          status: "ERROR",
          message: e.response.data.message
        };
      }
    },
    getRealmServices(realm) {
      const services = this.accountServices.get(realm);
      return services ? services : new Map();
    },
    getRealmUsername(realm) {
      const account = this.accounts.get(realm);
      return account ? account.username : "";
    },
    getRealmEmail(realm) {
      const account = this.accounts.get(realm);
      return account ? account.email : "";
    },

    async checkAvailabilityMulti(username, domains) {
      if (!username) {
        return {
          status: "ERROR",
          message: "username_too_short"
        };
      }

      const charCount = username.length;
      if (charCount < 5) {
        return {
          status: "ERROR",
          message: "username_too_short"
        };
      }
      if (charCount > 30) {
        return {
          status: "ERROR",
          message: "username_too_long"
        };
      }
      if (username != username.toLowerCase()) {
        return {
          status: "ERROR",
          message: "no_uppercase"
        };
      }
      const regex = /^[a-zA-Z0-9_]*$/;
      if (!regex.test(username)) {
        return {
          status: "ERROR",
          message: "invalid_characters"
        };
      }

      try {
        const result = await api.post("/member/username/available/multi", {
          username: username,
          domains: domains
        });
        console.log("MULTIDOMAIN", result);
        return {
          status: "OK",
          available: result.data.available,
          unavailable: result.data.unavailable
        };
      } catch (e) {
        if (e.response.status == 401) {
          this.signInRequired = true;
        }
        return {
          status: "ERROR",
          message: e.response.data.message
        };
      }
    },

    async claimUsernameMulti(username, domains) {
      if (!username) {
        return {
          status: "ERROR",
          message: "username_too_short"
        };
      }

      const charCount = username.length;
      if (charCount < 5) {
        return {
          status: "ERROR",
          message: "username_too_short"
        };
      }
      if (charCount > 30) {
        return {
          status: "ERROR",
          message: "username_too_long"
        };
      }
      if (username != username.toLowerCase()) {
        return {
          status: "ERROR",
          message: "no_uppercase"
        };
      }
      const regex = /^[a-zA-Z0-9_]*$/;
      if (!regex.test(username)) {
        return {
          status: "ERROR",
          message: "invalid_characters"
        };
      }

      try {
        const claimResult = await api.post("/member/username/claim/multi", {
          username: username,
          domains: domains
        });
        console.log("MULTICLAIMRESULT", claimResult);
        if (claimResult.data.accounts) {
          claimResult.data.accounts.forEach((account) => {
            this.accounts.set(account.domain, account);
          });
          return { status: "OK" };
        } else {
          return { status: "ERROR", message: claimResult.data.message };
        }
      } catch (e) {
        if (e.response.status == 401) {
          this.signInRequired = true;
        }
        return {
          status: "ERROR",
          message: e.response.data.message
        };
      }
    },

    validateEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))(\+[a-z0-9-]+)?@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        email
      );
    },
    validatePasscode(otp) {
      return /^[0-9]{6}$/.test(otp);
    },
    realmFormat(domain) {
      return domain.toLowerCase().replace(".", "_");
    },
    async provisionFediverse(domain, password) {
      try {
        const result = await api.post("/member/account/fediverse", {
          password: password,
          domain: domain
        });

        console.log("PROVISONING", result);
        if (result.data.status == "active") {
          let services = this.accountServices.get(domain);

          console.log("SERVICES", services);

          if (services) {
            console.log(services);
          } else {
            services = { fediverse: result.data };
            this.accountServices.set(domain, services);
          }

          return { status: "OK" };
        } else {
          return { status: "ERROR", message: claimResult.data.message };
        }
      } catch (e) {
        console.log("ERROR: ", e);
        if (e.response.status == 401) {
          this.signInRequired = true;
        }
        return {
          status: "ERROR",
          message: e.response.data.message
        };
      }
    },
    async fediversePassword(domain, password) {
      try {
        const result = await api.post("/member/account/fediverse/password", {
          password: password,
          domain: domain
        });

        console.log("CHANGING PASSWORD", result);
        if (result.data.status == "updated") {
          return { status: "OK" };
        } else {
          return { status: "ERROR", message: claimResult.data.message };
        }
      } catch (e) {
        console.log("ERROR: ", e);
        if (e.response.status == 401) {
          this.signInRequired = true;
        }
        return {
          status: "ERROR",
          message: e.response.data.message
        };
      }
    },
    accountServiceStatus(domain, service) {},
    accountService(domain, service) {
      if (this.accountServices.has(domain)) {
        return this.accountServices.get(domain)[service];
      } else {
        return {
          status: "unprovisioned"
        };
      }
    }
  }
});
