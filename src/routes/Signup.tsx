import { SignupForm } from "@/components/auth/signup-form";
import coverImg from "@/assets/10.jpg";
import Logo from "@/components/dashboard/logo";

export default function Signup() {
  return (
    <div className="grid min-h-svh bg-white/3 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={coverImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
        />
      </div>
    </div>
  );
}
