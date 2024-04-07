export const useShare = (func: Function, url: string, title: string) => {
  let res = func();

  // TODO transform html string to usual string
  if (res == 'copy') navigator.clipboard.writeText(`https://claim.fund/public/${1}`);
  else open(func(`https://claim.fund/public/${url}`, title));
}