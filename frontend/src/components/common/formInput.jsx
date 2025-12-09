

const FormInput = ({ icon, placeholder, required, pattern, title, hint, type = "text", value, onChange, minLength }) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          minLength={minLength}
          title={title}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      {hint && <p className="text-xs text-gray-500 ml-1">{hint}</p>}
    </div>
  );
};
export default FormInput;