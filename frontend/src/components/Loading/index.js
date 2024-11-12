const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  `;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

const CustomSpinner = ({
  size = 30,
  borderColor = "#ffffff",
  borderWidth = 4,
}) => (
  <div
    style={{
      width: size,
      height: size,
      border: `${borderWidth}px solid ${borderColor}`,
      borderTop: `${borderWidth}px solid transparent`, // Makes it a spinning loader
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }}
  />
);

export default CustomSpinner;