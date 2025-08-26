
import { useAuth } from '../contexts/AuthContext';

export const useApiClient = () => {
  const { cookies } = useAuth();

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(cookies && { 'Cookie': cookies }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  };

  return { makeAuthenticatedRequest };
};
