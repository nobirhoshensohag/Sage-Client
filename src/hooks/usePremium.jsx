import { useEffect, useState, useCallback } from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const usePremium = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);

  const fetchPremiumStatus = useCallback(() => {
    if (!user?.email) return;

    axiosInstance
      .get(`/users?email=${user.email}`)
      .then((res) => {
        setIsPremium(Boolean(res.data?.[0]?.isPremium));
      })
      .catch(console.error);
  }, [user?.email, axiosInstance]);

  useEffect(() => {
    fetchPremiumStatus();
  }, [fetchPremiumStatus]);

  useEffect(() => {
    window.addEventListener("premium-updated", fetchPremiumStatus);
    return () =>
      window.removeEventListener("premium-updated", fetchPremiumStatus);
  }, [fetchPremiumStatus]);

  return isPremium;
};

export default usePremium;