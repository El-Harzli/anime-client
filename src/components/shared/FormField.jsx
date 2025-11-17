function FormField({ label, id, inputType = "text", placeholder, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block w-full mb-3 text-sm text-gray-500" htmlFor={id}>
        {label.toUpperCase()}
      </label>
      <input
        className="block w-full px-4 py-2 text-sm text-black bg-white rounded-sm md:px-6 outline-1 outline-gray-500"
        placeholder={placeholder}
        autoComplete="off"
        type={inputType}
        id={id}
        value={value}  // Dynamic value
        onChange={onChange}  // Dynamic onChange handler
      />
    </div>
  );
}

export default FormField;
