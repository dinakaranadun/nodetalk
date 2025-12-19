import { useForm } from 'react-hook-form';
import Card from '../../components/auth/card/card';
import { KeyRound, Mail } from "lucide-react";
import { useSignInMutation } from '../../store/auth/authSliceApi';
import toast from 'react-hot-toast';
import { useGoogleAuth } from '../../hooks/googleAuth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/auth/authSlice';

const signInFormFields = [
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

const SignIn = () => {
  const [signIn] = useSignInMutation();
  const { googleLogin, isLoading: isGoogleLoading } = useGoogleAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
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
    try {
      const response = await signIn(data).unwrap();
      if (response.success) {
        dispatch(setCredentials(response?.data))
        navigate("/chats", { replace: true });
        toast.success('Signed in Successfully');
      }
    } catch (err) {
      toast.error(err?.data?.message || "Network error");
    }
  };

  return (
    <>
      <Card
        title="Sign In"
        subTitle="Enter your credentials to sign in"
        formData={signInFormFields}
        onSubmit={onSubmit}
        handleGoogle={googleLogin}
        isGoogleLoading={isGoogleLoading} 
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        showRemember={true}
        showForgot={true}
        showBottomLink={true}
        bottomLinkText="Don't have an account?"
        bottomLinkHref="signup"
        submitText="Sign In"
      />
    </>
  );
};

export default SignIn;