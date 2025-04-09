import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
}
