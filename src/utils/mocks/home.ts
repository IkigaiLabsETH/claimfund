import type { Router } from "vue-router"

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
    text: "Claim Fund is not responsible for any fundraising.<br/>By making a donation you accept our <a href='https://docs.claim.fund/privacy-policy' target='blank_'>Privacy Policy</a> and <a href='https://docs.claim.fund/terms-of-use' target='blank_'>Terms of Use</a>.",
    buttons: [
      {
        text: "Start fundraising",
        action: function (router: Router) {
          router.push({name: 'create'})
        }
      }
    ]
  }
)