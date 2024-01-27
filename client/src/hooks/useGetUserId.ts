export const useGetUserId = (): string | null => {
  return window.localStorage.getItem("userId");
};
