import { useMemo, useState } from 'react';
import { Calculator, Percent, Building2, ArrowRightLeft } from 'lucide-react';
import CommissionBreakdownTable from './CommissionBreakdownTable';

function Input({ label, suffix, prefix, value, onChange, step = '0.01', min = '0', type = 'number', help }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-800">{label}</span>
        {help ? <span className="text-xs text-gray-500">{help}</span> : null}
      </div>
      <div className="relative">
        {prefix ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{prefix}</span>
        ) : null}
        <input
          type={type}
          inputMode={type === 'number' ? 'decimal' : undefined}
          step={step}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
            prefix ? 'pl-8' : ''
          } ${suffix ? 'pr-8' : ''}`}
        />
        {suffix ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{suffix}</span>
        ) : null}
      </div>
    </label>
  );
}

function Toggle({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 text-sm">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-md transition ${
            value === opt.value ? 'bg-gray-900 text-white shadow' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

export default function CommissionCalculator() {
  const [salePrice, setSalePrice] = useState('750000');
  const [totalCommissionPct, setTotalCommissionPct] = useState('6');
  const [side, setSide] = useState('listing');
  const [sideSplitPct, setSideSplitPct] = useState('50');
  const [referralPct, setReferralPct] = useState('0');
  const [brokerSplitPct, setBrokerSplitPct] = useState('70');
  const [teamSplitPct, setTeamSplitPct] = useState('0');
  const [transactionFee, setTransactionFee] = useState('395');

  const parsed = useMemo(() => {
    const p = (v) => {
      const n = parseFloat(String(v).replace(/,/g, ''));
      return Number.isFinite(n) ? n : 0;
    };
    return {
      salePrice: p(salePrice),
      totalCommissionPct: p(totalCommissionPct),
      sideSplitPct: p(sideSplitPct),
      referralPct: p(referralPct),
      brokerSplitPct: p(brokerSplitPct),
      teamSplitPct: p(teamSplitPct),
      transactionFee: p(transactionFee),
    };
  }, [salePrice, totalCommissionPct, sideSplitPct, referralPct, brokerSplitPct, teamSplitPct, transactionFee]);

  const results = useMemo(() => {
    const gross = (parsed.salePrice * parsed.totalCommissionPct) / 100;
    const yourSideGross = (gross * parsed.sideSplitPct) / 100;
    const referralFee = (yourSideGross * parsed.referralPct) / 100;
    const afterReferral = yourSideGross - referralFee;
    const teamSplit = (afterReferral * parsed.teamSplitPct) / 100;
    const afterTeam = afterReferral - teamSplit;
    const agentSplitAmount = (afterTeam * parsed.brokerSplitPct) / 100;
    const brokerageSplitAmount = afterTeam - agentSplitAmount;
    const netToAgent = agentSplitAmount - parsed.transactionFee;

    return {
      gross,
      totalCommissionPct: parsed.totalCommissionPct,
      yourSideGross,
      sideLabel: side === 'listing' ? 'Listing side' : 'Buyer side',
      referralFee,
      teamSplit,
      agentSplitPct: parsed.brokerSplitPct,
      agentSplitAmount,
      brokerageSplitAmount,
      transactionFee: parsed.transactionFee,
      netToAgent,
    };
  }, [parsed, side]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-gray-100"><Calculator className="w-5 h-5 text-gray-800" /></div>
        <h2 className="text-xl sm:text-2xl font-semibold">Commission Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Toggle
              options={[
                { label: 'Listing Agent', value: 'listing' },
                { label: 'Buyer Agent', value: 'buyer' },
              ]}
              value={side}
              onChange={setSide}
            />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Side split</span>
            </div>
            <Input
              label=""
              suffix="%"
              value={sideSplitPct}
              onChange={setSideSplitPct}
              step="0.1"
              min="0"
              help="Share of total commission for your side"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Sale Price" prefix="$" value={salePrice} onChange={setSalePrice} step="1" />
            <Input label="Total Commission" suffix="%" value={totalCommissionPct} onChange={setTotalCommissionPct} step="0.1" />
            <Input label="Referral Fee" suffix="%" value={referralPct} onChange={setReferralPct} step="0.1" />
            <Input label="Team Split to Lead/Team" suffix="%" value={teamSplitPct} onChange={setTeamSplitPct} step="0.1" />
            <Input label="Your Broker Split to You" suffix="%" value={brokerSplitPct} onChange={setBrokerSplitPct} step="0.1" />
            <Input label="Transaction Fee" prefix="$" value={transactionFee} onChange={setTransactionFee} step="1" />
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3 text-gray-800">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-600">Sale Price</div>
              <div className="text-right font-medium">{currency.format(parsed.salePrice)}</div>
              <div className="text-gray-600">Total Commission</div>
              <div className="text-right font-medium">{currency.format(results.gross)} ({results.totalCommissionPct}%)</div>
              <div className="text-gray-600">Your Side ({results.sideLabel})</div>
              <div className="text-right font-medium">{currency.format(results.yourSideGross)} ({parsed.sideSplitPct}%)</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <CommissionBreakdownTable results={results} />
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        Estimates are for planning only and may not reflect final settlement statements. Verify with your brokerage for exact fees and splits.
      </div>
    </div>
  );
}
