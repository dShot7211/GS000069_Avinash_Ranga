/* eslint-disable react/jsx-no-useless-fragment */
const Mount = ({ visible, children }: any) => {
  if (!visible) return <></>;
  return <>{children}</>;
};

export default Mount;
