import { Percent, Banknote, HandCoins } from 'lucide-react';

const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

export default function CommissionBreakdownTable({ results }) {
  const rows = [
    { label: 'Gross commission (all sides)', value: results.gross, icon: Banknote },
    { label: `Your side gross (${results.sideLabel})`, value: results.yourSideGross, icon: HandCoins },
    { label: 'Referral fee', value: -results.referralFee, icon: Percent },
    { label: 'Team split', value: -results.teamSplit, icon: Percent },
    { label: `Broker split to you (${results.agentSplitPct}%)`, value: results.agentSplitAmount, icon: Percent },
    { label: 'Brokerage share', value: results.brokerageSplitAmount, icon: Percent },
    { label: 'Transaction fee', value: -results.transactionFee, icon: Banknote },
  ];

  const net = results.netToAgent;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="font-medium">Detailed Breakdown</div>
        <div className="text-xs text-gray-500">Auto-calculated</div>
      </div>

      <div className="divide-y divide-gray-100">
        {rows.map((r, idx) => (
          <div key={idx} className="px-4 sm:px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700">
              <r.icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{r.label}</span>
            </div>
            <div className={`text-sm font-medium ${r.value < 0 ? 'text-rose-600' : 'text-gray-900'}`}>{r.value < 0 ? `- ${currency.format(Math.abs(r.value))}` : currency.format(r.value)}</div>
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-5 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Estimated net to agent</div>
          <div className={`text-base font-semibold ${net < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>{currency.format(net)}</div>
        </div>
      </div>
    </div>
  );
}
