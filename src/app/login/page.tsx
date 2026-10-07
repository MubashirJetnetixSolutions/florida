import type { Metadata } from "next";
import LoginView from "@/components/LoginView";

export const metadata: Metadata = {
  title: "Login | Florida Builders",
  description: "Sign in to Florida Builders Installations",
};

export default function LoginPage() {
  return <LoginView />;
}
