import Link from "next/link";
import { CreateLinkForm } from "../../components/CreateLinkForm";
export default function NewCustomerPage() { return <main><Link href="/dashboard/customers" className="text-sm text-slate-500 hover:text-white">← Customers</Link><h1 className="mt-6 text-3xl font-semibold text-white">Add a customer</h1><p className="mt-2 text-sm text-slate-400">Save a little context before sending a payment request.</p><CreateLinkForm customer /></main>; }
