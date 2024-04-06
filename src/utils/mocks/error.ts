class Error {
  constructor(
    public title: string,
    public image: string,
    public description: string,
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

export const mock = new Error(
  "Page not found",
  "image1.png",
  "There is no such page on Claim Fund.<br/>Go to Home page to find a fundraise or start yours.",
  "Home page",
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