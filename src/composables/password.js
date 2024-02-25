import { computed } from "vue";

const stdCharsets = [
  {
    name: "lowercase",
    re: /[a-z]/, // abcdefghijklmnopqrstuvwxyz
    length: 26
  },
  {
    name: "uppercase",
    re: /[A-Z]/, // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    length: 26
  },
  {
    name: "numbers",
    re: /[0-9]/, // 1234567890
    length: 10
  },
  {
    name: "replacement",
    re: /[!@$&*]/, // !@$&*
    length: 5
  },
  {
    name: "separator",
    re: /[_\-\.\,]/, // _-.,
    length: 5
  },
  {
    name: "special",
    re: /["#%'()+//:;<=>?[\]^{|}~] /, // "#%'()+/:;<=>?[\]^{|}~
    length: 22
  }
];

const calcCharsetLengthWith = (charsets) => (string) =>
  charsets.reduce(
    (length, charset) =>
      length + (charset.re.test(string) ? charset.length : 0),
    0
  );

const calcCharsetLength = calcCharsetLengthWith(stdCharsets);

const calcEntropy = (charset, length) =>
  Math.round((length * Math.log(charset)) / Math.LN2);

const passwordEntropy = (string) =>
  string ? calcEntropy(calcCharsetLength(string), string.length) : 0;

const commonSeq = [
  "12345",
  "67890",
  "765432",
  "qwertyuiop",
  "qwerty",
  "asdfghjkl",
  "zxcvbnm",
  "abcdefghijklmnopqrstuvwxyz",
  "abcdefg",
  "hijklmnop",
  "qrstuv",
  "wxyz",
  "password",
  "passwd"
];

const removeCommon = (passwd, userStrings = []) => {
  let re;

  let strOut = passwd;

  let removedCount = 0;

  for (const str of commonSeq) {
    // Test passwd fowards and remove str
    // Compare w/ original, if it was changed we need to update removedVal.
    // Update removedVal by 1 for <= 3 char strings and by 2 for all others

    console.log("REMOVING STR", str);

    re = new RegExp(str, "gi");

    strOut = strOut.replace(re, "");

    console.log("STROUT", strOut);

    // Test backwards
    // re = new RegExp([...str].reverse().join(""), "g");

    // strOut = strOut.replace(re, "");
  }

  for (const str of userStrings) {
    console.log("REMOVING USER STR", str);

    re = new RegExp(str, "gi");

    strOut = strOut.replace(re, "");

    console.log("STROUT", strOut);

    const rev = [...str].reverse().join("");

    // // Test backwards
    // re = new RegExp(rev, "g");

    // strOut = strOut.replace(re, "");
  }

  console.log("PRERETURN", strOut);

  // Return remaining string and the removedCount in object.
  return { remaining: strOut, removedCount: removedCount };
};

export default function usePassword() {
  const score = (passwd, userStrings = []) => {
    let str = "";

    console.log(userStrings);

    if (passwd) {
      const cleaned = removeCommon(passwd, userStrings);
      str = cleaned.remaining;
      console.log("AFTER REMOVAL OF COMMON", str);

      str = str.replace(/(.)\1+/g, "$1");

      str = str.replace(/\s/g, "");

      console.log("AFTER DEDUPE", str);
    }

    console.log("FINAL", str);

    return passwordEntropy(str);
  };

  return {
    score
  };
}
