import SignIn from "@/components/module/auth/signIn/SignIn";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
