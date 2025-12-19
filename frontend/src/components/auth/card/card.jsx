import FormInput from "../../common/formInput";
import AuthLeft from "./authLeft";
import Divider from "./divider";
import GoogleAuthButton from "./googleButton";

const Card = ({
  title,
  subTitle,
  formData,
  onSubmit,
  handleGoogle,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  isGoogleLoading,

  // optional UI
  showRemember = false,
  showForgot = false,
  showBottomLink = false,
  bottomLinkText = "",
  bottomLinkHref = "#",
  submitText = "Submit",
}) => {

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-5">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* LEFT SIDE */}
        <AuthLeft title={title}/>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{subTitle}</p>
            </div>

            {/* Google Button */}
            <GoogleAuthButton onClick={handleGoogle} isGoogleLoading={isGoogleLoading}/>

            <Divider text="OR"/>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {formData.map((field) => (
                <FormInput
                  key={field.name}
                  field={field}
                  register={register}
                  error={errors[field.name]}
                />
              ))}

              {/* Remember + Forgot */}
              {showRemember && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register("rememberMe")}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>

                  {showForgot && (
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isGoogleLoading}
                className="w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  submitText
                )}
              </button>

              {/* Bottom Link */}
              {showBottomLink && (
                <p className="text-center text-sm text-gray-600 mt-6">
                  {bottomLinkText}{" "}
                  <a
                    href={bottomLinkHref}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {title === "Sign In" ? "Sign up for free" : "Sign In"}
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;