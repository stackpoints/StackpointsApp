import { Route, createRoutesFromElements, redirect } from "react-router-dom";

import Login from "../Login";
import Claim from "../claim/Claim";
import Bounty from "../Bounty";
import BountyRewards from "../BountyRewards";
import BountyHistory from "../BountyHistory";
import {fetchBountyRewards, fetchDashboard } from "../../utility/api";
import App from "../../App";
import NotFound from "./NotFound";
import { loaderAuthGuard } from "../../utility/loaderAuthGuard";
function AllRoutes() {
    


  return createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFound />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* protected routes*/ }
             
      <Route
        path="/claim"
        element={<Claim />}
        loader={(request) => loaderAuthGuard(request,async () => {
         
          const res = await fetchDashboard();
          return res;
        })}
      />
       <Route
        path="/bountyRewards"
        element={<BountyRewards />}
        loader={(request) => loaderAuthGuard(request,async () => {
          
          const res = await fetchBountyRewards();        

          return res;
        })}
      />
   

      <Route
        path="/bounty"
        element={<Bounty />}
        loader={async ({ request }) => {
          const url = new URL(request.url);
          const bounty_code = url.searchParams.get("bounty_code");
          return { bounty_code };
        }}
      />
     
      <Route path="/bountyHistory" element={<BountyHistory />} />
      <Route
        path="/auth"
        element={""}
        loader={async ({ request }) => {
          const url = new URL(request.url);
          const code = url.searchParams.get("code");
          const redirect_url = url.searchParams.get("state");

          var res = null;
          if (code) {
            res = await fetch("http://0.0.0.0:3000/api/auth", {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code: code }),
            });

            if (!res.ok) {
              throw new Error("authentication failed");
            }

            const { access_token, expiry, accountId, profile_image, display_name } = await res.json();
            localStorage.setItem("stackpoint", JSON.stringify({ token:access_token, expiry, accountId,profile_image,display_name }));
           
            return redirect(redirect_url);
          } else {
            return redirect("/login");
          }
        }}
      />
    </Route>
  );
}

export default AllRoutes;