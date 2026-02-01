function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full px-4 py-3
        border border-slate-300
        rounded-lg
        focus:outline-none
        focus:ring-2 focus:ring-indigo-400
        transition
      "
    />
  );
}

export default Input;
