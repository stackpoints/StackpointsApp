import { redirect } from "react-router-dom";

export const loaderAuthGuard = async ({ request } , loader) => {
    const { expiry, token } = JSON.parse(localStorage.getItem("stackpoint"))|| { };
  const nowSeconds = Math.round(new Date().getTime() / 1000);

  const isAuthenticated = token && expiry > nowSeconds; // Check the user's authentication status here
  let params = new URLSearchParams();
  params.set("from", new URL(request.url).pathname);

    if (isAuthenticated) {
        return loader(request);
    } else {
        return redirect("/login?" + params.toString());
    }
  }

