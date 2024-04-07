class Contributions {
  constructor(
    public heading: string,
    public contributions: Array<{
      wallet: string,
      amount: string,
      name?: string,
      comment?: string
    }>
  ) { }
}

export const mock = new Contributions(
  'Contributions',
  [
    {
      wallet: '1234567890abcd',
      amount: '10 SOL',
      name: 'Mike',
      comment: '123456'
    }, {
      wallet: '1234567890abcd',
      amount: '20 SOL'
    }
  ]
)