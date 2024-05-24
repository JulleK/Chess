export default function Error({ errorCode, msg = "Page Not Found" }) {
  return (
    <div className="errorBox">
      {errorCode && <div className="errorCode">{errorCode}</div>}
      <p className="errorText">{msg}</p>
    </div>
  );
}
