import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleAuthMutation } from '../store/auth/authSliceApi';
import toast from 'react-hot-toast';
import { setCredentials } from '../store/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export const useGoogleAuth = () => {
  const [googleAuth, { isLoading }] = useGoogleAuthMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (tokenResponse) => {
    const { access_token } = tokenResponse;

    try {
      // Get user info from Google
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch Google user');
      }

      const userData = await userInfoResponse.json();

      // Send to backend
      const response = await googleAuth({
        access_token,
        email: userData.email,
        googleId: userData.id,
        name: userData.name,
        picture: userData.picture,
      }).unwrap();

      if (response.success) {
        
        dispatch(setCredentials(response?.data))
        navigate("/chats", { replace: true });
        toast.success('Signed in Successfully');

      } else {
        toast.error('Google sign in failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || 'Google sign in failed');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSignIn,
    onError: () => toast.error('Google Sign In Failed'),
    scope: 'email profile',
  });

  return { googleLogin, isLoading };
};
