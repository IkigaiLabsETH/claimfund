import type { Router } from "vue-router"

class Private {
  constructor(
    public title: string,
    public image1: string,
    public image2: string,
    public description: string,
    public shareTo: {
      text: string,
      btns: Array<{
        text: string,
        actionLink: Function
        bgColor: string
      }>
    },
    public stats: {
      currency: string
      balance: number,
      withdrawn: number,
      goal: number,
      host: string,
      contributors: string,
      transactions: number
    },
    public claim: {
      balanceTitle: string,
      balance: number,
      contributionsText: string,
      buttonText: string,
      bottomWarningText: string
    },
    public smallFontTextsUnderMainElementThatSayYouAreObligedToSellYourSoulToTheDevilAfterTransaction: { // why not? 🙃
      text: string,
      buttons: Array<{
        text: string,
        action: Function
      }>
    }
  ) { }
}

export const mock = new Private(
  "",
  "image1.png",
  "image2.png",
  "",
  {
    text: "Share to:",
    btns: [
      {
        text: "Twitter",
        actionLink: (url: string | URL, title: string) => `https://twitter.com/share?url=${url}&text=${title}&via=claimfund`,
        bgColor: "#55ACEE"
      }, {
        text: "Reddit",
        actionLink: (url: string | URL, title: string) => `https://reddit.com/submit?url=${url}&title=${title}`,
        bgColor: "#FF5700"
      }, {
        text: "LinkedIn",
        actionLink: (url: string | URL, title: string) => `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
        bgColor: "#4875B4"
      }, {
        text: "Copy link",
        actionLink: () => 'copy',
        bgColor: "#F7931A"
      }
    ]
  },
  {
    currency: "USDC",
    balance: 0,
    withdrawn: 0,
    goal: 0,
    host: '',
    contributors: "0",
    transactions: 0
  },
  {
    balanceTitle: "Balance",
    balance: 100000,
    contributionsText: "List of contributions",
    buttonText: "Claim",
    bottomWarningText: "This is your private vault page.<br/>Don’t share the link with anyone.<br/>If you share the link - that person will be able to claim all raised funds."
  },
  {
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='https://docs.claim.fund/privacy-policy' target='blank_'>Privacy Policy</a> and <a href='https://docs.claim.fund/terms-of-use' target='blank_'>Terms of Use</a>.",
    buttons: [{
      text: "Start fundraising",
      action: function (router: Router) {
        router.push({name: 'create'})
      }
    }]
  }
)