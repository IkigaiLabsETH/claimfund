export const createFund = async (
  walletAddress: string,
  email: string,
  title: string,
  description: string,
  token: string,
  goal: number
) => {
  const path = `https://api.claim.fund`

  return fetch(`${path}/api/v1/manage/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      walletAddress,
      email,
      title,
      description,
      token,
      goal
    })
  })
}