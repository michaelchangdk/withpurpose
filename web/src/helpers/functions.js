// String Avatar function for HeaderAuth component and ProfilePage component

export const stringAvatar = (displayName) => {
  return {
    children: `${displayName.split(" ")[0][0]}${displayName.split(" ")[1][0]}`,
  };
};
