export const useShare = (func: Function, title: string) => {
  let res = func();

  // TODO transform html string to usual string
  if (res == 'copy') navigator.clipboard.writeText(`https://claim.fund/box/${1}`);
  else open(func(`https://claim.fund/box/${1}`, title));
}