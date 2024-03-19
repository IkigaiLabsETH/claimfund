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
        bgColor: "#00B0AF"
      }
    ]
  },
  {
    currency: "USDC",
    balance: 123_456,
    withdrawn: 0,
    goal: 1_000_000,
    host: '1234...abcd',
    contributors: "123",
    transactions: 10500
  },
  {
    balanceTitle: "Balance",
    balance: 100000,
    contributionsText: "List of contributions",
    buttonText: "Claim",
    bottomWarningText: "This is your private vault page.<br/>Don’t share the link with anyone.<br/>If you share the link - that person will be able to claim all raised funds."
  },
  {
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='' target='blank_'>Privacy Policy</a> and <a href='' target='blank_'>Terms of Use</a>.",
    buttons: [{
      text: "Start fundraising",
      action: function () {
        console.log(this.text);
      }
    }]
  }
)