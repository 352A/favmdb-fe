import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { signupSchema, type SignupData } from "@/validators/signupSchema";
import { Link } from "react-router-dom";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignupData) =>
      api.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    onSuccess: async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        toast.success("Account created! Redirecting...");
        reset();
        navigate("/dashboard");
      } catch (error) {
        toast.error("Signup succeeded, but authentication failed.");
        console.log(error);
        navigate("/login");
      }
    },
    onError: (error: import("axios").AxiosError) => {
      const message =
        (error.response?.data as { error?: string })?.error ||
        "Signup failed. Try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: SignupData) => mutation.mutate(data);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register a new account</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} placeholder="Ahmed" />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="ahmed@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmation">Confirm Password</Label>
          <Input
            id="confirmation"
            type="password"
            {...register("confirmation")}
            placeholder="••••••••"
          />
          {errors.confirmation && (
            <p className="text-sm text-red-500">
              {errors.confirmation.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create a new account"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="hover:text-primary underline underline-offset-4"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
