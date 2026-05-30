import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, Mail, Send, CheckCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((v) => ({ ...v, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full bg-transparent border-b border-wire focus:border-hot outline-none font-mono text-[10px] text-paper placeholder-ash py-3.5 transition-colors duration-200';

  return (
    <main className="pt-28 pb-24 min-h-screen page-enter">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Header */}
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-hot" />
            <span className="font-mono text-[10px] text-hot uppercase tracking-[0.35em]">Get In Touch</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold uppercase tracking-tighter leading-[0.82] text-paper"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Let's Build<br />
            <span className="text-hot italic">Something.</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* ── Form ── */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-6 py-16"
              >
                <CheckCircle className="w-10 h-10 text-hot" />
                <h2 className="font-display font-extrabold text-3xl uppercase tracking-tighter">
                  Message Received.
                </h2>
                <p className="font-mono text-[10px] text-ash leading-relaxed max-w-sm">
                  I'll get back to you within 24 hours. In the meantime, check out the work or hit me on Telegram for faster replies.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', budget: '', message: '' }); }}
                  className="font-mono text-[10px] text-ash hover:text-hot uppercase tracking-widest transition-colors mt-2"
                >
                  Send Another →
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] block mb-1">Your Name *</label>
                    <input
                      value={form.name}
                      onChange={set('name')}
                      placeholder="John Doe"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] block mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="john@company.com"
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] block mb-1">Budget Range</label>
                  <select
                    value={form.budget}
                    onChange={set('budget')}
                    className={`${field} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-ink text-ash">Select a range</option>
                    {['Under $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000+', 'Let\'s discuss'].map((v) => (
                      <option key={v} value={v} className="bg-ink text-paper">{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] block mb-1">Project Brief *</label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    rows={6}
                    placeholder="Tell me about the project — what you need, the deadline, and what 'done' looks like to you."
                    className={`${field} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-[10px] text-hot">
                    Something went wrong. Try emailing me directly at khadisconkhadiscon@gmail.com
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  className="group flex items-center gap-4 bg-hot text-ink px-10 py-5 font-mono text-[10px] uppercase tracking-widest hover:bg-paper transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Brief'}
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* ── Info column ── */}
          <aside className="lg:col-span-5 space-y-10">
            {/* Direct contact */}
            <div className="ruled-top pt-6">
              <span className="font-mono text-[9px] text-ash uppercase tracking-[0.35em] block mb-5">
                Or reach out directly
              </span>
              <div className="space-y-5">
                {[
                  { label: 'Email', val: 'khadisconkhadiscon@gmail.com', href: 'mailto:khadisconkhadiscon@gmail.com', icon: Mail },
                  { label: 'Telegram', val: '@khalex3_0', href: 'https://t.me/khalex3_0', icon: ArrowRight },
                  { label: 'X / Twitter', val: '@khalex3_0', href: 'https://x.com/khalex3_0', icon: ArrowRight },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between py-3.5 ruled-bottom hover:border-hot/30 transition-colors"
                  >
                    <div>
                      <div className="font-mono text-[9px] text-ash uppercase tracking-widest mb-0.5">{c.label}</div>
                      <div className="font-mono text-[10px] text-paper group-hover:text-hot transition-colors">{c.val}</div>
                    </div>
                    <c.icon className="w-3.5 h-3.5 text-wire group-hover:text-hot transition-colors mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Expectations */}
            <div className="bg-steel p-7 border-l-2 border-hot">
              <span className="font-mono text-[9px] text-hot uppercase tracking-[0.35em] block mb-4">What to expect</span>
              <div className="space-y-3">
                {[
                  'Response within 24 hours',
                  'Project kick-off within 3 days',
                  'Full revisions included',
                  'Files delivered in your preferred format',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 bg-hot rounded-full flex-shrink-0 mt-1.5" />
                    <span className="font-mono text-[10px] text-ash leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-mono text-[9px] text-wire uppercase tracking-widest">
              Based in Lagos · Available for remote and global projects
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
