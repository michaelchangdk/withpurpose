import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component is used to scroll to the top of the page when the user navigates to a new page

export default function ScrollToTop() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, [routePath]);

  return null;
}
