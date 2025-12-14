import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleAuthMutation } from '../store/auth/authSliceApi';
import toast from 'react-hot-toast';

export const useGoogleAuth = () => {
  const [googleAuth, { isLoading }] = useGoogleAuthMutation();

  const handleGoogleSignIn = async (tokenResponse) => {
    console.log('🔍 Token response:', tokenResponse);
    const { access_token } = tokenResponse;
    
    try {
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      
      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info from Google');
      }
      
      const userData = await userInfoResponse.json();
      console.log('👤 User data from Google:', userData);
      
      // Send to backend
      const response = await googleAuth({
        access_token,
        email: userData.email,
        googleId: userData.id,
        name: userData.name,
        picture: userData.picture
      }).unwrap();


      if (response.success) {
        toast.success('Signed in successfully with Google!');
        return { success: true, data: response };
      }
    } catch (err) {
      console.error('❌ Google auth error:', err);
      const errorMessage = err?.data?.message || err?.message || 'Google sign in failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const googleLogin = useGoogleLogin({ 
    onSuccess: handleGoogleSignIn,
    onError: (error) => {
      console.error('Google login error:', error);
      toast.error('Google Sign In Failed');
    },
    scope: 'email profile'
  });

  return {
    googleLogin,
    isLoading
  };
};