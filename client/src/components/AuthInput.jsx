function AuthInput({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        border-b border-slate-300
        py-2
        focus:outline-none
        focus:border-indigo-600
        placeholder:text-slate-400
        transition
      "
    />
  );
}

export default AuthInput;
