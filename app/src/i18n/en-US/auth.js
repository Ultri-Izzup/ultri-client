export default {
  auth: {
    error: {
      EXPIRED_USER_INPUT_CODE_ERROR:
        "Expired Passcode. Request a new passcode and try again",
      LOGIN_FAILED_ERROR:
        "Passcode failed. Request a new passcode and try again",
      INCORRECT_USER_INPUT_CODE_ERROR:
        "Incorrect passcode."
    },
    passwordless: {
      dialog: {
        "DialogTitle": "Sign In",
        "email-formTitle": "Enter your email",
        "email-formBody": "We will send you a one-time-password (OTP).",
        "email-form-button": "Send OTP",
        "email-form-email-hint": "Email address",
        "code-formTitle": "Check your email",
        "code-formBody": "Enter the OTP we sent you.",
        "code-form-button": "Sign In",
        "code-form-email-hint": "OTP",
        "request-new-code": "Request new OTP code",
        "notification-requires-auth":
          "You must be signed in to view your notifications.",
        "chat-requires-auth": "You must be signed in to view chat messages.",
        "member-requires-auth":
          "You must be signed in to manage your membership.",
      },
    },
    signIn: {
      hint: 'Enter Izzup',
      label: 'Sign In',
    },
    email: {
      label: 'Email address',
      error: {
        invalid: 'Enter a valid email'
      }
    },
    passcode: {
      label: "Passcode",
      error: {
        invalid: 'Passcodes are six digits'
      },
      send: {
        label: "Send Passcode"
      }
    },
    username: {
      label: 'Username',
      error: {
        invalid: 'Only lowercase letters, numbers and underscore'
      }
    },
    claimUsername: {
      label: 'Claim Username',
    },
    domain: {
      label: 'Address domain',
    },
    checkUsernameAvailability: {
      label: 'Check Availability',
      error: {
        unavailable: 'The username is unavailable'
      }
    },
    password: {
      label: 'Password',
      error: {
        invalid: 'Choose a more secure password'
      }
    },

  },
};
