import { useState } from 'react';
import { Mail, Phone, User, Building } from 'lucide-react';

export default function LeadIntake() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // This demo logs locally. Integrate with your CRM or email service.
    // eslint-disable-next-line no-console
    console.log('Lead captured:', form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-6 text-center">
        <h3 className="text-xl font-semibold">Thanks! We received your info.</h3>
        <p className="text-white/70 mt-2">We'll reach out shortly to learn more about your real estate goals.</p>
        <button
          onClick={() => { setForm({ name: '', email: '', phone: '', address: '', message: '' }); setSubmitted(false); }}
          className="mt-6 rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90"
        >
          Submit another lead
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-6">
      <h3 className="text-xl font-semibold">Lead Intake</h3>
      <p className="text-sm text-white/70">Capture client details and follow up later.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/70">Full Name</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 focus-within:ring-2 focus-within:ring-white/20">
            <User className="h-4 w-4 text-white/60" />
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Alex Johnson"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/70">Email</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 focus-within:ring-2 focus-within:ring-white/20">
            <Mail className="h-4 w-4 text-white/60" />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/70">Phone</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 focus-within:ring-2 focus-within:ring-white/20">
            <Phone className="h-4 w-4 text-white/60" />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(555) 555-5555"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/70">Property Address</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 focus-within:ring-2 focus-within:ring-white/20">
            <Building className="h-4 w-4 text-white/60" />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Market St, Unit 25"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-white/70">Notes</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Timeline, pre-approval status, price range, or specific needs..."
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-between gap-3">
          <p className="text-xs text-white/50">By submitting, you agree to be contacted about your inquiry.</p>
          <button type="submit" className="rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90">Save Lead</button>
        </div>
      </form>
    </div>
  );
}
