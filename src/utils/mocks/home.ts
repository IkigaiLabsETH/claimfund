class Home {
  constructor(
    public title: string,
    public image: string,
    public description: string,
    public funded: string,
    public fundedImage: string,
    public btnText: string,
    public smallFontTextsUnderMainElementThatSayYouAreObligedToSellYourSoulToTheDevilAfterTransaction: { // why not? 🙃
      text: string,
      buttons: Array<{
        text: string,
        action: Function
      }>
    }
  ) { }
}

export const mock = new Home(
  "The Future Of Donations",
  "image1.png",
  "Decentralized micropayment tool built on the Solana Blockchain that helps collect donations.",
  "Funded with an instagrant by",
  "funded.svg",
  "Start fundraising",
  {
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='' target='blank_'>Privacy Policy</a> and <a href='' target='blank_'>Terms of Use</a>.",
    buttons: [
      {
        text: "Start fundraising",
        action: function () {
          console.log(this.text);
        }
      }
    ]
  }
)