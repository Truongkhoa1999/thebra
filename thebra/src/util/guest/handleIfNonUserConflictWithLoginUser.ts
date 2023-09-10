export const handleIfNonUserConflictWithLoginUser = () => {
  const jwt = localStorage.getItem("jwt");
  const isNonUser = localStorage.getItem("isNonUser");
  if (jwt && isNonUser) {
    localStorage.removeItem("isNonUser");
  } 
};
export const RemoveIsNonUser = () => {
  localStorage.removeItem('isNonUser')
}
