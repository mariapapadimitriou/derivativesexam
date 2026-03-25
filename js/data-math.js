const MATH_TEMPLATES=[
  {id:'FPL1',topic:'Long Futures P&L',generate(){
    const entry=rnd(50,200,5),move=rnd(5,40,5),exit=entry+move;
    const size=rndArr([100,500,1000,5000]),contracts=rnd(1,10);
    const profit=move*size*contracts,wrong1=move*size,wrong2=profit*2,wrong3=move*contracts;
    const {options,answer}=makeOptions(profit,[wrong1,wrong2,wrong3]);
    return{q:`A trader buys ${contracts} ${rndArr(['crude oil','wheat','gold','copper'])} futures contract${contracts>1?'s':''} at ${fmt(entry)} per unit. Each contract covers ${fmtN(size)} units. The price rises to ${fmt(exit)}. What is the total profit on closing?`,
      formulaHint:'Long Futures P&L = (Exit − Entry) × Contract Size × Contracts',
      options,answer,working:`Gain per unit = ${fmt(exit)} − ${fmt(entry)} = ${fmt(move)}\nTotal = ${fmt(move)} × ${fmtN(size)} × ${contracts} = ${fmt(profit)}`};
  }},
  {id:'FPL2',topic:'Short Futures P&L',generate(){
    const entry=rnd(60,250,5),move=rnd(5,35,5),exit=entry-move;
    const size=rndArr([100,500,1000,2000]),contracts=rnd(1,8);
    const profit=move*size*contracts,wrong1=move*size,wrong2=entry*size,wrong3=profit/contracts;
    const {options,answer}=makeOptions(profit,[wrong1,wrong2,wrong3]);
    return{q:`A speculator shorts ${contracts} ${rndArr(['wheat','oil','natural gas','silver'])} futures at ${fmt(entry)} per unit (${fmtN(size)} units/contract). At closeout the price is ${fmt(exit)}. What is the total profit?`,
      formulaHint:'Short Futures P&L = (Entry − Exit) × Contract Size × Contracts',
      options,answer,working:`Drop = ${fmt(entry)} − ${fmt(exit)} = ${fmt(move)}\nTotal = ${fmt(move)} × ${fmtN(size)} × ${contracts} = ${fmt(profit)}`};
  }},
  {id:'OTV1',topic:'Call Option — Intrinsic & Time Value',generate(){
    const strike=rnd(40,120,5),spot=strike+rnd(3,20,1),prem=spot-strike+rnd(1,12,1);
    const intrinsic=spot-strike,tv=prem-intrinsic;
    const {options,answer}=makeOptions(tv,[prem,0,intrinsic+2]);
    return{q:`A call option: strike ${fmt(strike)}, stock ${fmt(spot)}, premium ${fmt(prem)}. What is the TIME VALUE?`,
      formulaHint:'Intrinsic (call) = MAX(Spot−Strike, 0)\nTime Value = Premium − Intrinsic',
      options,answer,working:`Intrinsic = ${fmt(spot)} − ${fmt(strike)} = ${fmt(intrinsic)}\nTime value = ${fmt(prem)} − ${fmt(intrinsic)} = ${fmt(tv)}`};
  }},
  {id:'OTV2',topic:'Put Option — Intrinsic & Time Value',generate(){
    const strike=rnd(45,130,5),spot=strike-rnd(3,18,1),intrinsic=strike-spot,prem=intrinsic+rnd(1,10,1),tv=prem-intrinsic;
    const {options,answer}=makeOptions(tv,[prem,intrinsic,tv+2]);
    return{q:`A put option: strike ${fmt(strike)}, stock ${fmt(spot)}, premium ${fmt(prem)}. What is the TIME VALUE?`,
      formulaHint:'Intrinsic (put) = MAX(Strike−Spot, 0)\nTime Value = Premium − Intrinsic',
      options,answer,working:`Intrinsic = ${fmt(strike)} − ${fmt(spot)} = ${fmt(intrinsic)}\nTime value = ${fmt(prem)} − ${fmt(intrinsic)} = ${fmt(tv)}`};
  }},
  {id:'OPL1',topic:'Long Call P&L at Expiry',generate(){
    const strike=rnd(40,120,5),prem=rnd(2,12,1),spot=strike+prem+rnd(1,30,1),shares=rndArr([100,200,500]);
    const pnl=(spot-strike-prem)*shares,wrong1=(spot-strike)*shares,wrong2=-prem*shares,wrong3=pnl+prem*shares;
    const {options,answer}=makeOptions(pnl,[wrong1,wrong2,wrong3]);
    return{q:`An investor buys a call on ${fmtN(shares)} shares: strike ${fmt(strike)}, premium ${fmt(prem)}/share. At expiry the stock is ${fmt(spot)}. Total profit or loss?`,
      formulaHint:'Long Call P&L = (MAX(Spot−Strike,0) − Premium) × Shares',
      options,answer,working:`Per share = ${fmt(spot)}−${fmt(strike)}−${fmt(prem)} = ${fmt(spot-strike-prem)}\nTotal = ${fmt(spot-strike-prem)} × ${fmtN(shares)} = ${fmt(pnl)}`};
  }},
  {id:'OPL2',topic:'Long Put P&L at Expiry',generate(){
    const strike=rnd(50,130,5),prem=rnd(2,10,1),spot=strike-prem-rnd(1,25,1),shares=rndArr([100,200,500]);
    const pnl=(strike-spot-prem)*shares,wrong1=(strike-spot)*shares,wrong2=-prem*shares,wrong3=pnl*2;
    const {options,answer}=makeOptions(pnl,[wrong1,wrong2,wrong3]);
    return{q:`An investor buys a put on ${fmtN(shares)} shares: strike ${fmt(strike)}, premium ${fmt(prem)}/share. At expiry the stock is ${fmt(spot)}. Total profit or loss?`,
      formulaHint:'Long Put P&L = (MAX(Strike−Spot,0) − Premium) × Shares',
      options,answer,working:`Per share = ${fmt(strike)}−${fmt(spot)}−${fmt(prem)} = ${fmt(strike-spot-prem)}\nTotal = ${fmt(strike-spot-prem)} × ${fmtN(shares)} = ${fmt(pnl)}`};
  }},
  {id:'BEV1',topic:'Option Breakeven Price',generate(){
    const isCall=Math.random()>0.5,strike=rnd(40,120,5),prem=rnd(2,15,1);
    const be=isCall?strike+prem:strike-prem,w1=isCall?strike-prem:strike+prem,w2=strike,w3=isCall?strike+prem*2:strike-prem*2;
    const {options,answer}=makeOptions(be,[w1,w2,w3]);
    return{q:`An investor buys a ${isCall?'CALL':'PUT'} option: strike ${fmt(strike)}, premium ${fmt(prem)}/share. What is the breakeven price at expiry?`,
      formulaHint:isCall?'Call Breakeven = Strike + Premium':'Put Breakeven = Strike − Premium',
      options,answer,working:`Breakeven = ${fmt(strike)} ${isCall?'+':'-'} ${fmt(prem)} = ${fmt(be)}`};
  }},
  {id:'LEV1',topic:'Option Leverage Ratio',generate(){
    const spot=rnd(30,150,5),prem=rnd(2,15,1),leverage=Math.round(spot/prem);
    const w1=leverage+1,w2=100,w3=leverage-1;
    const fR=x=>x+':1';
    const {options,answer}=makeOptions(leverage,[w1,w2,w3],fR);
    return{q:`Call option covering 100 shares: premium ${fmt(prem)}/share, stock price ${fmt(spot)}/share. What is the leverage ratio?`,
      formulaHint:'Leverage = (Shares × Spot) ÷ (Shares × Premium) = Spot ÷ Premium',
      options,answer,working:`Market value = 100 × ${fmt(spot)} = ${fmt(100*spot)}\nCost = 100 × ${fmt(prem)} = ${fmt(100*prem)}\nLeverage = ${fmt(100*spot)} ÷ ${fmt(100*prem)} = ${leverage}:1`};
  }},
  {id:'DHG1',topic:'Delta Hedge — Contracts to Write',generate(){
    const shares=rndArr([100000,150000,200000,250000,300000,500000]),delta=rndArr([0.40,0.45,0.50,0.55,0.60]);
    const spc=100,contracts=Math.round(shares/(delta*spc));
    const w1=Math.round(shares/spc),w2=Math.round(shares*delta/spc),w3=contracts+rnd(500,2000,500);
    const fI=x=>x.toLocaleString();
    const {options,answer}=makeOptions(contracts,[w1,w2,w3],fI);
    return{q:`Delta-hedge a ${fmtN(shares)}-share long position. ATM call delta = ${delta}, covers ${spc} shares. How many call contracts to write for delta-neutral?`,
      formulaHint:'Contracts = Shares ÷ (Delta × Shares per Contract)',
      options,answer,working:`= ${fmtN(shares)} ÷ (${delta} × ${spc}) = ${fmtN(shares)} ÷ ${delta*spc} = ${contracts.toLocaleString()}`};
  }},
  {id:'BFH1',topic:'Bond Futures Duration Hedge',generate(){
    const pv=rndArr([5,8,10,15,20])*1e6,pd=rnd(60,100)/10,fd=rnd(50,85)/10,fn=rndArr([100000,200000]);
    const c=Math.round((pv*pd)/(fd*fn)),w1=Math.round((pv*fd)/(pd*fn)),w2=Math.round(pv/fn),w3=c+rnd(10,40,5);
    const fI=x=>x.toLocaleString();
    const {options,answer}=makeOptions(c,[w1,w2,w3],fI);
    return{q:`Bond portfolio: ${fmt(pv)} value, ${pd} yr duration. Bond futures: ${fd} yr duration, ${fmt(fn)} notional. How many futures to SHORT to hedge rising rate risk?`,
      formulaHint:'Contracts = (Portfolio Value × Portfolio Duration)\n           ÷ (Futures Duration × Futures Notional)',
      options,answer,working:`= (${fmt(pv)} × ${pd}) ÷ (${fd} × ${fmt(fn)})\n= ${fmt(pv*pd)} ÷ ${fmt(fd*fn)}\n= ${c} contracts SHORT`};
  }},
  {id:'BHG1',topic:'Beta Hedge — Equity Portfolio',generate(){
    const pv=rndArr([10,15,20,25,30,50])*1e6,beta=rndArr([0.8,0.9,1.0,1.1,1.2,1.3,1.5]);
    const idx=rndArr([1500,2000,2500,3000,4000]),mult=rndArr([200,250,500]);
    const c=Math.round((pv*beta)/(idx*mult)),w1=Math.round(pv/(idx*mult)),w2=Math.round((pv*beta)/idx),w3=c+rnd(5,20,5);
    const fI=x=>x.toLocaleString();
    const {options,answer}=makeOptions(c,[w1,w2,w3],fI);
    return{q:`Equity portfolio: ${fmt(pv)}, beta ${beta}. Index futures at ${fmtN(idx)}, multiplier ${fmt(mult)}. How many contracts to SELL for a full hedge?`,
      formulaHint:'Contracts = (Portfolio Value × Beta) ÷ (Index Level × Multiplier)',
      options,answer,working:`= (${fmt(pv)} × ${beta}) ÷ (${fmtN(idx)} × ${fmt(mult)})\n= ${fmt(pv*beta)} ÷ ${fmt(idx*mult)}\n= ${c} contracts SHORT`};
  }},
  {id:'IRS1',topic:'Interest Rate Swap — Net Payment',generate(){
    const notl=rndArr([5,10,15,20,25])*1e6,fr=rnd(25,65)/10,fl=fr-rnd(3,15)/10;
    const per=rndArr([0.25,0.5,1]),perL=per===0.25?'quarterly':per===0.5?'semi-annual':'annual';
    const fp=Math.round(notl*(fr/100)*per),flo=Math.round(notl*(fl/100)*per),net=fp-flo;
    const {options,answer}=makeOptions(net,[net*2,Math.round(notl*(fr/100)),flo]);
    return{q:`Interest rate swap: pays fixed ${fr}%, receives floating ${fl}%, ${fmt(notl)} notional. Net ${perL} payment to counterparty?`,
      formulaHint:`Fixed = Notional × Rate × Period\nFloat = Notional × Rate × Period\nNet payment = Fixed − Float`,
      options,answer,working:`Fixed = ${fmt(notl)} × ${fr}% × ${per} = ${fmt(fp)}\nFloat = ${fmt(notl)} × ${fl}% × ${per} = ${fmt(flo)}\nNet = ${fmt(fp)} − ${fmt(flo)} = ${fmt(net)}`};
  }},
  {id:'ESW1',topic:'Equity Swap — Net Cash Flow',generate(){
    const notl=rndArr([500000,1000000,2000000,5000000]),er=rnd(3,15),fr=rnd(2,8);
    const ep=Math.round(notl*er/100),fp=Math.round(notl*fr/100),net=ep-fp,isR=net>0;
    const fS=x=>(x>=0?'Receipt of ':'Payment of ')+fmt(Math.abs(x));
    const {options,answer}=makeOptions(net,[ep,-net,fp],fS);
    return{q:`Equity swap on ${fmt(notl)} notional: receives equity index return (${er}%), pays fixed ${fr}%. Net cash flow at year-end?`,
      formulaHint:'Equity receipt = Notional × Equity %\nFixed payment = Notional × Fixed %\nNet = Equity receipt − Fixed payment',
      options,answer,working:`Equity = ${fmt(notl)} × ${er}% = ${fmt(ep)}\nFixed  = ${fmt(notl)} × ${fr}% = ${fmt(fp)}\nNet = ${fmt(ep)} − ${fmt(fp)} = ${fmt(net)} (${isR?'receipt':'payment'})`};
  }},
  {id:'IRP1',topic:'Interest Rate Parity — Forward Rate',generate(){
    const spot=rnd(110,170)/100,rD=rnd(1,6);let rF=rnd(1,8);while(rF===rD)rF=rnd(1,8);
    const fwd=Math.round(spot*(1+rD/100)/(1+rF/100)*10000)/10000;
    const w1=Math.round(spot*(1+rF/100)/(1+rD/100)*10000)/10000,w2=spot,w3=Math.round((spot+(rD-rF)/100)*10000)/10000;
    const fX=x=>x.toFixed(4)+' CAD/USD';
    const {options,answer}=makeOptions(fwd,[w1,w2,w3],fX);
    return{q:`Spot: ${spot.toFixed(4)} CAD/USD. Canada rate: ${rD}%, US rate: ${rF}%. Per interest rate parity, what is the 1-year forward rate?`,
      formulaHint:'Forward = Spot × (1 + r_domestic) / (1 + r_foreign)\nLower domestic rate → domestic currency appreciates forward',
      options,answer,working:`= ${spot.toFixed(4)} × ${(1+rD/100).toFixed(4)} / ${(1+rF/100).toFixed(4)}\n= ${fwd.toFixed(4)} CAD/USD\n(${rD<rF?'CAD appreciates':'CAD depreciates'} in forward market)`};
  }},
  {id:'FFV1',topic:'Futures Fair Value — Arbitrage Direction',generate(){
    const spot=rnd(1000,5000,50),rate=rnd(2,8),months=rndArr([3,6,9,12]),storage=rndArr([0,0.5,1]);
    const fv=Math.round(spot*(1+(rate+storage)/100*months/12)),excess=rnd(30,150,10),actual=fv+excess;
    return{q:`A ${months}-month futures contract trades at ${fmt(actual)}. Spot = ${fmt(spot)}, risk-free rate ${rate}%${storage?`, storage ${storage}%`:''}. Fair value = ${fmt(fv)}. The contract is OVERPRICED by ${fmt(excess)}. What is the correct arbitrage?`,
      formulaHint:`Fair Value = Spot × (1 + (Rate${storage?'+Storage':''})/100 × Months/12) = ${fmt(fv)}\nActual (${fmt(actual)}) > Fair Value → Overpriced → Cash-and-Carry`,
      options:{A:'Buy spot + Sell futures (cash-and-carry)',B:'Sell spot + Buy futures (reverse cash-and-carry)',C:'Buy futures only and hold to expiry',D:'Take no action — mispricing will self-correct'},
      answer:'A',
      working:`Fair value = ${fmt(spot)} × (1 + ${(rate+storage)/100} × ${months/12}) = ${fmt(fv)}\nFutures (${fmt(actual)}) > fair value → overpriced\n→ Buy spot + Sell futures. Lock in ${fmt(excess)} risk-free profit.`};
  }},
  {id:'MGN1',topic:'Margin Call Amount',generate(){
    const init=rndArr([3000,4000,4400,5000,6000,8000]),maint=Math.round(init*rndArr([0.70,0.75,0.80]));
    const drop=rnd(200,1000,50),cur=maint-drop,call=init-cur;
    const {options,answer}=makeOptions(call,[maint-cur,drop,init]);
    return{q:`Futures account: initial margin ${fmt(init)}, maintenance margin ${fmt(maint)}. Equity falls to ${fmt(cur)}. What is the margin call amount?`,
      formulaHint:'Margin call = Initial Margin − Current Equity\n(Must restore to INITIAL, not just maintenance)',
      options,answer,working:`Current ${fmt(cur)} < maintenance ${fmt(maint)} → call triggered\nCall = ${fmt(init)} − ${fmt(cur)} = ${fmt(call)}\nMust restore to INITIAL margin.`};
  }},
  {id:'CFD1',topic:'CFD Margin Call',generate(){
    const cv=rndArr([10000,15000,20000,25000,30000,50000]),pct=rndArr([5,10,15,20]);
    const req=cv*pct/100,sf=rnd(100,1000,50),cur=req-sf;
    const {options,answer}=makeOptions(sf,[req,sf*2,Math.round(req*0.5)]);
    return{q:`Client opens a ${fmt(cv)} CFD with ${pct}% margin. Account equity drops to ${fmt(cur)}. What is the margin call amount?`,
      formulaHint:`Required margin = ${fmt(cv)} × ${pct}% = ${fmt(req)}\nMargin call = Required − Current`,
      options,answer,working:`Required = ${fmt(cv)} × ${pct}% = ${fmt(req)}\nCurrent = ${fmt(cur)}\nCall = ${fmt(req)} − ${fmt(cur)} = ${fmt(sf)}`};
  }},
  {id:'PCP1',topic:'Put-Call Parity — Find Put Price',generate(){
    const spot=rnd(50,120,5),strike=spot+rndArr([-10,-5,0,5,10]),rate=rnd(1,6),months=rndArr([3,6,12]);
    const pvk=Math.round(strike/(1+rate/100*months/12)*100)/100,call=Math.round((spot-pvk+rnd(1,5))*100)/100;
    const put=Math.round((call-spot+pvk)*100)/100;
    const fD=x=>'$'+Math.abs(x).toFixed(2);
    const {options,answer}=makeOptions(put,[Math.round((call+spot-pvk)*100)/100,Math.round(put+1),Math.round((spot-strike)*100)/100],fD);
    return{q:`Stock: ${fmt(spot)}. ${months}-month European call, strike ${fmt(strike)}, costs ${fD(call)}. Risk-free rate ${rate}% (simple). Put-call parity fair value of matching put?`,
      formulaHint:'P = C − S + PV(K)\nPV(K) = Strike ÷ (1 + rate × time)',
      options,answer,working:`PV(K) = ${fmt(strike)} ÷ (1 + ${rate/100} × ${months/12}) = $${pvk.toFixed(2)}\nP = ${fD(call)} − ${fmt(spot)} + $${pvk.toFixed(2)} = ${fD(put)}`};
  }},
  {id:'BCS1',topic:'Bull Call Spread — Max Profit',generate(){
    const ls=rnd(40,100,5),hs=ls+rndArr([5,10,15,20]),lp=rnd(4,12,1),hp=rnd(1,lp-1,1);
    const net=lp-hp,mp=hs-ls-net,be=ls+net;
    const {options,answer}=makeOptions(mp,[hs-ls,lp,mp+net]);
    return{q:`Bull call spread: buy ${fmt(ls)} call for ${fmt(lp)}, sell ${fmt(hs)} call for ${fmt(hp)}. Maximum profit per share?`,
      formulaHint:'Net cost = Premium paid − Premium received\nMax profit = (High Strike − Low Strike) − Net cost\nBreakeven = Low Strike + Net cost',
      options,answer,working:`Net cost = ${fmt(lp)} − ${fmt(hp)} = ${fmt(net)} (max loss)\nMax profit = (${fmt(hs)} − ${fmt(ls)}) − ${fmt(net)} = ${fmt(hs-ls)} − ${fmt(net)} = ${fmt(mp)}\nBreakeven = ${fmt(ls)} + ${fmt(net)} = ${fmt(be)}`};
  }},
  {id:'STR1',topic:'Long Straddle — Upper Breakeven',generate(){
    const strike=rnd(40,120,5),cp=rnd(3,10,1),pp=rnd(2,8,1),tp=cp+pp,ube=strike+tp,lbe=strike-tp;
    const {options,answer}=makeOptions(ube,[strike+cp,strike+pp,ube+2]);
    return{q:`Long straddle: buy ${fmt(strike)} call for ${fmt(cp)}, buy ${fmt(strike)} put for ${fmt(pp)}. Upper breakeven price?`,
      formulaHint:'Total premium = Call + Put\nUpper BE = Strike + Total premium\nLower BE = Strike − Total premium',
      options,answer,working:`Total = ${fmt(cp)} + ${fmt(pp)} = ${fmt(tp)}\nUpper BE = ${fmt(strike)} + ${fmt(tp)} = ${fmt(ube)}\nLower BE = ${fmt(strike)} − ${fmt(tp)} = ${fmt(lbe)}`};
  }},
  {id:'FIX1',topic:'Index Futures P&L',generate(){
    const ef=rnd(1500,4500,10),pts=rnd(5,50,5),isL=Math.random()>0.5;
    const xf=ef+(isL?pts:-pts),pv=rndArr([100,200,500]),profit=Math.abs(xf-ef)*pv;
    const {options,answer}=makeOptions(profit,[profit*2,pts*100,profit/2]);
    return{q:`Trader ${isL?'buys (long)':'sells (short)'} an index future at ${fmtN(ef)} points. Point value: ${fmt(pv)}. Contract closes at ${fmtN(xf)}. Profit or loss?`,
      formulaHint:'P&L = (Exit Futures Price − Entry Futures Price) × Point Value\nUse the futures entry price — not the spot index level',
      options,answer,working:`= (${fmtN(xf)} − ${fmtN(ef)}) × ${fmt(pv)}\n= ${xf-ef} × ${fmt(pv)} = ${fmt(profit)}`};
  }},
  {id:'LRN1',topic:'Leveraged Return on Futures',generate(){
    const notl=rndArr([250000,500000,750000,1000000]),mPct=rndArr([0.04,0.05,0.06,0.08,0.10]);
    const margin=Math.round(notl*mPct),move=rndArr([2,3,4,5,6,8]),gain=Math.round(notl*move/100);
    const ret=Math.round(gain/margin*100);
    const fP=x=>x+'%';
    const {options,answer}=makeOptions(ret,[move,ret/2,ret*2],fP);
    return{q:`S&P/TSX 60 futures: notional ${fmt(notl)}, margin deposit ${fmt(margin)}. Index rises ${move}%. Return on margin capital?`,
      formulaHint:'Gain = Notional × Market Move %\nReturn = Gain ÷ Margin × 100%',
      options,answer,working:`Gain = ${fmt(notl)} × ${move}% = ${fmt(gain)}\nReturn = ${fmt(gain)} ÷ ${fmt(margin)} × 100% = ${ret}%\n(${move}% market move → ${ret}% return on margin)`};
  }},
  {id:'NPM1',topic:'Naked Put Margin Calculation',generate(){
    const spot=rnd(40,120,5),strike=spot-rndArr([2,4,6,8]),prem=rndArr([1,1.25,1.5,2,2.5]),shares=100;
    const otm=(spot-strike)*shares,p20=Math.round(0.20*spot*shares),pr=Math.round(prem*shares),mg=p20-otm+pr;
    const {options,answer}=makeOptions(mg,[p20+pr,p20-otm,p20]);
    return{q:`Naked put: ${shares} shares, strike ${fmt(strike)}, premium ${fmt(prem)}, stock at ${fmt(spot)}.\nMargin = 20% of underlying − OTM amount + premium received. Initial margin?`,
      formulaHint:'Margin = (20% × Spot × Shares) − ((Spot−Strike) × Shares) + (Premium × Shares)',
      options,answer,working:`20% × ${fmt(spot)} × ${shares} = ${fmt(p20)}\nOTM = (${fmt(spot)}−${fmt(strike)}) × ${shares} = ${fmt(otm)}\nPremium = ${fmt(prem)} × ${shares} = ${fmt(pr)}\nMargin = ${fmt(p20)} − ${fmt(otm)} + ${fmt(pr)} = ${fmt(mg)}`};
  }},
  {id:'CON1',topic:'Concentration Margin — Additional Required',generate(){
    const c1=rnd(20,80,5),m1=rndArr([3000,4000,5000,6000,8000]),c2=rnd(10,50,5),m2=rndArr([2000,3000,3500,4000,5000]);
    const pct=rndArr([105,110,115,120]),base=c1*m1+c2*m2,reqd=Math.round(base*pct/100),addl=reqd-base;
    const {options,answer}=makeOptions(addl,[Math.round(addl*1.5),addl*2,Math.round(base*0.1)]);
    return{q:`Client holds: Long ${c1} contracts (margin ${fmt(m1)} each) + Short ${c2} contracts (margin ${fmt(m2)} each). Firm requires ${pct}% margin for concentration. Additional margin to post?`,
      formulaHint:'Base = (C1 × M1) + (C2 × M2)\nRequired = Base × Concentration%\nAdditional = Required − Base',
      options,answer,working:`Base = (${c1}×${fmt(m1)})+(${c2}×${fmt(m2)}) = ${fmt(c1*m1)}+${fmt(c2*m2)} = ${fmt(base)}\nRequired = ${fmt(base)} × ${pct}% = ${fmt(reqd)}\nAdditional = ${fmt(reqd)}−${fmt(base)} = ${fmt(addl)}`};
  }},
  {id:'FWD1',topic:'Forward Contract — Profit at Expiry',generate(){
    const fp=rnd(400,2000,25),se=fp-rnd(5,30,5),ex=fp+rnd(10,80,5);
    const tv=rndArr([10,25,50,100]),ts=rndArr([0.01,0.05,0.10,0.25]),vpm=tv/ts;
    const profit=Math.round((ex-fp)*vpm),w1=Math.round((ex-se)*vpm),w2=profit/2,w3=Math.round((ex-fp)*tv);
    const {options,answer}=makeOptions(profit,[w1,w2,w3]);
    return{q:`Investor enters a LONG forward at ${fmt(fp)} (spot was ${fmt(se)}). At expiry: market = ${fmt(ex)}. Contract: ${fmt(tv)} per ${fmt(ts)} move. Total profit?`,
      formulaHint:`P&L = (Expiry − Forward Entry) × (Tick Value ÷ Tick Size)\nValue per $1 = ${fmt(tv)} ÷ ${ts} = ${fmt(vpm)}`,
      options,answer,working:`Gain = ${fmt(ex)} − ${fmt(fp)} = ${fmt(ex-fp)}\nValue per $1 = ${fmt(tv)} ÷ ${ts} = ${fmt(vpm)}\nProfit = ${fmt(ex-fp)} × ${fmt(vpm)} = ${fmt(profit)}`};
  }},
  {id:'CSW1',topic:'Commodity Swap — Net Settlement',generate(){
    const fp=rnd(60,150,5),units=rndArr([1000,5000,10000,20000]),mp=fp-rnd(3,25,1);
    const net=(fp-mp)*units,w1=mp*units,w2=fp*units,w3=net/2;
    const {options,answer}=makeOptions(net,[w1,w2,w3]);
    return{q:`Dealer pays fixed ${fmt(fp)}/unit for ${fmtN(units)} units, receives floating market price. Market falls to ${fmt(mp)} in settlement month. Net payment dealer owes?`,
      formulaHint:'Dealer pays fixed, receives floating.\nIf market < fixed → dealer net pays difference.\nNet = (Fixed − Market) × Units',
      options,answer,working:`Fixed pays = ${fmt(fp)} × ${fmtN(units)} = ${fmt(fp*units)}\nFloat receives = ${fmt(mp)} × ${fmtN(units)} = ${fmt(mp*units)}\nNet owed = ${fmt(fp*units)} − ${fmt(mp*units)} = ${fmt(net)}`};
  }},
  {id:'WHT1',topic:'Commodity Futures — Contracts to Hedge',generate(){
    const tu=rndArr([5,8,10,12,15,20])*1000000,cu=rndArr([50000,100000,200000]),c=tu/cu,v=rnd(3,8);
    const w1=c-rnd(1,4),w2=c+rnd(1,4),w3=Math.round(c*1.1);
    const fI=x=>x.toLocaleString();
    const {options,answer}=makeOptions(c,[w1,w2,w3],fI);
    return{q:`Company needs to buy ${fmtN(tu)} units in 3 months. Each futures contract covers ${fmtN(cu)} units. Consumption may vary ±${v}%. How many contracts to BUY to hedge the EXPECTED volume?`,
      formulaHint:'Contracts = Expected Volume ÷ Contract Size\n(Hedge the base case — do not over/under-hedge)',
      options,answer,working:`Contracts = ${fmtN(tu)} ÷ ${fmtN(cu)} = ${fI(c)} contracts LONG\n(Hedge expected volume — not the ±${v}% range)`};
  }},
  {id:'RTC1',topic:'Round-Trip Commission Costs',generate(){
    const cr=rndArr([8,10,12,15,20,25]),trades=rnd(20,150,5),tot=cr*trades;
    const {options,answer}=makeOptions(tot,[tot*2,Math.round(tot*1.5),cr*(trades+10)]);
    return{q:`Futures trader pays ${fmt(cr)} per round-trip trade (entry + exit combined). Executes ${trades} round-trips in one month. Total explicit transaction costs?`,
      formulaHint:'Total = Commission per Round-Trip × Number of Round-Trips\n(Round-trip already includes both legs)',
      options,answer,working:`Total = ${fmt(cr)} × ${trades} = ${fmt(tot)}`};
  }},
];
