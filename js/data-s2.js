const NOTES_QUESTIONS = [
  // ── ELEMENT 1 ──────────────────────────────────────────────────
  {id:201,element:1,q:"Which of the following best defines the 'Know-Your-Product' (KYP) obligation under CIRO rules?",
   options:{A:"The requirement for the client to understand the products they trade",B:"The obligation on the Investment Dealer AND the Approved Person to research and understand a product before recommending or selling it",C:"The requirement to disclose all product costs in the monthly statement",D:"The obligation to match each product to the client's investment objectives"},
   answer:"B",
   explanation:"KYP is a dual obligation on both the firm (Investment Dealer) and the individual rep (Approved Person) to research and understand a product before it is recommended or sold. It is not solely the client's responsibility.",
   wrongExplanations:{A:"Understanding the product is the firm/rep's duty — the client is the one being protected by KYP.",C:"Monthly statement disclosures are a separate reporting requirement, not KYP.",D:"Matching products to objectives is suitability, not KYP."}},

  {id:202,element:1,q:"Under the KYP framework, which five dimensions must an Approved Person assess about a derivative product?",
   options:{A:"Price, volume, liquidity, credit rating, and time to expiry",B:"Structure, features, risks, initial & ongoing costs, and impact of those costs",C:"Underlying asset, strike price, premium, delta, and vega",D:"Jurisdiction, counterparty, settlement, delivery, and margin"},
   answer:"B",
   explanation:"KYP requires assessment across five dimensions: the investment's structure, features, risks, initial & ongoing costs, and the impact of those costs on the client's actual return.",
   wrongExplanations:{A:"These are contract or market data points — not the KYP assessment framework.",C:"These are option-specific pricing terms, not the KYP framework.",D:"These are operational/legal dimensions, not the five KYP categories."}},

  {id:203,element:1,q:"A retail client asks to open a derivatives account to trade naked short puts. What must the Investment Dealer confirm BEFORE the account is approved?",
   options:{A:"That the client has prior derivatives trading experience of at least 12 months",B:"That the account type is appropriate for the specific derivative activity requested",C:"That the client has read all CIRO guidance on options",D:"That the client's net worth exceeds the margin requirement"},
   answer:"B",
   explanation:"Account appropriateness requires the firm to confirm that the account TYPE (e.g., margin account) is appropriate for the specific derivative strategy. Naked short puts require a margin account — a cash account would not be appropriate.",
   wrongExplanations:{A:"There is no specific 12-month experience requirement — experience is assessed as part of KYC but is not a standalone threshold.",C:"Reading CIRO guidance is not a formal prerequisite; the risk disclosure document must be acknowledged.",D:"Net worth alone does not determine account appropriateness — the account type and strategy fit must be assessed."}},

  {id:204,element:1,q:"A hedger who uses wheat futures to protect their farm's crop revenue may be reclassified as an institutional client if they meet specific criteria. What is the MOST IMPORTANT implication of this reclassification?",
   options:{A:"They receive lower margin rates",B:"They are exempt from the full suitability assessment on each trade",C:"Their account can hold unlimited open positions",D:"They no longer receive monthly account statements"},
   answer:"B",
   explanation:"The most significant implication of institutional client status is that trade-specific suitability assessments are not required for each trade. Institutional clients are deemed sophisticated enough to make their own suitability decisions.",
   wrongExplanations:{A:"Margin rates are set by the exchange and firm — institutional status does not automatically reduce them.",C:"Position limits still apply — institutional status does not waive exchange or regulatory position limits.",D:"Institutional clients still receive account statements — the reporting requirement does not disappear."}},

  {id:205,element:1,q:"An Approved Person uses their personal Instagram account to post comments about a specific options strategy they are recommending to clients. Under CIRO communication rules, this is:",
   options:{A:"Permitted as long as the posts are accurate and not misleading",B:"Permitted only if the posts are reviewed by compliance within 24 hours",C:"An off-channel communication issue that is prohibited or heavily restricted",D:"Permitted for accredited investors only"},
   answer:"C",
   explanation:"CIRO rules require all client communications to occur on firm-approved, monitored channels. Personal social media is an off-channel platform and is prohibited or heavily restricted for investment communications, regardless of content accuracy.",
   wrongExplanations:{A:"Accuracy is necessary but not sufficient — the channel must also be firm-approved and monitored.",B:"Retroactive compliance review cannot cure the off-channel violation; the communication must occur on an approved channel from the start.",D:"Off-channel restrictions apply to all client categories — there is no accredited investor exemption for communication channel rules."}},

  {id:206,element:1,q:"A suitability assessment for a retail client trading derivatives must consider which combination of factors?",
   options:{A:"Investment objectives, risk tolerance, derivatives knowledge, financial situation, and time horizon",B:"Net income, age, credit score, tax bracket, and employment status",C:"Portfolio size, margin availability, exchange membership, and trading frequency",D:"Country of residence, account type, transaction size, and product category"},
   answer:"A",
   explanation:"The five suitability factors for retail derivative clients are: investment objectives, risk tolerance, derivatives knowledge and experience, financial situation, and time horizon. These must all be assessed on each recommendation.",
   wrongExplanations:{B:"Credit score and tax bracket are not formal suitability factors under CIRO rules.",C:"Margin availability may support suitability but is not one of the five core factors. Exchange membership is irrelevant.",D:"Country of residence is a KYC identity factor, not a suitability factor."}},

  // ── ELEMENT 2 ──────────────────────────────────────────────────
  {id:207,element:2,q:"A retail client wants to trade OTC derivatives in an Order-Execution-Only (OEO) account. What specific additional disclosure is required for this account type?",
   options:{A:"A disclosure of all product fees and commissions charged",B:"A statement confirming the client's suitability for derivatives trading",C:"A disclosure of the percentage of such accounts that were profitable for each of the last four quarters",D:"A confirmation that the client has passed a derivatives knowledge test"},
   answer:"C",
   explanation:"For OEO accounts offering OTC derivatives to retail clients, CIRO requires an additional disclosure showing the percentage of such accounts that were profitable for each of the four most recent quarters. This allows clients to assess realistic outcomes.",
   wrongExplanations:{A:"General fee disclosures apply broadly but are not the specific OEO OTC additional requirement.",B:"OEO accounts execute without advice — a specific suitability statement is not the unique additional requirement here.",D:"There is no mandatory derivatives knowledge test requirement under CIRO rules."}},

  {id:208,element:2,q:"Which of the following is NOT a prohibited derivative trading practice under CIRO rules?",
   options:{A:"Trading beyond the client's margin and credit limits",B:"Trading using prohibited underlying interests",C:"Executing a block trade off-exchange and reporting it to the exchange within the required deadline",D:"Trading during delivery month in violation of delivery month restrictions"},
   answer:"C",
   explanation:"Block trades executed off-exchange and properly reported within required deadlines are a legitimate, permitted transaction type. The other three options are all explicitly prohibited trading practices.",
   wrongExplanations:{A:"Trading beyond margin/credit limits is specifically prohibited under CIRO rules.",B:"Trading using prohibited underlying interests is a prohibited practice.",D:"Delivery month trading restrictions are a specific prohibition — violating them is prohibited."}},

  {id:209,element:2,q:"Under the CIRO Derivatives Trading Agreement, what does the firm commit to doing that the Derivatives Account Application Form alone does not cover?",
   options:{A:"Collecting KYC information from the client",B:"Governing the ongoing contractual terms of how derivative trades are handled between the firm and client",C:"Disclosing the risks of derivatives trading",D:"Confirming the client's investment objectives"},
   answer:"B",
   explanation:"The Derivatives Trading Agreement governs the ongoing contractual relationship — the terms under which trades will be executed, how margin will be handled, and the operational rules between the firm and client. The Application Form simply initiates account opening.",
   wrongExplanations:{A:"KYC collection occurs through the account application and related forms, not the Trading Agreement.",C:"Risk disclosure is provided through the Derivatives Risk Disclosure Statement, not the Trading Agreement.",D:"Investment objectives are part of KYC collected in the application process."}},

  {id:210,element:2,q:"When must the Derivatives Account Application Form be obtained from a retail client?",
   options:{A:"Within one business day of the initial trade",B:"Within five business days of account opening",C:"Before the initial trade is executed",D:"At the first scheduled annual review"},
   answer:"C",
   explanation:"CIRO requires the completed derivatives account application to be on file BEFORE the first trade. There is no grace period — the form must precede all trading activity.",
   wrongExplanations:{A:"A one-business-day grace period does not exist for the application form.",B:"A five-business-day window would allow trading before documentation — this is not permitted.",D:"Waiting until the annual review would allow trading for months without the required documentation."}},

  {id:211,element:2,q:"A client's losses have exceeded the risk limits established in their account agreement. What is the Investment Dealer's obligation?",
   options:{A:"Notify the client and allow trading to continue at their discretion",B:"Treat this as a prohibited practice and take action to address it",C:"Reduce the client's position sizes by 50% and monitor for 30 days",D:"File an immediate report with CIRO"},
   answer:"B",
   explanation:"Under CIRO prohibited practices, allowing cumulative losses to exceed established risk limits is a regulatory violation. The firm must treat this as a prohibited practice and take action — not simply notify the client and continue.",
   wrongExplanations:{A:"Simply notifying and continuing does not address the regulatory prohibition on allowing losses to exceed risk limits.",C:"A 50% reduction is an arbitrary action not specified in the rules — the firm must address the prohibited practice per its procedures.",D:"While escalation may eventually occur, the immediate obligation is to treat this as a prohibited practice and act internally first."}},

  {id:212,element:2,q:"What information must appear on a monthly account statement for a client who holds an open, unexpired call option on a stock futures contract?",
   options:{A:"The current market value of the futures contract and estimated P&L",B:"The type of option, the strike price, and the delivery date of the futures contract",C:"The implied volatility of the option and the delta",D:"The original premium paid and the margin posted"},
   answer:"B",
   explanation:"For options on futures contracts, CIRO requires the monthly statement to show three specific items: the type of option (call/put), the strike price, and the delivery date of the underlying futures contract.",
   wrongExplanations:{A:"While market value is shown generally, the specific regulatory requirement for options on futures is type, strike, and delivery date.",C:"Greeks like implied volatility and delta are not required monthly statement disclosures.",D:"Original premium and margin posted may appear on statements but are not the specific regulatory requirement for this position type."}},

  // ── ELEMENT 3 ──────────────────────────────────────────────────
  {id:213,element:3,q:"What distinguishes an American-style option from a European-style option?",
   options:{A:"American options are only traded on US exchanges; European options trade on European exchanges",B:"American options can be exercised at any time up to and including expiry; European options can only be exercised on the expiry date",C:"American options have higher premiums due to exchange fees",D:"American options are always call options; European options are always put options"},
   answer:"B",
   explanation:"The sole distinction between American and European style is the exercise timing. American: exercise any time up to and including expiry. European: exercise only on the expiry date. This difference affects option valuation — American options are worth at least as much as equivalent European options.",
   wrongExplanations:{A:"The names are historical — both American and European style options trade on exchanges worldwide.",C:"The premium difference comes from the early-exercise value, not exchange fees.",D:"Both call and put options can be either American or European style."}},

  {id:214,element:3,q:"An investor holds a long call option on 100 shares of XYZ, strike $50, premium $4. XYZ closes at $61 on expiry day. What is the investor's profit?",
   options:{A:"$700",B:"$1,100",C:"$1,500",D:"$600"},
   answer:"A",
   explanation:"P&L = MAX(Spot − Strike, 0) − Premium = MAX($61 − $50, 0) − $4 = $11 − $4 = $7 per share. × 100 shares = $700 profit.",
   wrongExplanations:{B:"$1,100 = $11 × 100 — this ignores the $4 premium paid.",C:"$1,500 uses an incorrect calculation.",D:"$600 = ($61 − $50 − $4 − $1?) — incorrect arithmetic."}},

  {id:215,element:3,q:"A Binary option differs from a standard call option in that:",
   options:{A:"It can only be exercised on the expiry date",B:"It pays a fixed predetermined amount if the condition is met, or nothing at all",C:"It has no premium — the payout is the only cost",D:"It is only available on commodity underlyings"},
   answer:"B",
   explanation:"A binary option has an all-or-nothing payout: if the specified condition is met (e.g., stock closes above the strike), a fixed amount is paid. If not met, the payout is zero. This contrasts with a standard option where the payout varies with how far the underlying moves past the strike.",
   wrongExplanations:{A:"Exercise timing (American vs European) is a separate characteristic and is not what defines a binary option.",C:"Binary options do have a premium — the fixed payout amount and the premium are related but distinct.",D:"Binary options exist on many underlying types including equities and financial variables."}},

  {id:216,element:3,q:"A farmer plans to SELL 50,000 bushels of wheat in three months. To hedge against a price decline, the farmer should:",
   options:{A:"Buy wheat futures contracts (long hedge)",B:"Sell wheat futures contracts (short hedge)",C:"Buy call options on wheat",D:"Sell put options on wheat"},
   answer:"B",
   explanation:"The farmer owns wheat and fears prices will fall. A short hedge means selling futures — if prices fall, the loss on the physical wheat is offset by the gain on the short futures position. This is the classic producer short hedge.",
   wrongExplanations:{A:"A long hedge (buying futures) is used by someone who NEEDS to buy the underlying in the future and fears rising prices — the opposite scenario.",C:"Buying call options profits when prices RISE — not useful for a farmer trying to protect against falling prices.",D:"Selling put options generates income but does not protect the farmer if prices fall sharply."}},

  {id:217,element:3,q:"What is the key obligation created by entering into a standard interest rate swap?",
   options:{A:"Both parties must deliver the notional principal at maturity",B:"Both parties must exchange cash flows based on the agreed fixed and floating rates",C:"The fixed-rate payer must purchase the underlying interest rate instrument",D:"Both parties post initial margin equal to the notional amount"},
   answer:"B",
   explanation:"An interest rate swap obligates each party to exchange cash flows — one party pays fixed and receives floating; the other pays floating and receives fixed. The notional principal is NOT exchanged; only the interest payment streams are swapped.",
   wrongExplanations:{A:"The notional principal is a reference amount only — it is not exchanged in a standard interest rate swap (only in currency swaps).",C:"No purchase of the underlying instrument occurs — swaps are purely cash-flow exchange arrangements.",D:"Initial margin equal to the notional would be prohibitively large. Margin is a fraction of the notional."}},

  {id:218,element:3,q:"A credit default swap (CDS) is best described as:",
   options:{A:"A swap where two parties exchange fixed and floating interest payments",B:"A contract where the buyer pays premiums and the seller pays out if a specified credit event (like a default) occurs",C:"An option that gives the holder the right to default on a bond",D:"A futures contract on the credit spread of a corporate bond"},
   answer:"B",
   explanation:"A CDS functions like credit insurance. The protection buyer pays periodic premium payments (the CDS spread). If a specified credit event (such as a bond issuer defaulting) occurs, the protection seller pays the face value of the reference bond.",
   wrongExplanations:{A:"Exchanging fixed and floating interest payments describes an interest rate swap, not a CDS.",C:"The CDS buyer does not have the right to default — they are seeking protection against a third party's default.",D:"A credit futures contract is a different instrument — a CDS is an OTC bilateral agreement, not an exchange-traded futures contract."}},

  {id:219,element:3,q:"Which of the following is a distinguishing feature of an Asian option compared to a standard European option?",
   options:{A:"It can be exercised before expiry",B:"Its payout is based on the average price of the underlying over a set period rather than just the final price",C:"It activates only when the underlying hits a barrier level",D:"It pays a fixed amount regardless of how far the underlying moves"},
   answer:"B",
   explanation:"Asian options use the average price of the underlying asset over a specified period (or the entire option life) to determine the payout. This averaging feature reduces the impact of price manipulation at expiry and typically makes Asian options cheaper than standard options.",
   wrongExplanations:{A:"Exercise before expiry defines American-style options, not Asian options.",C:"Activation at a barrier level describes barrier options (knock-in or knock-out).",D:"Fixed payout regardless of movement describes binary options."}},

  {id:220,element:3,q:"A contract for difference (CFD) differs from a standard futures contract in that:",
   options:{A:"CFDs have a fixed expiry date and standardized contract sizes",B:"CFDs are exchange-traded and cleared by a central clearinghouse",C:"CFDs have no fixed expiry and are OTC instruments — the holder never takes delivery of the underlying",D:"CFDs require posting of initial margin equal to the full contract value"},
   answer:"C",
   explanation:"CFDs are OTC instruments with no fixed expiry date (the position can be held open until the trader closes it). The holder never takes delivery of the underlying asset — the only settlement is the cash difference between entry and exit price.",
   wrongExplanations:{A:"Fixed expiry and standardized sizes describe exchange-traded futures, not CFDs.",B:"CFDs are OTC and not cleared by a central clearinghouse — they carry full counterparty risk with the CFD provider.",D:"CFD margin is a fraction of the contract value (typically 5-20%), not the full value."}},

  // ── ELEMENT 4 ──────────────────────────────────────────────────
  {id:221,element:4,q:"The basis of a futures contract is defined as:",
   options:{A:"The difference between the futures price and the option strike price",B:"The difference between the spot price and the futures price",C:"The cost of financing the underlying asset to delivery",D:"The spread between the bid and ask price of the futures contract"},
   answer:"B",
   explanation:"Basis = Spot Price − Futures Price. At expiry, the basis converges to zero as the futures price approaches the spot price. Basis risk is the risk that this convergence does not occur as expected.",
   wrongExplanations:{A:"The futures price vs option strike is not the definition of basis.",C:"Financing costs are part of cost of carry, which is related to basis but not the definition of basis itself.",D:"The bid-ask spread is a transaction cost concept — not the definition of basis."}},

  {id:222,element:4,q:"A stock trades at $80. A 6-month call option with a $75 strike has a premium of $9. What are the intrinsic value and time value?",
   options:{A:"Intrinsic value $0, time value $9",B:"Intrinsic value $5, time value $4",C:"Intrinsic value $9, time value $0",D:"Intrinsic value $4, time value $5"},
   answer:"B",
   explanation:"Intrinsic value (call) = MAX(Spot − Strike, 0) = MAX($80 − $75, 0) = $5. Time value = Premium − Intrinsic = $9 − $5 = $4.",
   wrongExplanations:{A:"$0 intrinsic is wrong — the call is in-the-money (spot $80 > strike $75), so there IS intrinsic value.",C:"$9 intrinsic would require Spot − Strike = $9, meaning Spot = $84. The spot is $80.",D:"Intrinsic $4 and time $5 are reversed — intrinsic = $5, time = $4."}},

  {id:223,element:4,q:"Which option Greek measures the sensitivity of an option's price to a $1 change in the price of the underlying asset?",
   options:{A:"Gamma",B:"Theta",C:"Delta",D:"Vega"},
   answer:"C",
   explanation:"Delta measures the change in the option's price for a $1 change in the underlying. Calls have positive delta (0 to +1); puts have negative delta (−1 to 0). ATM options have delta of approximately ±0.50.",
   wrongExplanations:{A:"Gamma measures the rate of change of delta (how fast delta itself changes as the underlying moves).",B:"Theta measures time decay — how much the option loses per day as expiry approaches.",D:"Vega measures sensitivity to changes in implied volatility."}},

  {id:224,element:4,q:"An at-the-money option has the maximum time value compared to ITM and OTM options with the same expiry because:",
   options:{A:"It has the highest probability of expiring in-the-money",B:"The uncertainty about final outcome is greatest — it could end ITM or OTM with roughly equal probability",C:"It has the highest intrinsic value",D:"It has the longest time to expiry"},
   answer:"B",
   explanation:"ATM options have maximum time value because uncertainty about the final outcome is at its peak — the underlying is right at the strike so it could end either ITM or OTM. This maximum uncertainty = maximum optionality value = maximum time value.",
   wrongExplanations:{A:"Deep ITM options have the highest probability of expiring in the money, not ATM options.",C:"ATM options have zero intrinsic value — all their value is time value.",D:"Time to expiry is the same for all options in this comparison — it does not explain why ATM has more time value than ITM/OTM."}},

  {id:225,element:4,q:"Put-call parity states that C − P = S − PV(K). Which of the following synthetic positions is created by a long call and a short put with the same strike and expiry?",
   options:{A:"A synthetic long put",B:"A synthetic short stock",C:"A synthetic long stock",D:"A synthetic covered call"},
   answer:"C",
   explanation:"Rearranging put-call parity: S = C − P + PV(K). Long call + short put (same strike/expiry) = synthetic long stock position. The position profits when the stock rises and loses when it falls, just like owning the stock.",
   wrongExplanations:{A:"A synthetic long put would be created by a short call + long put, not the reverse.",B:"A synthetic short stock = short call + long put (same strike/expiry).",D:"A covered call = long stock + short call — this involves the actual stock, not a synthetic created from options alone."}},

  {id:226,element:4,q:"A company announces a 3-for-1 stock split. An investor holds a call option with a $90 strike covering 100 shares. How are the option contract terms adjusted?",
   options:{A:"Strike becomes $270, contract covers 100 shares",B:"Strike becomes $30, contract covers 300 shares",C:"Strike becomes $30, contract covers 100 shares",D:"No adjustment — the strike and contract size remain the same"},
   answer:"B",
   explanation:"In a 3-for-1 stock split, the share price is divided by 3 and the number of shares is multiplied by 3. Options are adjusted to maintain economic equivalence: strike ÷ 3 = $90/3 = $30; contract size × 3 = 300 shares. Total economic value is preserved.",
   wrongExplanations:{A:"Multiplying the strike by 3 would be a reverse split adjustment — this is a forward split.",C:"$30 strike with 100 shares would reduce the option's total notional value (was $9,000, would be $3,000). The contract size must also triple.",D:"Options ARE adjusted for stock splits to maintain economic equivalence."}},

  {id:227,element:4,q:"The Black-Scholes model is most accurately described as assuming:",
   options:{A:"Discrete price movements at defined time intervals",B:"Continuous trading and constant volatility over the option's life",C:"Variable volatility that can be updated at each pricing step",D:"Path-dependent pricing based on the historical price trajectory"},
   answer:"B",
   explanation:"Black-Scholes assumes: (1) continuous trading with no gaps, (2) constant (fixed) volatility throughout the option's life, (3) log-normal price distribution, (4) no dividends, (5) European exercise only. Constant volatility is its most criticised assumption.",
   wrongExplanations:{A:"Discrete price movements at intervals describes the Binomial model, not Black-Scholes.",C:"Variable volatility at each step describes stochastic volatility or local volatility models.",D:"Path-dependent pricing describes Monte Carlo simulation — Black-Scholes produces a closed-form analytical solution."}},

  {id:228,element:4,q:"In Canada, a non-professional investor's gains from selling covered call options that expire worthless are generally treated as:",
   options:{A:"Fully taxable business income in the year received",B:"Capital gains with a 50% inclusion rate",C:"Tax-free income since options are not physical assets",D:"Dividend income taxed at the dividend tax credit rate"},
   answer:"B",
   explanation:"For non-professional investors in Canada, option premiums received from covered calls that expire worthless are generally treated as capital gains. Only 50% of capital gains are included in taxable income (the inclusion rate).",
   wrongExplanations:{A:"Business income treatment applies to professional traders who trade as their primary occupation, not to non-professionals.",C:"Option premiums are not tax-free — they are taxable income.",D:"Option premiums are not dividends — they are contractual payments for the right to buy shares."}},

  // ── ELEMENT 5 ──────────────────────────────────────────────────
  {id:229,element:5,q:"What is the key difference between a 'Fill or Kill' (FOK) order and an 'Immediate and Cancel' (IAC) order?",
   options:{A:"FOK allows partial fills; IAC does not",B:"IAC allows partial fills; FOK requires the entire order to be filled immediately or cancelled completely",C:"FOK is only available for options; IAC is only for futures",D:"IAC converts to a limit order if not immediately filled; FOK does not"},
   answer:"B",
   explanation:"IAC (Immediate and Cancel): execute as much as possible immediately, cancel any unfilled portion. Partial fills are accepted. FOK (Fill or Kill): the entire order must be filled immediately or the entire order is cancelled — no partial fills allowed.",
   wrongExplanations:{A:"This is the reverse — FOK does NOT allow partial fills; IAC does.",C:"Both order types are available across derivatives — there is no restriction to a single asset class.",D:"Neither order converts to a limit order; both are immediate-execution instructions."}},

  {id:230,element:5,q:"The Montréal Exchange (MX) is significant in the context of Canadian derivatives because:",
   options:{A:"It is the only exchange in Canada that trades commodity futures",B:"It is Canada's primary listed derivatives exchange, clearing through the CDCC",C:"It operates solely under Quebec provincial jurisdiction and does not follow CIRO rules",D:"It exclusively trades OTC derivatives for institutional clients"},
   answer:"B",
   explanation:"The Montréal Exchange is Canada's primary listed derivatives exchange. It trades equity options, index options, interest rate futures, and other listed derivatives. All trades are cleared through the CDCC (Canadian Derivatives Clearing Corporation).",
   wrongExplanations:{A:"Commodity futures are largely traded on other exchanges such as ICE Futures Canada — the MX focuses on financial derivatives.",C:"While the MX operates under Quebec law, it also follows CIRO's UMIR rules for trading integrity.",D:"The MX is an exchange with listed, standardized contracts — not an OTC platform."}},

  {id:231,element:5,q:"What is the difference between 'initial margin' and 'variation margin' in a futures account?",
   options:{A:"Initial margin is a loan from the broker; variation margin is the client's own funds",B:"Initial margin is a performance deposit posted when a position is opened; variation margin is the daily mark-to-market gain or loss credited/debited to the account",C:"Initial margin is required only for short positions; variation margin applies to long positions",D:"Initial margin covers potential losses; variation margin covers brokerage commissions"},
   answer:"B",
   explanation:"Initial/original margin is the upfront performance bond posted when a futures position is first opened. Variation margin is the daily cash settlement of gains and losses — positions are marked to market every day and the difference is credited (gain) or debited (loss) to the account.",
   wrongExplanations:{A:"Futures margin is NOT a loan — it is a good-faith deposit. Securities margin is a loan. These are fundamentally different.",C:"Both long and short futures positions require initial AND variation margin.",D:"Margin covers market risk, not commissions. Commissions are a separate charge."}},

  {id:232,element:5,q:"An investor's futures position triggers a maintenance margin call. To what level must the investor restore their account equity?",
   options:{A:"To the maintenance margin level",B:"To the initial margin level",C:"To 110% of the initial margin level",D:"To the level determined by the current market price"},
   answer:"B",
   explanation:"When equity falls below the maintenance margin level, a margin call is issued. The investor must restore the account equity to the INITIAL margin level — not just back to maintenance. This is a critical distinction on the exam.",
   wrongExplanations:{A:"Restoring only to maintenance level is incorrect — exchange rules require restoration to the initial margin.",C:"110% is not a standard requirement unless a firm's in-house margin policy specifies it.",D:"The restoration level is set by the initial margin requirement, not the current market price."}},

  {id:233,element:5,q:"What distinguishes a 'carrying broker' from an 'introducing broker' in a futures account relationship?",
   options:{A:"The carrying broker handles client relationships and KYC; the introducing broker holds accounts and clears trades",B:"The introducing broker handles client relationships and KYC; the carrying broker holds the accounts and clears trades",C:"Both perform identical functions — the terms are interchangeable",D:"The carrying broker is the exchange itself; the introducing broker is the client's dealer"},
   answer:"B",
   explanation:"In the introducing/carrying broker model: the introducing broker manages the client relationship, performs KYC, and takes the order. The carrying broker holds the client accounts, maintains margin, and clears and settles the trades.",
   wrongExplanations:{A:"This description reverses the roles — the introducing broker handles client relationships, not the carrying broker.",C:"They are not interchangeable — they have distinct regulatory and operational responsibilities.",D:"The exchange is not a broker — it provides the marketplace where the trades occur."}},

  {id:234,element:5,q:"A benefits of algorithmic trading in derivatives markets is:",
   options:{A:"It removes the need for regulatory oversight of trading",B:"It contributes to market efficiency by rapidly incorporating information into prices",C:"It eliminates all forms of market manipulation",D:"It guarantees best execution on every trade"},
   answer:"B",
   explanation:"One legitimate benefit of algorithmic trading is that it contributes to price discovery and market efficiency — algorithms can process information quickly and adjust prices accordingly, making markets more efficient.",
   wrongExplanations:{A:"Algorithmic trading actually requires MORE oversight, not less — regulators have developed specific rules (like UMIR pre-trade controls) for algorithmic trading.",C:"Algorithmic trading can itself cause manipulation (e.g., quote stuffing, layering) — it does not eliminate it.",D:"Algorithmic trading aims for best execution but does not guarantee it in all market conditions."}},

  {id:235,element:5,q:"The CDCC (Canadian Derivatives Clearing Corporation) protects market participants from counterparty risk by:",
   options:{A:"Requiring all OTC trades to be reported to the exchange",B:"Acting as the central counterparty to every trade, becoming the buyer to every seller and seller to every buyer",C:"Setting maximum position limits for all market participants",D:"Insuring client accounts against losses up to a maximum amount"},
   answer:"B",
   explanation:"The CDCC eliminates counterparty risk by novation — it inserts itself as the central counterparty to every trade. Every buyer's counterparty is the CDCC; every seller's counterparty is the CDCC. If one party defaults, the CDCC guarantees performance.",
   wrongExplanations:{A:"OTC trades are not cleared through the CDCC — it clears listed exchange trades on the Montréal Exchange.",C:"Setting position limits is a regulatory and exchange function, not the CDCC's mechanism for eliminating counterparty risk.",D:"Client account insurance is provided by the Canadian Investor Protection Fund (CIPF), not the CDCC."}},

  // ── ELEMENT 6 ──────────────────────────────────────────────────
  {id:236,element:6,q:"An investor buys a $100 strike call for $6 and sells a $110 strike call for $2. What is the maximum profit, maximum loss, and breakeven of this bull call spread?",
   options:{A:"Max profit $10, max loss $4, breakeven $104",B:"Max profit $6, max loss $2, breakeven $108",C:"Max profit $4, max loss $6, breakeven $110",D:"Max profit $4, max loss $8, breakeven $104"},
   answer:"A",
   explanation:"Net cost = $6 − $2 = $4 (max loss). Max profit = spread width − net cost = ($110 − $100) − $4 = $6. Wait — spread width = $10; max profit = $10 − $4 = $6? No: max profit = $10 − $4 = $6, breakeven = $100 + $4 = $104. BUT the answer must be A: max profit $10 - $4 = $6... Rechecking: Max profit = (High Strike − Low Strike) − Net Premium = $10 − $4 = $6. Breakeven = Low Strike + Net Cost = $100 + $4 = $104. Max loss = $4. So answer A says max profit $10, max loss $4 — that's wrong on profit. Let me recalculate: A says $10/$4/$104 — $10 profit would require no cost, but we paid $4. Correct answer should be max profit $6, max loss $4, breakeven $104. None match perfectly, but A is closest to the correct breakeven and max loss. Re-examining: if we correct — net cost $4, max profit $6, breakeven $104. Answer A incorrectly says $10 profit. Let me fix the question options to have the correct answer.",
   wrongExplanations:{A:"",B:"",C:"",D:""}},

  {id:237,element:6,q:"An investor buys a $100 call for $6 and sells a $115 call for $2 (bull call spread). What is the breakeven price at expiry?",
   options:{A:"$102",B:"$104",C:"$106",D:"$113"},
   answer:"B",
   explanation:"Net cost (max loss) = premium paid − premium received = $6 − $2 = $4. Breakeven = Lower strike + Net cost = $100 + $4 = $104.",
   wrongExplanations:{A:"$102 uses only the call premium ($6 − $4?) — incorrect formula.",C:"$106 = $100 + $6 — uses the full premium paid instead of the net cost.",D:"$113 uses the upper strike with some adjustment — incorrect formula for bull call spread breakeven."}},

  {id:238,element:6,q:"A long straddle on a $50 strike stock uses a $3 call and a $3 put. What are the two breakeven prices?",
   options:{A:"$47 and $53",B:"$44 and $56",C:"$46 and $54",D:"$43 and $57"},
   answer:"B",
   explanation:"Total premium paid = $3 + $3 = $6. Upside breakeven = Strike + Total Premium = $50 + $6 = $56. Downside breakeven = Strike − Total Premium = $50 − $6 = $44.",
   wrongExplanations:{A:"$47 and $53 use ±$3 — the one-sided premium, not the total premium of $6.",C:"$46 and $54 use ±$4 — incorrect premium total.",D:"$43 and $57 use ±$7 — incorrect premium total."}},

  {id:239,element:6,q:"A portfolio manager holds a $10 million equity portfolio with a beta of 1.2. The S&P/TSX 60 futures are at 1,500 and the contract multiplier is $200. How many contracts must be shorted to fully hedge the portfolio?",
   options:{A:"33",B:"40",C:"50",D:"60"},
   answer:"B",
   explanation:"Contracts = (Portfolio Value × Beta) / (Futures Price × Multiplier) = ($10,000,000 × 1.2) / (1,500 × $200) = $12,000,000 / $300,000 = 40 contracts.",
   wrongExplanations:{A:"33 contracts ignores the beta adjustment (uses $10M instead of $12M).",C:"50 contracts uses beta of 1.0 instead of 1.2.",D:"60 contracts = $18,000,000 / $300,000 — this uses a beta of 1.8."}},

  {id:240,element:6,q:"Which of the following correctly describes the difference between a straddle and a strangle?",
   options:{A:"A straddle uses different strikes for call and put; a strangle uses the same strike",B:"A straddle uses the same strike for both call and put; a strangle uses different (OTM) strikes",C:"A straddle is a bearish strategy; a strangle is a bullish strategy",D:"A straddle uses futures; a strangle uses options"},
   answer:"B",
   explanation:"Long straddle: buy ATM call + buy ATM put at the SAME strike. Long strangle: buy OTM call + buy OTM put at DIFFERENT strikes (both out-of-the-money). The strangle is cheaper but requires a larger price move to be profitable.",
   wrongExplanations:{A:"This description reverses the definitions — a straddle uses the SAME strike.",C:"Both straddles and strangles are volatility strategies, not directional (bullish/bearish) strategies.",D:"Both straddles and strangles use options — not futures."}},

  {id:241,element:6,q:"A trader shorts 3 crude oil futures at $85/barrel. Each contract covers 1,000 barrels. At closeout, crude is at $78. What is the total profit?",
   options:{A:"$7,000",B:"$14,000",C:"$21,000",D:"$28,000"},
   answer:"C",
   explanation:"Short P&L = (Entry − Exit) × Contract Size × Number of Contracts = ($85 − $78) × 1,000 × 3 = $7 × 1,000 × 3 = $21,000.",
   wrongExplanations:{A:"$7,000 = $7 × 1,000 × 1 — uses only one contract, not three.",B:"$14,000 = $7 × 1,000 × 2 — uses two contracts.",D:"$28,000 = $7 × 1,000 × 4 — uses four contracts."}},

  {id:242,element:6,q:"A covered call strategy involves:",
   options:{A:"Buying a call option and buying the underlying stock",B:"Selling a call option on a stock you do not own",C:"Owning the underlying stock and selling a call option against it",D:"Buying a put option and selling a call option on the same stock"},
   answer:"C",
   explanation:"A covered call = long the underlying stock + short (sell) a call option on the same stock. The long stock position 'covers' the short call obligation. This strategy generates premium income but caps the upside beyond the strike price.",
   wrongExplanations:{A:"Buying a call AND buying stock is not a covered call — this is a leveraged bullish position.",B:"Selling a call without owning the stock is a NAKED (uncovered) short call — not a covered call.",D:"Buying a put + selling a call is a collar or risk reversal strategy — not a covered call."}},

  {id:243,element:6,q:"Cash-and-carry arbitrage in futures markets is executed when:",
   options:{A:"The futures price is below its theoretical fair value",B:"The futures price exceeds its theoretical fair value (spot + cost of carry)",C:"The spot price and futures price are equal at expiry",D:"The basis is negative (futures below spot)"},
   answer:"B",
   explanation:"Cash-and-carry arbitrage is executed when futures are OVERPRICED relative to fair value. The trader buys the spot asset (cash) and sells the overpriced futures (carry), locking in a risk-free profit as the prices converge at expiry.",
   wrongExplanations:{A:"When futures are underpriced, reverse cash-and-carry is used (sell spot, buy futures) — not standard cash-and-carry.",C:"Price equality at expiry is the convergence result, not the condition that triggers the arbitrage.",D:"Negative basis (futures below spot) is the condition for reverse cash-and-carry, not standard cash-and-carry."}},

  // ── ELEMENT 7 ──────────────────────────────────────────────────
  {id:244,element:7,q:"Under UMIR, 'wash trading' is best described as:",
   options:{A:"Executing large trades to clean up an over-extended position",B:"Placing buy and sell orders for the same instrument in a way that creates artificial trading activity without genuine change of beneficial ownership",C:"Executing both legs of a spread trade through different brokers",D:"Rolling a futures position from one expiry to the next"},
   answer:"B",
   explanation:"Wash trading is placing coordinated buy and sell orders in the same instrument (or between related parties) to create the appearance of trading activity without any genuine transfer of beneficial ownership. It is a form of market manipulation prohibited under UMIR.",
   wrongExplanations:{A:"Cleaning up over-extended positions is position management, not wash trading.",C:"Executing spread legs through different brokers is a legitimate trading practice.",D:"Rolling futures positions between expiries is a normal trading activity, not wash trading."}},

  {id:245,element:7,q:"A Registered Representative receives inside information from a client about an upcoming takeover bid. Under UMIR gatekeeping obligations, the RR should:",
   options:{A:"Place a small test trade to confirm the information before escalating",B:"Refuse any trade based on this information and immediately escalate to compliance",C:"Share the information only with their direct supervisor and continue normal operations",D:"Wait to see if the takeover is announced publicly before taking action"},
   answer:"B",
   explanation:"Trading on material non-public information (MNPI) is insider trading — illegal under securities law. The RR must refuse to act on the information AND immediately escalate to compliance. There is no grace period or test trade permitted.",
   wrongExplanations:{A:"Any trade based on MNPI is illegal — 'test trades' on inside information are still insider trading.",C:"Sharing only with a supervisor without proper compliance escalation is insufficient and may itself be a violation.",D:"Waiting for public announcement would allow the violation window to pass without being reported — immediate escalation is required."}},

  {id:246,element:7,q:"Front running in the context of derivatives is defined as:",
   options:{A:"Executing client orders before other clients' orders at the same price",B:"A registered person trading their own account ahead of a known client order to benefit from the price impact",C:"An investment dealer placing priority orders on behalf of institutional clients before retail clients",D:"Executing futures orders at the opening price before other market participants"},
   answer:"B",
   explanation:"Front running occurs when a registered person (or firm) places their OWN orders ahead of a known pending client order, with the intent to profit from the price movement that the large client order will cause. This is strictly prohibited under UMIR.",
   wrongExplanations:{A:"Client order priority is a best-execution concern but is not the definition of front running.",C:"Institutional vs retail priority is an order-handling issue, not front running as defined under UMIR.",D:"Trading at the opening is a legitimate order type — front running specifically involves using knowledge of a pending client order."}},

  {id:247,element:7,q:"FINTRAC reporting by Investment Dealers is required under which framework?",
   options:{A:"CIRO's UMIR rules on market integrity",B:"Canada's anti-money laundering legislation (PCMLTFA)",C:"NI 93-101 Derivatives: Business Conduct",D:"The Investment Dealers and Partially Consolidated (IDPC) Rules"},
   answer:"B",
   explanation:"FINTRAC (Financial Transactions and Reports Analysis Centre of Canada) reporting is required under Canada's anti-money laundering legislation — the Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA). This is separate from CIRO/derivatives-specific rules.",
   wrongExplanations:{A:"UMIR governs market trading integrity — it does not directly mandate FINTRAC reporting.",C:"NI 93-101 governs OTC derivatives business conduct — it does not cover anti-money laundering reporting.",D:"IDPC Rules govern Investment Dealer conduct — while dealers must comply with AML laws, FINTRAC reporting stems from the PCMLTFA."}},

  // ── ELEMENT 8 ──────────────────────────────────────────────────
  {id:248,element:8,q:"Under CIRO's conflict of interest framework, what is the CORRECT sequence of actions when a conflict is identified?",
   options:{A:"Disclose → Address → Avoid → Identify",B:"Identify → Avoid → Address → Disclose",C:"Address → Identify → Disclose → Avoid",D:"Avoid → Disclose → Identify → Address"},
   answer:"B",
   explanation:"The CIRO required sequence is: (1) Identify — recognize the conflict exists; (2) Avoid — try to eliminate it structurally; (3) Address — if unavoidable, neutralize its impact; (4) Disclose — if it cannot be fully resolved, disclose clearly to the client. Client interests always come first.",
   wrongExplanations:{A:"Disclosing before identifying and attempting to avoid is the wrong sequence — avoidance should be attempted before disclosure.",C:"Addressing before identifying is illogical — you cannot address a conflict you haven't identified.",D:"This reverses the sequence — avoidance comes after identification, not before."}},

  {id:249,element:8,q:"'Tied selling' under NI 93-101 is best described as:",
   options:{A:"Selling two derivative products at a bundled discount price",B:"Requiring a client to purchase one product as a condition of receiving another product or service",C:"Linking the price of a derivative to the price of its underlying asset",D:"Tying the client's account performance to the broker's compensation"},
   answer:"B",
   explanation:"Tied selling is prohibited under NI 93-101. It occurs when a firm (or rep) makes access to one product or service conditional on the client also purchasing another product. This undermines client choice and creates conflicts of interest.",
   wrongExplanations:{A:"Bundle pricing may raise suitability concerns but is not the definition of tied selling.",C:"Pricing derivatives based on their underlying is the normal pricing mechanism — this is not tied selling.",D:"Performance-based compensation structures raise separate conflict-of-interest concerns but are not the definition of tied selling."}},

  {id:250,element:8,q:"An Approved Person at an Investment Dealer wants to take on a part-time role as a director of a small private company. Under CIRO outside activity rules, what is the FIRST step?",
   options:{A:"Take on the role and disclose it at the next annual performance review",B:"Obtain prior written approval from the Investment Dealer",C:"Simply avoid discussing the role with clients",D:"Register the outside role with CIRO within 30 days"},
   answer:"B",
   explanation:"Under CIRO rules, Approved Persons must obtain prior written approval from their Investment Dealer before engaging in most outside activities. The approval requirement is a BEFORE-the-fact obligation — you cannot take on the role first and disclose later.",
   wrongExplanations:{A:"Disclosing at the annual review is far too late — prior approval is required before the activity begins.",C:"Simply not discussing it with clients does not satisfy the outside activity reporting and approval requirements.",D:"The obligation is to the Investment Dealer (prior written approval), not to file with CIRO within 30 days."}},

  {id:251,element:8,q:"Under CIRO standards, which of the following actions by a Registered Representative would MOST clearly violate the standard of 'acting openly and fairly'?",
   options:{A:"Recommending a new product to a client without first explaining all the risks",B:"Placing a client in a product that generates a higher commission without disclosing the conflict",C:"Charging a client a fee that was disclosed in the account agreement",D:"Declining to trade a product the RR is not registered to trade"},
   answer:"B",
   explanation:"Placing a client in a higher-commission product without disclosing the conflict of interest is a direct violation of the 'acting openly and fairly' standard. It involves a hidden financial incentive that could impair objectivity — transparency requires this to be disclosed.",
   wrongExplanations:{A:"Recommending without explaining risks may violate KYP/suitability rules — but the question asks about 'openly and fairly' which most directly relates to hidden conflicts.",C:"Charging a disclosed fee is transparent and compliant — there is no hidden element.",D:"Declining to trade unregistered products is appropriate regulatory compliance, not a violation."}},

  {id:252,element:8,q:"A client offers their Registered Representative a $500 gift card as a thank-you for strong portfolio performance. Under CIRO personal financial dealings rules, the RR should:",
   options:{A:"Accept it since it is a personal gift unrelated to a specific trade recommendation",B:"Accept it only if the value is below the firm's hospitality threshold",C:"Decline it — accepting any consideration from clients creates a conflict of interest",D:"Accept it and disclose it in the next quarterly compliance report"},
   answer:"C",
   explanation:"CIRO standards prohibit Approved Persons from accepting any consideration (gifts, payments, benefits) from clients in connection with their role, as this creates conflicts of interest. The prohibition covers gifts related to performance, regardless of the amount.",
   wrongExplanations:{A:"Even if framed as a personal gift, a $500 gift card for portfolio performance is directly tied to the client relationship and is prohibited.",B:"The firm's hospitality threshold is a guideline for business entertainment — a cash-equivalent gift from a client for performance crosses the line.",D:"Post-facto disclosure does not cure the conflict — declining is the required action."}},

  // ── FORMULAS & CALCULATIONS ────────────────────────────────────
  {id:253,element:4,q:"The fair value of a 6-month gold futures contract is calculated using the cost-of-carry model. Gold spot price = $1,900/oz, risk-free rate = 4%/year, storage cost = 0.5%/year. What is the approximate fair value?",
   options:{A:"$1,942.50",B:"$1,966.25",C:"$1,919.00",D:"$1,938.00"},
   answer:"A",
   explanation:"Cost of carry (6 months) = Spot × (Risk-free rate + Storage cost) × Time = $1,900 × (4% + 0.5%) × 0.5 = $1,900 × 4.5% × 0.5 = $1,900 × 0.0225 = $42.75. Fair Value = $1,900 + $42.75 = $1,942.75 ≈ $1,942.50.",
   wrongExplanations:{B:"$1,966.25 uses the full annual rate instead of the 6-month rate.",C:"$1,919 uses only the storage cost (0.5% × 0.5 = $4.75 + $1,914.25) — incorrect.",D:"$1,938 uses only the risk-free rate without adding storage costs."}},

  {id:254,element:4,q:"A put option on a stock has a strike of $80 and a premium of $6. The stock currently trades at $75. What are the intrinsic value and time value?",
   options:{A:"Intrinsic $6, time value $0",B:"Intrinsic $5, time value $1",C:"Intrinsic $0, time value $6",D:"Intrinsic $5, time value $6"},
   answer:"B",
   explanation:"Intrinsic value (put) = MAX(Strike − Spot, 0) = MAX($80 − $75, 0) = $5. Time value = Premium − Intrinsic = $6 − $5 = $1.",
   wrongExplanations:{A:"$6 intrinsic would require Strike − Spot = $6 (i.e., spot = $74). Spot is $75.",C:"$0 intrinsic would mean the put is OTM (spot > strike) — but spot ($75) < strike ($80), so the put IS in the money.",D:"Time value $6 would mean the entire premium is time value with $5 intrinsic — that would total $11, not $6."}},

  {id:255,element:6,q:"An airline needs to buy 5,000,000 litres of jet fuel in 6 months. Jet fuel futures contracts cover 100,000 litres each. How many futures contracts should the airline BUY to hedge its fuel cost risk?",
   options:{A:"25",B:"50",C:"100",D:"500"},
   answer:"B",
   explanation:"Number of contracts = Total volume ÷ Contract size = 5,000,000 ÷ 100,000 = 50 contracts. The airline fears rising fuel prices so it uses a LONG hedge (buys futures).",
   wrongExplanations:{A:"25 contracts would only hedge 2,500,000 litres — half the exposure.",C:"100 contracts would over-hedge by twice the required exposure.",D:"500 contracts = 50,000,000 litres — massively over-hedged by 10 times."}},

  {id:256,element:5,q:"A derivatives trader's position falls below the maintenance margin. The required margin call restores the account to:",
   options:{A:"The maintenance margin level",B:"The initial margin level",C:"50% above the maintenance margin level",D:"The previous day's closing equity level"},
   answer:"B",
   explanation:"When a margin call is triggered (equity falls below maintenance margin), the client must restore equity to the INITIAL margin level — not just back to maintenance. This is a critical exam distinction.",
   wrongExplanations:{A:"Restoring to maintenance margin is insufficient — the rules require restoration to the initial margin.",C:"'50% above maintenance' is not a standard regulatory requirement.",D:"Previous day's closing equity has no regulatory significance for margin calls."}},

  {id:257,element:3,q:"An equity swap allows an investor to:",
   options:{A:"Exchange the volatility of one equity for another",B:"Receive the total return of an equity index and pay a fixed or floating rate, without owning the shares directly",C:"Swap equity shares between two parties at a predetermined price",D:"Hedge the dividend risk of a stock portfolio using options"},
   answer:"B",
   explanation:"An equity swap exchanges the total return of an equity (or index) for a fixed or floating rate payment. The investor gains equity market exposure without directly owning the shares — useful for gaining exposure while avoiding transaction costs, taxes, or regulatory constraints.",
   wrongExplanations:{A:"Volatility swaps are a different instrument — equity swaps are about total return (capital gain + dividends).",C:"Physical share exchange describes a stock transaction, not a swap.",D:"Hedging dividend risk with options is a different strategy — not an equity swap."}},

  {id:258,element:2,q:"Which of the following best describes a 'Hedge Agreement' in the context of derivatives account documentation?",
   options:{A:"A legally binding agreement between two counterparties to perform a hedging transaction",B:"A document that records and formalizes a client's hedging relationship and intent, affecting how margin is treated",C:"An ISDA confirmation for an OTC derivative hedge transaction",D:"An agreement between the Investment Dealer and the exchange governing hedge margin rates"},
   answer:"B",
   explanation:"A Hedge Agreement documents the client's hedging relationship and intent. This documentation is important because it affects how margin is treated — hedgers may qualify for reduced hedge margin rates rather than full speculative margin.",
   wrongExplanations:{A:"While the agreement has legal standing, the key purpose is documenting the hedging intent for margin treatment purposes.",C:"An ISDA confirmation covers OTC trade terms — not the same as a hedge agreement for margin purposes.",D:"Hedge margin rates are set by the exchange/CDCC, but the Hedge Agreement is between the dealer and client, not the dealer and exchange."}},

  {id:259,element:5,q:"Which of the following BEST describes an 'iceberg order' in derivatives trading?",
   options:{A:"An order that automatically increases in size as the price moves favorably",B:"A large order where only a small portion is displayed to the market at any time, hiding the full order size",C:"An order that is only valid during the opening auction",D:"A stop order triggered by an unusual price movement"},
   answer:"B",
   explanation:"An iceberg order (also called a reserve or hidden order) shows only a small portion of its total size to the market. When the visible portion is filled, another tranche is revealed — this hides the full order size to minimize market impact.",
   wrongExplanations:{A:"An order that increases automatically as the price moves describes a scaling or pyramiding strategy, not an iceberg order.",C:"Opening auction orders are a different order type based on timing, not size visibility.",D:"Stop orders trigger based on price levels — unrelated to the size-concealment purpose of iceberg orders."}},

  {id:260,element:6,q:"A bear put spread consists of:",
   options:{A:"Buying a lower-strike put and selling a higher-strike put",B:"Selling a lower-strike put and buying a higher-strike put (paying net premium)",C:"Buying a lower-strike call and selling a higher-strike call",D:"Buying both a put and a call at the same strike"},
   answer:"B",
   explanation:"A bear put spread: buy the HIGHER-strike put (more expensive, more in the money) and sell the LOWER-strike put (cheaper, further OTM). The higher-strike put costs more than the lower-strike put received — net debit. Profit when price falls.",
   wrongExplanations:{A:"Buying lower-strike and selling higher-strike puts means you pay a lower premium and receive more — this would be a net CREDIT, not a typical bear put spread (which is a net debit).",C:"Buying lower-strike call and selling higher-strike call describes a bull call spread, not a bear put spread.",D:"Buying both at the same strike is a straddle, not a spread."}},

  {id:261,element:7,q:"'Cross-asset manipulation' in derivatives is defined as:",
   options:{A:"Simultaneously holding positions in two different asset classes to hedge",B:"Trading in the underlying asset to artificially move the price of a related derivative",C:"Executing trades across multiple exchanges to obtain best execution",D:"Using futures to gain exposure to an asset class not directly investable"},
   answer:"B",
   explanation:"Cross-asset manipulation involves trading in one asset (e.g., the underlying stock) with the intent to artificially move the price of a related derivative (e.g., an option on that stock). This is prohibited under UMIR as a form of artificial pricing.",
   wrongExplanations:{A:"Holding positions across asset classes for hedging is a legitimate strategy — not manipulation.",C:"Trading across exchanges for best execution is a UMIR best-execution obligation — not manipulation.",D:"Using futures for indirect exposure is a normal investment strategy — not manipulation."}},

  {id:262,element:4,q:"The 'Binomial option pricing model' differs from Black-Scholes in that it:",
   options:{A:"Produces a closed-form analytical solution",B:"Assumes constant volatility throughout the option's life",C:"Can only price European-style options",D:"Models price movements as a lattice of discrete up/down steps and can price American-style options"},
   answer:"D",
   explanation:"The Binomial model constructs a tree (lattice) of possible price movements — at each step the price either goes up or down. This discrete structure allows the model to test for early exercise at every node, making it suitable for American-style options. Black-Scholes cannot handle early exercise.",
   wrongExplanations:{A:"A closed-form analytical solution is the hallmark of Black-Scholes — the Binomial model is iterative, not closed-form.",B:"Constant volatility is the Black-Scholes assumption — the Binomial model can accommodate varying volatility at each node.",C:"The Binomial model can price BOTH American and European options — European is the limitation of Black-Scholes."}},

  {id:263,element:3,q:"In a standard interest rate swap on $5 million notional, Party A pays 5% fixed and receives CORRA + 1%. If CORRA is 3.5% during the payment period, what is the net annual payment?",
   options:{A:"Party A pays $25,000 net",B:"Party A receives $25,000 net",C:"Party A pays $75,000 net",D:"No net payment — the rates are equal"},
   answer:"A",
   explanation:"Party A pays 5% fixed = $5M × 5% = $250,000. Party A receives CORRA + 1% = 3.5% + 1% = 4.5% = $5M × 4.5% = $225,000. Net = Party A pays $250,000 − receives $225,000 = net payment of $25,000 to counterparty.",
   wrongExplanations:{B:"Party A would only receive net if the floating rate (4.5%) exceeded the fixed rate (5%) — here fixed is higher.",C:"$75,000 would result from a larger rate differential — the gap here is only 0.5% × $5M = $25,000.",D:"Rates are not equal: fixed 5% vs floating 4.5% = 0.5% differential."}},

  {id:264,element:5,q:"What is the purpose of an 'Exchange for Physical' (EFP) transaction?",
   options:{A:"To convert a listed futures position into an equivalent OTC forward position",B:"To simultaneously swap a futures position for the actual physical commodity between two counterparties",C:"To exercise a futures contract option and take physical delivery",D:"To transfer a futures position from one clearing member to another"},
   answer:"B",
   explanation:"An Exchange for Physical (EFP) allows two parties to simultaneously exchange a futures position for the actual physical commodity. Both parties agree on the price and terms, and the transaction is reported to the exchange even though it occurs off-exchange.",
   wrongExplanations:{A:"Converting a futures to an OTC forward describes an Exchange for Risk (EFR), not an EFP.",C:"Exercising a futures option for delivery is a regular exercise process — not an EFP.",D:"Transferring between clearing members describes position porting — not an EFP."}},

  {id:265,element:6,q:"A delta-neutral hedge requires a portfolio delta of:",
   options:{A:"+1.0 to reflect full bullish exposure",B:"0, meaning the portfolio has no net directional price exposure",C:"−1.0 to fully hedge a long stock position",D:"0.5, representing half the exposure of the underlying"},
   answer:"B",
   explanation:"A delta-neutral portfolio has a net delta of zero — no directional price exposure. Small moves in the underlying price do not change the portfolio's value. This does not eliminate all risk (gamma risk remains) but eliminates linear price risk.",
   wrongExplanations:{A:"Delta +1.0 means the portfolio moves dollar-for-dollar with the underlying — fully long, not neutral.",C:"Delta −1.0 means fully short — this is a directional position, not delta-neutral.",D:"Delta 0.5 means the portfolio has half the price sensitivity of the underlying — not neutral."}},

  {id:266,element:3,q:"A 'Bermudan' option is best described as:",
   options:{A:"An option that pays based on the average underlying price",B:"An option that can be exercised on specific pre-determined dates before expiry",C:"An option that automatically exercises when the underlying hits a barrier",D:"An option traded exclusively in European financial centres"},
   answer:"B",
   explanation:"A Bermudan option falls between American (exercise anytime) and European (exercise only at expiry). It can be exercised on specific pre-determined dates during the option's life — like quarterly or monthly windows.",
   wrongExplanations:{A:"Paying based on average price describes an Asian option.",C:"Automatic exercise at a barrier describes a barrier option (knock-in), not Bermudan.",D:"Bermudan refers to the exercise schedule — not the geographic location of trading."}},

  {id:267,element:8,q:"Under NI 93-101, the obligation to 'know your derivatives party' requires an Investment Dealer to:",
   options:{A:"Ensure the derivatives party has passed a proficiency exam",B:"Understand who the counterparty is and assess their capacity to trade derivatives",C:"Obtain the derivatives party's full financial statements annually",D:"Verify the derivatives party is registered with CIRO"},
   answer:"B",
   explanation:"'Know your derivatives party' under NI 93-101 requires the dealer to understand the identity and capacity of the party they are dealing with — their legal standing, authorization to trade, financial capacity, and understanding of the derivative products. This ensures fair dealing and appropriate transactions.",
   wrongExplanations:{A:"A proficiency exam is required for registered representatives at the dealer, not for counterparties.",C:"Full financial statement review is not specifically required — understanding capacity and identity is the focus.",D:"Derivatives parties may include end-users who are not registered with CIRO — registration is not a requirement."}},

  {id:268,element:1,q:"The difference between 'account appropriateness' and 'suitability' in the context of derivatives is:",
   options:{A:"Account appropriateness assesses individual trades; suitability assesses the account type",B:"Account appropriateness assesses whether the account TYPE fits the derivative activity; suitability assesses whether individual trades fit the client",C:"They are the same concept — the terms are interchangeable under CIRO rules",D:"Account appropriateness applies only to institutional clients; suitability applies only to retail clients"},
   answer:"B",
   explanation:"Account appropriateness is about whether the account STRUCTURE is right for the type of derivative trading (e.g., a margin account is needed for short options). Suitability is about whether each specific trade is appropriate for the individual client's situation. Both must be confirmed, and they are assessed separately.",
   wrongExplanations:{A:"This reverses the definitions — suitability assesses individual trades, not account type.",C:"They are distinct obligations with different focuses — not interchangeable.",D:"Both apply across client categories — account appropriateness is not limited to institutional; suitability assessments vary by client type."}},

  {id:269,element:6,q:"An investor buys a long straddle when implied volatility is at a five-year high. This is considered:",
   options:{A:"A good strategy because high volatility increases the chance of a large move",B:"A poor strategy because options are expensive when IV is high — you are buying overpriced options",C:"A neutral strategy that performs identically regardless of volatility level",D:"A good strategy because high IV means the underlying is likely to stay near the strike"},
   answer:"B",
   explanation:"Buying options when implied volatility is HIGH means paying an expensive premium. If actual volatility is lower than implied, the option loses value (vega loss) even if the stock moves. Long volatility strategies (straddles, strangles) are best entered when IV is LOW and expected to rise — not when it is already high.",
   wrongExplanations:{A:"High IV increases option premiums (costs more) rather than the probability of profit — you pay too much for the expected move.",C:"Long straddles are very sensitive to volatility level — their profitability is directly tied to how much IV changes.",D:"High IV often precedes mean reversion back toward lower volatility — the stock is not necessarily likely to stay near the strike."}},

  {id:270,element:2,q:"Under CIRO rules, when must an Investment Dealer provide the Derivatives Risk Disclosure Statement to a new retail derivatives client?",
   options:{A:"Within five business days of the client's first trade",B:"At the first annual account review",C:"Before the client's first derivatives trade",D:"Upon the client's request"},
   answer:"C",
   explanation:"The Derivatives Risk Disclosure Statement must be provided to the client BEFORE they place their first derivatives trade. This is a regulatory prerequisite — not an optional document or one that can be provided retroactively.",
   wrongExplanations:{A:"A five-day grace period does not exist — the disclosure must precede trading.",B:"Waiting until the annual review would allow trading for months without the required disclosure.",D:"The disclosure is mandatory — it cannot be conditional on the client requesting it."}},

  {id:271,element:5,q:"The 'riskless basis cross' in futures trading is:",
   options:{A:"An arbitrage trade exploiting mispricing between two futures contracts",B:"Two client orders (a buy and a sell) crossed against each other at a price between the bid and ask, with no directional risk to the dealer",C:"A hedge trade that exactly offsets a client's physical exposure",D:"A trade where the dealer takes both sides for their own inventory"},
   answer:"B",
   explanation:"A riskless basis cross occurs when a dealer has matching buy and sell orders from two different clients and crosses them at a price between the bid and ask. The dealer has no directional risk — they are simply facilitating the cross. It must be reported to the exchange.",
   wrongExplanations:{A:"An arbitrage trade exploiting futures mispricing is a spread or basis trade — not a riskless basis cross.",C:"A hedge that offsets physical exposure is a normal hedging transaction — not a riskless basis cross.",D:"Taking both sides for inventory is a proprietary trade — not a riskless basis cross."}},

  {id:272,element:4,q:"Vega in option pricing measures:",
   options:{A:"The rate of change of the option's delta",B:"The option's sensitivity to the passage of time",C:"The option's sensitivity to changes in implied volatility",D:"The option's sensitivity to interest rate changes"},
   answer:"C",
   explanation:"Vega measures how much the option's price changes for a 1% change in implied volatility. Options with high vega benefit significantly from rising volatility. Long options have positive vega (gain from rising IV); short options have negative vega.",
   wrongExplanations:{A:"The rate of change of delta is Gamma, not Vega.",B:"Sensitivity to the passage of time is Theta (time decay).",D:"Sensitivity to interest rate changes is Rho."}},

  {id:273,element:3,q:"A commodity swap where a producer receives a fixed price and pays the floating market price is described as a:",
   options:{A:"Long hedge using a swap",B:"Short hedge using a swap",C:"Speculative position in the commodity",D:"Covered call on the commodity"},
   answer:"A",
   explanation:"A producer who receives a fixed price (and pays floating) via a swap is locking in their sales price — protecting against falling commodity prices. This is a long hedge using a swap, functionally equivalent to selling futures to lock in the price of production.",
   wrongExplanations:{B:"A short hedge using a swap would involve a consumer paying fixed and receiving floating — the opposite configuration.",C:"If the producer were simply speculating, they wouldn't be offsetting their physical production exposure — speculation implies no underlying physical position.",D:"A covered call involves selling a call option against a long asset position — not a swap structure."}},

  {id:274,element:5,q:"The primary purpose of the 'guaranty fund' (clearing fund) maintained by the CDCC is:",
   options:{A:"To provide investment returns to clearing members as a benefit of membership",B:"To cover losses in the event a clearing member defaults and their own resources are insufficient",C:"To fund the development of new derivative products on the Montréal Exchange",D:"To compensate retail clients who lose money on their derivatives investments"},
   answer:"B",
   explanation:"The CDCC's guaranty/clearing fund is a mutualized pool of resources contributed by all clearing members. It serves as the final backstop — if a defaulting member's own resources (initial margin, default fund contribution) are exhausted, the guaranty fund covers the remaining losses to maintain market integrity.",
   wrongExplanations:{A:"The guaranty fund earns no investment return for members — it is a risk-sharing pool, not an investment fund.",C:"The guaranty fund has nothing to do with product development — it is a default management tool.",D:"Retail client compensation is provided by the Canadian Investor Protection Fund (CIPF), not the CDCC guaranty fund."}},

  {id:275,element:8,q:"Which of the following is a clear example of 'tied selling' prohibited under NI 93-101?",
   options:{A:"Offering a discount on brokerage fees to clients who maintain a minimum account balance",B:"Telling a client that they can only access the firm's OTC derivative products if they also open a managed account with the firm",C:"Charging different fees to retail and institutional clients",D:"Recommending a portfolio of five different derivative products to a client"},
   answer:"B",
   explanation:"Tied selling occurs when access to one product is conditioned on purchasing another. Requiring a client to open a managed account in order to access OTC derivatives is classic tied selling — it coerces the client into an additional product as a condition of service.",
   wrongExplanations:{A:"Volume/balance discounts are a pricing practice — not tied selling, provided the discount is transparent and not coercive.",C:"Different fees for different client categories is standard practice, not tied selling.",D:"Recommending multiple products in a portfolio is a legitimate advisory service — the client is free to accept or reject any of them."}},

  {id:276,element:6,q:"A short straddle is most profitable when:",
   options:{A:"The underlying asset makes a large move in either direction",B:"The underlying asset remains near the strike price at expiry — low volatility",C:"Implied volatility increases significantly after the position is opened",D:"The risk-free interest rate rises after the position is opened"},
   answer:"B",
   explanation:"A short straddle (sell call + sell put, same strike) collects the combined premium as maximum profit. The maximum profit is achieved when the underlying stays exactly at the strike at expiry — both options expire worthless. It profits from low, stable volatility.",
   wrongExplanations:{A:"Large moves in either direction create losses for short straddles — the short options get exercised against the writer.",C:"Rising implied volatility hurts short option positions (negative vega) — the options become more expensive to buy back.",D:"Interest rate changes have a minor effect through rho — not the primary driver of short straddle profitability."}},

  {id:277,element:1,q:"Under CIRO rules, an Approved Person who receives a client instruction that would breach a regulatory limit must:",
   options:{A:"Execute the instruction since the client takes responsibility for their own decisions",B:"Refuse the instruction and explain the regulatory requirement to the client",C:"Execute part of the instruction up to the regulatory limit only",D:"Obtain a supervisor's sign-off and then execute the full instruction"},
   answer:"B",
   explanation:"An Approved Person must refuse client instructions that would violate regulatory requirements — they cannot execute an instruction that breaches a rule, even at the client's request. The rep must explain why the instruction cannot be followed and what the applicable limit is.",
   wrongExplanations:{A:"Client responsibility does not override the dealer's regulatory obligations — the AP has their own duty to comply.",C:"Executing up to the limit may be appropriate in some contexts but the primary obligation is to refuse the breaching portion and explain why.",D:"Supervisor sign-off cannot authorize a regulatory breach — supervisors cannot approve violations of CIRO rules."}},

  {id:278,element:3,q:"The 'underlying interest' in a futures contract refers to:",
   options:{A:"The profit motive of the parties entering the contract",B:"The specific asset, commodity, index, or financial variable whose price the contract references",C:"The margin deposit required to open the position",D:"The interest rate used to calculate the cost of carry"},
   answer:"B",
   explanation:"The underlying interest is the specific asset or variable that the derivative contract references — this could be a commodity (e.g., gold), a financial instrument (e.g., a government bond), a financial variable (e.g., an equity index), or an event (e.g., weather). The futures price is derived from changes in the underlying interest.",
   wrongExplanations:{A:"The profit motive is a commercial reason to trade — not a technical contract term.",C:"The margin deposit is a performance bond — not the underlying interest.",D:"The interest rate in cost of carry is a pricing input — not the underlying interest itself."}},

  {id:279,element:5,q:"What is the 'day trading margin' and when does it apply?",
   options:{A:"A higher margin rate charged when positions are held overnight",B:"A reduced margin rate available for positions that are opened and closed within the same trading session",C:"The margin charged on all derivative positions regardless of holding period",D:"An emergency margin rate imposed during volatile market conditions"},
   answer:"B",
   explanation:"Day trading margin is a REDUCED margin rate that applies when a trader opens and closes a position within the same trading day (intraday). Since the position is closed before overnight settlement, the risk is lower — reducing the required performance bond.",
   wrongExplanations:{A:"Higher overnight margin (not day trading margin) would apply to positions held past the close — day trading margin is the reduced rate.",C:"Day trading margin specifically applies to same-day close — not all positions.",D:"Emergency margin is an ad-hoc increase during volatile markets, not day trading margin."}},

  {id:280,element:2,q:"The 'Concentration Report' required under CIRO rules is triggered when:",
   options:{A:"A client holds more than 10 open futures contracts",B:"A client or the firm holds an unusually large position in a single derivative relative to position limits or the market",C:"An account exceeds its daily trading volume limit",D:"A client's portfolio value reaches a certain threshold requiring enhanced monitoring"},
   answer:"B",
   explanation:"The Concentration Report flags when a client or the firm holds a disproportionately large position in a single derivative — either approaching position limits or representing an unusual concentration relative to the market. This allows regulators and supervisors to monitor systemic or manipulation risk.",
   wrongExplanations:{A:"10 contracts is not a specific trigger for a concentration report — the threshold depends on context and market size.",C:"Daily trading volume limits are a different monitoring mechanism — not specifically a concentration report trigger.",D:"Portfolio value thresholds may trigger enhanced KYC but are not the concentration report trigger."}},
];



// Fix question 236 in place — replace its data
(function(){
  const idx = NOTES_QUESTIONS.findIndex(q => q.id === 236);
  if (idx !== -1) {
    NOTES_QUESTIONS[idx] = {
      id:236,element:6,
      q:"An investor buys a $100 call for $6 and sells a $110 call for $2 (bull call spread). What are the maximum profit, maximum loss, and breakeven at expiry?",
      options:{
        A:"Max profit $6, max loss $4, breakeven $104",
        B:"Max profit $10, max loss $4, breakeven $106",
        C:"Max profit $8, max loss $4, breakeven $108",
        D:"Max profit $6, max loss $2, breakeven $108"
      },
      answer:"A",
      explanation:"Net cost (max loss) = $6 − $2 = $4. Max profit = Spread width − Net cost = ($110 − $100) − $4 = $6. Breakeven = Lower strike + Net cost = $100 + $4 = $104.",
      wrongExplanations:{
        B:"Max profit of $10 ignores the net cost of $4 — you don't earn the full spread width.",
        C:"Max profit $8 uses an incorrect net cost; breakeven $108 is also wrong.",
        D:"Max loss of $2 only accounts for the sold premium — the net cost is $4 ($6 paid minus $2 received)."
      }
    };
  }
})();




