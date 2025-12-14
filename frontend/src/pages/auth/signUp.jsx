import { useForm } from 'react-hook-form';
import Card from '../../components/auth/card/card';
import {User2,KeyRound, Mail } from "lucide-react";
import { useSignUpMutation } from '../../store/auth/authSliceApi';
import toast from 'react-hot-toast';
import { useGoogleAuth } from '../../hooks/googleAuth';

const signUpFormFields = [
  {
    name: "userName",
    type: "text",
    placeholder: "Enter your UserName",
    icon: User2,
    validation: {
      required: "Username is required",
      minLength: {
        value: 2,
        message: "Username must be at least 2 characters"
      },
      pattern: {
        value: /^[A-Za-z0-9._-]+$/,
        message: "Username cannot contain spaces"
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
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Must include uppercase, lowercase, number & special character"
      }
    }
  },
   {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    icon: KeyRound,
    validation: {
      required: "Please confirm your password",
      validate: (value, formValues) => 
        value === formValues.password || "Passwords do not match"
    }
  }
];

const SignUp = () => {
  const [signUp] = useSignUpMutation();
  const { googleLogin, isLoading: isGoogleLoading } = useGoogleAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onBlur", 
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data) => {
    try {
      const result = await signUp(data).unwrap();
      if (result.success) {
        toast.success('Signed up Successfully');
      }
    } catch (err) {
      toast.error(err?.data?.message || "Network error");
    }
  };

  return (
    <>
      <Card
        title="Sign Up"
        subTitle="Create your new account"
        formData={signUpFormFields}
        onSubmit={onSubmit}
        handleGoogle={googleLogin}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        isGoogleLoading={isGoogleLoading}
        showRemember={false}
        showForgot={false}
        showBottomLink={true}
        bottomLinkText="Already have an account?"
        bottomLinkHref="signin"
        submitText="Create Account"
        />
    </>
  )
}

export default SignUp;
