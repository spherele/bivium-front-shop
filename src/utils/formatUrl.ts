export const formatUrl = (url: string) => {
  return new URL(url, process.env.NEXT_PUBLIC_URL).toString();
};
