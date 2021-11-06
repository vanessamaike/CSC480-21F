import React from "react";
const CustomizedBody = React.forwardRef((props, ref) => {
  const {
    bg,
    children,
    ...rest
  } = props

  return (
    <div {...rest} ref={ref} style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        paddingTop: "150px",
        minHeight: "80vh",
        paddingBottom: "20px",
      }}>
      {children}
    </div>
  );
});
export default CustomizedBody;
