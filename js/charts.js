window.initPayoffCharts = function() {
  if (typeof Chart === 'undefined') return;

  const DARK   = '#0a1628';
  const GRID   = '#1e3a5f';
  const TICK   = '#475569';
  const BLUE   = '#3b82f6';
  const GREEN  = '#22c55e';
  const RED    = '#ef4444';
  const AMBER  = '#f59e0b';
  const MUTED  = '#64748b';

  Chart.defaults.color          = TICK;
  Chart.defaults.font.family    = "'DM Mono', monospace";
  Chart.defaults.font.size      = 10;

  const P = Array.from({length: 61}, (_, i) => 70 + i); // 70..130

  function ds(data, color, label = '', fill = true) {
    return {
      label,
      data,
      borderColor: color,
      backgroundColor: fill ? color + '18' : 'transparent',
      fill,
      tension: 0,
      pointRadius: 0,
      borderWidth: 2.5
    };
  }

  function makeChart(id, datasets, xLabels, xTitle, yTitle, showLegend) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    if (canvas._pc) { canvas._pc.destroy(); }
    canvas._pc = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: { labels: xLabels, datasets },
      options: {
        responsive: true,
        animation: false,
        plugins: {
          legend: { display: !!showLegend, labels: { color: MUTED, boxWidth: 12 } },
          tooltip: {
            backgroundColor: '#1e3a5f',
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0'
          }
        },
        scales: {
          x: {
            title: { display: true, text: xTitle || 'Price at Expiry', color: TICK },
            ticks: { color: TICK, maxTicksLimit: 9 },
            grid:  { color: GRID }
          },
          y: {
            title: { display: true, text: yTitle || 'Profit / Loss', color: TICK },
            ticks: { color: TICK },
            grid: {
              color: ctx => ctx.tick.value === 0 ? '#94a3b8' : GRID
            }
          }
        }
      }
    });
  }

  const lbl = P.map(String);

  // ── Futures ──────────────────────────────────────────────────────────────
  makeChart('payoff-1',  [ds(P.map(s => s-100),   BLUE,  'Long Futures')],  lbl);
  makeChart('payoff-2',  [ds(P.map(s => 100-s),   BLUE,  'Short Futures')], lbl);

  // ── Basic Options ─────────────────────────────────────────────────────────
  const lc = s => Math.max(s-100,0)-5;
  const sc = s => 5-Math.max(s-100,0);
  const lp = s => Math.max(100-s,0)-5;
  const sp = s => 5-Math.max(100-s,0);

  makeChart('payoff-3',  [ds(P.map(lc), BLUE,  'Long Call')],  lbl);
  makeChart('payoff-4',  [ds(P.map(sc), RED,   'Short Call')], lbl);
  makeChart('payoff-5',  [ds(P.map(lp), BLUE,  'Long Put')],   lbl);
  makeChart('payoff-6',  [ds(P.map(sp), RED,   'Short Put')],  lbl);

  // ── CFD (5× leverage) ────────────────────────────────────────────────────
  makeChart('payoff-7',  [ds(P.map(s => (s-100)*5), AMBER, 'CFD Long (5×)')], lbl, null, 'Profit / Loss');

  // ── Interest Rate Swap ────────────────────────────────────────────────────
  const rates = Array.from({length: 71}, (_, i) => +(2 + i*0.1).toFixed(1));
  makeChart('payoff-8',
    [ds(rates.map(r => +(r-5).toFixed(2)), BLUE, 'Net (pays fixed 5%)')],
    rates.map(r => r.toFixed(1)),
    'Floating Rate (%)', 'Net Payment (%)'
  );

  // ── Credit Default Swap ────────────────────────────────────────────────────
  const pd = Array.from({length: 11}, (_, i) => i);
  makeChart('payoff-9',
    [
      ds(pd.map(t => -0.5*t),                   MUTED, 'No Credit Event', false),
      ds(pd.map(t => t<6 ? -0.5*t : -0.5*t+90), GREEN, 'Credit Event @ t=6')
    ],
    pd.map(String), 'Period', 'Cumulative P&L', true
  );

  // ── Repeat basic options for speculation section ─────────────────────────
  makeChart('payoff-10', [ds(P.map(s => s-100),   BLUE, 'Long Futures')],  lbl);
  makeChart('payoff-11', [ds(P.map(s => 100-s),   BLUE, 'Short Futures')], lbl);
  makeChart('payoff-12', [ds(P.map(lc), BLUE, 'Long Call')],  lbl);
  makeChart('payoff-13', [ds(P.map(sc), RED,  'Short Call')], lbl);
  makeChart('payoff-14', [ds(P.map(lp), BLUE, 'Long Put')],   lbl);
  makeChart('payoff-15', [ds(P.map(sp), RED,  'Short Put')],  lbl);

  // ── Hedging Strategies ────────────────────────────────────────────────────
  // Fig 16: Protective Put (stock @100, ATM put K=100, premium=5)
  makeChart('payoff-16',
    [
      ds(P.map(s => s-100),                            MUTED, 'Stock only', false),
      ds(P.map(s => (s-100)+Math.max(100-s,0)-5),      BLUE,  'Protective Put')
    ],
    lbl, null, null, true
  );

  // Fig 17: Covered Call (stock @100, OTM call K=110, premium=4)
  makeChart('payoff-17',
    [
      ds(P.map(s => s-100),                            MUTED, 'Stock only', false),
      ds(P.map(s => (s-100)-Math.max(s-110,0)+4),      BLUE,  'Covered Call')
    ],
    lbl, null, null, true
  );

  // ── Spreads ───────────────────────────────────────────────────────────────
  // Fig 18: Bull Call Spread  K1=95, K2=105, net debit=5
  makeChart('payoff-18',
    [ds(P.map(s => Math.max(s-95,0)-Math.max(s-105,0)-5), BLUE, 'Bull Call Spread')],
    lbl
  );

  // Fig 19: Bear Put Spread  K1=95, K2=105, net debit=5
  makeChart('payoff-19',
    [ds(P.map(s => Math.max(105-s,0)-Math.max(95-s,0)-5), BLUE, 'Bear Put Spread')],
    lbl
  );

  // ── Straddles & Strangles ─────────────────────────────────────────────────
  // Fig 20: Long Straddle  K=100, total premium=10
  makeChart('payoff-20',
    [ds(P.map(s => Math.max(s-100,0)+Math.max(100-s,0)-10), BLUE, 'Long Straddle')],
    lbl
  );

  // Fig 21: Short Straddle  K=100, total premium=10
  makeChart('payoff-21',
    [ds(P.map(s => -(Math.max(s-100,0)+Math.max(100-s,0))+10), RED, 'Short Straddle')],
    lbl
  );

  // Fig 22: Long Strangle  K_put=95, K_call=105, total premium=6
  makeChart('payoff-22',
    [ds(P.map(s => Math.max(s-105,0)+Math.max(95-s,0)-6), BLUE, 'Long Strangle')],
    lbl
  );

  // Fig 23: Short Strangle  K_put=95, K_call=105, total premium=6
  makeChart('payoff-23',
    [ds(P.map(s => -(Math.max(s-105,0)+Math.max(95-s,0))+6), RED, 'Short Strangle')],
    lbl
  );
};
