import FormInput from "../../common/formInput";

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

  // optional UI
  showRemember = false,
  showForgot = false,
  showBottomLink = false,
  bottomLinkText = "",
  bottomLinkHref = "#",
  submitText = "Submit",
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-5 ">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome!</h1>
            <p className="text-blue-100 text-lg">
              {title} to continue your journey with us
            </p>
          </div>

          <div className="relative z-10">
            <blockquote className="text-white/90 text-lg italic mb-4">
              "The world connects through conversation — NodeTalk makes it easier."
            </blockquote>
            <p className="text-blue-200 font-medium">— NodeTalk</p>
            <p className="text-blue-200 text-sm mt-6">Join 1000+ happy users</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{subTitle}</p>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              className="w-full btn bg-white text-black border-[#e5e5e5]"
            >
              <svg aria-label="Google logo" width="20" height="20" viewBox="0 0 512 512">
                <path fill="#fff" d="M0 0h512v512H0z"/>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"/>
                <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"/>
                <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"/>
                <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54C309 40 157 43 90 170"/>
              </svg>
              {title} with Google
            </button>

            {/* Divider */}
            <div className="flex w-full flex-col">
              <div className="divider"></div>
            </div>

            {/* FORM INPUTS */}
            <div className="space-y-4">
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
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white py-3 rounded-lg font-medium disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Loading..." : submitText}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
