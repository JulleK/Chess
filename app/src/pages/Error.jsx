export default function Error({ errorCode, msg = "Page Not Found" }) {
  return (
    <div className="error-box">
      {errorCode && <div className="error-code">{errorCode}</div>}
      <p className="error-text">{msg}</p>
    </div>
  );
}
