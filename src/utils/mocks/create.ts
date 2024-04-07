class Create {
  constructor(
    public image: string,
    public setup: {
      welcomingPhrase: string,
      titlePlaceholder: string,
      descriptionPlaceHolder: string,
      goalPlaceholder: string,
      tokens: {
        placeholder: string,
        options: Array<string>
      },
      emailPlaceholder: string,
      connectWalletBtnText: string
    },
    public share: {
      title: string,
      description: string,
      shareTo: {
        text: string,
        btns: Array<{
          text: string,
          actionLink: Function
          bgColor: string
        }>
      }
    },
    public privateZone: {
      title: string,
      description: string
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

export const mock = new Create(
  "image1.png",
  {
    welcomingPhrase: "Setup your Piggy Box",
    titlePlaceholder: "Title",
    descriptionPlaceHolder: "Description",
    goalPlaceholder: "Goal",
    tokens: {
      placeholder: "Token",
      options: ["SOL", "USDC", "BONK"]
    },
    emailPlaceholder: "Your email",
    connectWalletBtnText: "Connect Wallet"
  },
  {
    title: "Share your Piggy Box",
    description: "Here is your Piggy Box public link.<br/>Share it with everyone who can help you to make your fundraise happen!",
    shareTo: {
      text: "Share to:",
      btns: [
        {
          text: "Twitter",
          actionLink: (url: string | URL, title: string) => `https://twitter.com/share?url=${url}&text=${title}&via=claimfund`,
          bgColor: "#55ACEE"
        },{
          text: "Reddit",
          actionLink: (url: string | URL, title: string) => `https://reddit.com/submit?url=${url}&title=${title}`,
          bgColor: "#FF5700"
        },{
          text: "LinkedIn",
          actionLink: (url: string | URL, title: string) => `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
          bgColor: "#4875B4"
        },{
          text: "Copy link",
          actionLink: () => 'copy',
          bgColor: "#00B0AF"
        }
      ]
    }
  },
  {
    title: "Private zone",
    description: "Here is your Piggy Box manage link. Store it in the safe place. Don’t share it with anyone - link is your wallet!<br/><br/>If you loose this link - you won’t be able to restore the funds."
  },
  {
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='https://docs.claim.fund/privacy-policy' target='blank_'>Privacy Policy</a> and <a href='https://docs.claim.fund/terms-of-use' target='blank_'>Terms of Use</a>.",
    buttons: []
  }
)