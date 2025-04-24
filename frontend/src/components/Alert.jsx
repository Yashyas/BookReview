const Alert = ({ type = "success", message }) => {
    const bgColor = type === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
    return (
      <div className={`${bgColor} p-3 rounded mt-4`}>
        {message}
      </div>
    );
  };
  
  export default Alert;
  