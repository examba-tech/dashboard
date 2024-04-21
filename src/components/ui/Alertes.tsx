export default function Alert({
  message,
  type,
  onClose,
}: {
  message: string;
  type: string;
  onClose: () => void;
}) {
  return (
    <div
      className={`bg-${type}-100 border-l-4 border-${type}-500 text-${type}-700 p-4`}
      role="alert"
    >
      <span className="closebtn" onClick={onClose}>
        &times;
      </span>
      <p className="font-bold">Atención</p>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
