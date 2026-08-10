import Link from "next/link";
import { CreateLinkForm } from "../../components/CreateLinkForm";
export default function NewPaymentLinkPage() { return <main><Link href="/dashboard/payment-links" className="text-sm text-slate-500 hover:text-white">← Payment links</Link><h1 className="mt-6 text-3xl font-semibold text-white">Create a payment link</h1><p className="mt-2 text-sm text-slate-400">Set up a simple request you can share anywhere.</p><CreateLinkForm /></main>; }
