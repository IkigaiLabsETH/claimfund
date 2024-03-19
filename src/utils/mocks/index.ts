class Index {
  constructor(
    public title: string,
    public image1: string,
    public image2: string,
    public description: string,

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
        action: Function
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
        action: () => 5
      },
      {
        id: "1",
        title: "+25 USDC",
        description: "(25$)",
        action: () => 25
      },
      {
        id: "2",
        title: "+50 USDC",
        description: "(50$)",
        action: () => 50
      }
    ],
    field1Placeholder: "Your name (optional)",
    field2Placeholder: "Comment (optional)",
    buttonText: "Connect Wallet",
    contributionsText: "List of contributions"
  },
  {
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='' target='blank_'>Privacy Policy</a> and <a href='' target='blank_'>Terms of Use</a>.",
    buttons: [
      {
        text: "Start fundraising",
        action: function () {
          console.log(this.text);
        }
      }, {
        text: "Streaming widget",
        action: function () {
          console.log(this.text);
        }
      }, {
        text: "Run a raffle",
        action: function () {
          console.log(this.text);
        }
      }
    ]
  }
)