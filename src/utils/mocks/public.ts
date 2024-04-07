import type { Router } from "vue-router"

class Index {
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
      host: string
    },
    public contribution: {
      title: string,
      fee: string,
      options: Array<{
        id: string,
        title: string,
        description: string,
        amount: number,
      }>,
      field1Placeholder: string,
      field2Placeholder: string,
      buttonText: string,
      contributionsText: string,
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

export const mock = new Index(
  "Help for Ukraine.<br/>Charity fund to help military.",
  "image1.png",
  "image2.png",
  "Some description. Some description.<br/>Some description. Some description. Some description. Some description. Some description. ",
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
    balance: 123_456,
    withdrawn: 0,
    goal: 1_000_000,
    host: '1234...abcd'
  },
  {
    title: "Top up amount 💸",
    fee: "+0.001 SOL processing fee",
    options: [
      {
        id: "0",
        title: "+5 USDC",
        description: "(5$)",
        amount: 5
      },
      {
        id: "1",
        title: "+25 USDC",
        description: "(25$)",
        amount: 25
      },
      {
        id: "2",
        title: "+50 USDC",
        description: "(50$)",
        amount: 50
      }
    ],
    field1Placeholder: "Your name (optional)",
    field2Placeholder: "Comment (optional)",
    buttonText: "Connect Wallet",
    contributionsText: "List of contributions"
  },
  {
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='https://docs.claim.fund/privacy-policy' target='blank_'>Privacy Policy</a> and <a href='https://docs.claim.fund/terms-of-use' target='blank_'>Terms of Use</a>.",
    buttons: [
      {
        text: "Start fundraising",
        action: function (router: Router) {
          router.push({name: 'create'})
        }
      }
    //   , {
    //     text: "Streaming widget",
    //     action: function () {
    //       console.log(this.text);
    //     }
    //   }, {
    //     text: "Run a raffle",
    //     action: function () {
    //       console.log(this.text);
    //     }
    //   }
    ]
  }
)