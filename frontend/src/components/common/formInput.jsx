const FormInput = ({ field, register, error }) => {
  const Icon = field.icon;
  
  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={20} />
        </div>
        <input
          {...register(field.name, field.validation)}
          type={field.type}
          placeholder={field.placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm ml-1">{error.message}</p>
      )}
    </div>
  );
};
export default FormInput;