import { useForm } from 'react-hook-form';
import Card from '../../components/auth/card/card';
import {User2,KeyRound, Mail } from "lucide-react";

const signUpFormFields = [
 {
    name: "userName",
    type: "text",
    placeholder: "Enter your UserName",
    icon: User2,
    validation: {
      required: "Username is required",
       minLength: {
        value: 1,
        message: "Username must be at least 2 characters"
      }
    }
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    icon: Mail,
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Please enter a valid email address"
      }
    }
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    icon: KeyRound,
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters"
      }
    }
  }
];

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onBlur", 
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    console.log("Sign Up with:", data);
    alert(`Signed in successfully!\nEmail: ${data.email}\nRemember Me: ${data.rememberMe}`);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div >
      <Card
        title="Sign Up"
        subTitle="Create your new account"
        formData={signUpFormFields}
        onSubmit={onSubmit}
        handleGoogle={handleGoogleSignUp}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        showRemember={false}
        showForgot={false}
        showBottomLink={true}
        bottomLinkText="Already have an account?"
        bottomLinkHref="signin"
        submitText="Create Account"
        />
    </div>
  )
}

export default SignUp;
