import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { MerchantNav } from "./components/MerchantNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const name = session.user?.name || "Merchant";
  const email = session.user?.email || "";
  return <div className="min-h-screen lg:pl-64"><MerchantNav name={name} email={email} /><div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">{children}</div></div>;
}
