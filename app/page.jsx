// 'use client';


// import { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';

// import styles from './page.module.scss';

// // ─── Grade Options & Fees ─────────────────────────────────────────────────────
// const GRADE_OPTIONS = [
//   { value: 'nursery', label: 'Nursery/Reception (4-5)', annualFee: 30500 },
//   { value: 'year1-2', label: 'Year 1-2 (5-7)', annualFee: 35000 },
//   { value: 'year3-6', label: 'Year 3-6 (7-11)', annualFee: 38000 },
//   { value: 'year7-8', label: 'Year 7-8 (11-13)', annualFee: 42000 },
//   { value: 'year9-11', label: 'Year 9-11 (13-16)', annualFee: 46000 },
//   { value: 'year12-13', label: 'Year 12-13 (16-18)', annualFee: 49000 },
// ];

// const ANNUAL_DISCOUNT = 0.05; // 5%

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function Header() {
//   return (
//     <header className={styles.header}>
//       <div className={styles.logoArea}>
//         {/* Crest placeholder — replace src with actual crest image */}
//         <svg
//           className={styles.crest}
//           viewBox="0 0 44 44"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-label="Dulwich College Crest"
//         >
//           <circle cx="22" cy="22" r="21" fill="#8b1a1a" stroke="#6b1212" strokeWidth="1" />
//           <text x="22" y="28" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
//             DC
//           </text>
//         </svg>
//         <div className={styles.schoolName}>
//           <span className={styles.collegeName}>Dulwich College</span>
//           <span className={styles.collegeName}>International School</span>
//           <span className={styles.location}>| Bangkok |</span>
//         </div>
//       </div>
//       <button className={styles.menuBtn} aria-label="Open menu">
//         <span />
//         <span />
//         <span />
//       </button>
//     </header>
//   );
// }

// function ChildCountControl({ count, onDecrement, onIncrement }) {
//   return (
//     <div className={styles.childCountCard}>
//       <button
//         className={styles.counterBtn}
//         onClick={onDecrement}
//         disabled={count <= 1}
//         aria-label="Remove child"
//       >
//         −
//       </button>
//       <span className={styles.countDisplay}>{count}</span>
//       <button
//         className={styles.counterBtn}
//         onClick={onIncrement}
//         disabled={count >= 5}
//         aria-label="Add child"
//       >
//         +
//       </button>
//     </div>
//   );
// }

// ChildCountControl.propTypes = {
//   count: PropTypes.number.isRequired,
//   onDecrement: PropTypes.func.isRequired,
//   onIncrement: PropTypes.func.isRequired,
// };

// function GradeSelect({ value, onChange, childIndex }) {
//   return (
//     <div className={styles.selectWrapper}>
//       <select
//         id={`grade-child-${childIndex}`}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         aria-label={`Grade for Child ${childIndex + 1}`}
//       >
//         {GRADE_OPTIONS.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       <span className={styles.chevron}>▼</span>
//     </div>
//   );
// }

// GradeSelect.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   childIndex: PropTypes.number.isRequired,
// };

// function PaymentPreference({ payAnnually, onChange }) {
//   return (
//     <div className={styles.paymentCard}>
//       <p className={styles.paymentTitle}>Payment preference</p>
//       <div className={styles.radioGroup}>
//         <label className={`${styles.radioLabel} ${!payAnnually ? styles.selected : ''}`}>
//           <input
//             type="radio"
//             name="payment"
//             value="termly"
//             checked={!payAnnually}
//             onChange={() => onChange(false)}
//           />
//           <span className={styles.radioCircle}>
//             <span className={styles.radioDot} />
//           </span>
//           Pay Termly
//         </label>
//         <label className={`${styles.radioLabel} ${payAnnually ? styles.selected : ''}`}>
//           <input
//             type="radio"
//             name="payment"
//             value="annually"
//             checked={payAnnually}
//             onChange={() => onChange(true)}
//           />
//           <span className={styles.radioCircle}>
//             <span className={styles.radioDot} />
//           </span>
//           Pay Annually
//         </label>
//       </div>
//       {payAnnually && <span className={styles.saveBadge}>Save ~5%</span>}
//     </div>
//   );
// }

// PaymentPreference.propTypes = {
//   payAnnually: PropTypes.bool.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// function FeesBreakdown({ children, grades, payAnnually }) {
//   const rows = useMemo(() => {
//     return Array.from({ length: children }, (_, i) => {
//       const grade = GRADE_OPTIONS.find((g) => g.value === grades[i]) || GRADE_OPTIONS[0];
//       const baseFee = grade.annualFee;
//       const finalFee = payAnnually ? Math.round(baseFee * (1 - ANNUAL_DISCOUNT)) : baseFee;
//       return { childIndex: i + 1, label: grade.label, fee: finalFee, baseFee };
//     });
//   }, [children, grades, payAnnually]);

//   const totalFee = rows.reduce((sum, r) => sum + r.fee, 0);
//   const totalBase = rows.reduce((sum, r) => sum + r.baseFee, 0);
//   const savings = payAnnually ? totalBase - totalFee : 0;

//   const fmt = (n) => `RMB ${n.toLocaleString()}`;

//   return (
//     <div className={styles.feesCard}>
//       {rows.map((row) => (
//         <div key={row.childIndex}>
//           <p className={styles.feesChildLabel}>
//             Child {row.childIndex} — {row.label}
//           </p>
//           <div className={styles.feeRow}>
//             <span className={styles.feeRowLabel}>Test Fees</span>
//             <span className={styles.feeRowValue}>{fmt(row.fee)}</span>
//           </div>
//           <div className={styles.subtotalRow}>
//             <span className={styles.subtotalLabel}>Subtotal</span>
//             <span className={styles.subtotalValue}>{fmt(row.fee)}</span>
//           </div>
//           {row.childIndex < rows.length && <div className={styles.divider} />}
//         </div>
//       ))}

//       <div className={styles.divider} />

//       <div className={styles.totalSection}>
//         <span className={styles.totalLabel}>Total Annual Fees</span>
//         <div className={styles.totalRow}>
//           <span className={styles.totalAmount}>{fmt(totalFee)}</span>
//           {payAnnually && <span className={styles.saveBadgeSmall}>Save ~5%</span>}
//         </div>
//         {payAnnually && savings > 0 && (
//           <p className={styles.savingsNote}>
//             You save approximately {fmt(savings)} with annual payment
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// FeesBreakdown.propTypes = {
//   children: PropTypes.number.isRequired,
//   grades: PropTypes.arrayOf(PropTypes.string).isRequired,
//   payAnnually: PropTypes.bool.isRequired,
// };

// // ─── Main Page Component ──────────────────────────────────────────────────────

// export default function FeeCalculatorPage() {
//   const [childCount, setChildCount] = useState(1);
//   const [grades, setGrades] = useState(Array(5).fill(GRADE_OPTIONS[0].value));
//   const [payAnnually, setPayAnnually] = useState(true);

//   const handleGradeChange = (index, value) => {
//     setGrades((prev) => {
//       const next = [...prev];
//       next[index] = value;
//       return next;
//     });
//   };

//   const handleDecrement = () => setChildCount((c) => Math.max(1, c - 1));
//   const handleIncrement = () => setChildCount((c) => Math.min(5, c + 1));

//   return (
//     <div className={styles.page}>
//       <Header />

//       <main className={styles.container}>
//         {/* Child count stepper */}
//         <ChildCountControl
//           count={childCount}
//           onDecrement={handleDecrement}
//           onIncrement={handleIncrement}
//         />

//         {/* Per-child grade selectors */}
//         {Array.from({ length: childCount }, (_, i) => (
//           <div key={i} className={styles.childSection}>
//             <p className={styles.childLabel}>Child {i + 1}</p>
//             <GradeSelect
//               value={grades[i]}
//               onChange={(val) => handleGradeChange(i, val)}
//               childIndex={i}
//             />
//           </div>
//         ))}

//         {/* Payment preference */}
//         <PaymentPreference payAnnually={payAnnually} onChange={setPayAnnually} />

//         {/* Fees breakdown */}
//         <FeesBreakdown children={childCount} grades={grades} payAnnually={payAnnually} />

//         {/* CTA */}
//         <button className={styles.applyBtn}>Apply Now</button>
//       </main>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 5;

  const handleFindSchool = () => {
    console.log('🔵 Find a School clicked');
    alert('🏫 Find a School: Explore campus options & admissions process.');
  };

  const handleEnquire = () => {
    console.log('🔘 Enquire clicked');
    alert('📝 Enquire: Request a callback or information pack.');
  };

  const handleDownload = () => {
    console.log('📄 Download PDF clicked');
    alert('📄 Download started: File Name (PDF) - Your download would begin here!');
  };

  const handleEligibility = () => {
    console.log('✅ Check Eligibility clicked');
    alert('✅ Eligibility check: Please provide student age & location for personalized guidance.');
  };

  const handleContactAdmissions = () => {
    console.log('📞 Contact Admissions Team clicked');
    alert('📞 Contact Admissions Team — you can connect with the school advisors!');
  };

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : totalItems));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalItems ? prev + 1 : 1));
  };

  return (
    
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <span className="article-badge">LEARN NEXT.JS + SASS</span>
        <h1>Sass‑styled UI Kit</h1>
        <p className="subtitle">
          PRIMARY CTA · SECONDARY CTA · Button + Icon L/R · Text OFF · Chips · Badge · LR Controller
        </p>
      </div>

      {/* SECTION 1: PRIMARY & SECONDARY BUTTONS */}
      <div className="section">
        <div className="section-title">📌 PRIMARY & SECONDARY BUTTONS</div>
        <div className="flex-row">
          <button className="btn-primary" onClick={handleFindSchool}>
            Find a School
          </button>
          <button className="btn-secondary" onClick={handleEnquire}>
            Enquire
          </button>
        </div>
        <div className="note">🔵 Main action · 🔘 Outline ghost style with JavaScript alerts</div>
      </div>

      {/* SECTION 2: ICON LEFT, ICON RIGHT & TEXT OFF */}
      <div className="grid-3">
        <div className="section">
          <h3 className="section-title">📎 BUTTON + ICON L</h3>
          <button className="btn-icon-left" onClick={handleDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3v12m0 0-3-3m3 3 3-3M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
              <path d="M4 12h2M18 12h2" />
            </svg>
            Download File Name (PDF)
          </button>
          <div className="note">📄 Icon left · file download with JavaScript</div>
        </div>

        <div className="section">
          <h3 className="section-title">⚡ BUTTON + ICON R</h3>
          <button className="btn-icon-right" onClick={handleEligibility}>
            Check Eligibility
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          <div className="note">🎯 Icon right · eligibility action with JavaScript</div>
        </div>

        <div className="section">
          <h3 className="section-title">🔘 BUTTON TEXT OFF</h3>
          <button className="btn-text-off" disabled>Button OFF</button>
          <div className="note">🚫 Disabled state — no interaction</div>
        </div>
      </div>

      {/* SECTION 3: CHIPS & BADGES */}
      <div className="section">
        <div className="section-title">🍥 CHIPS & BADGES</div>
        <div className="flex-row">
          <button className="chip-prompt" onClick={handleContactAdmissions}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Contact Admissions Team
          </button>
          
          <div className="chip-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 0 1 .586 1.414V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            </svg>
            #Dulwich College Shanghai Pudong
          </div>
          
          <span className="article-badge">NEW · GUIDE 2026</span>
        </div>
      </div>

      {/* SECTION 4: ACTION BAR WITH BUTTONS */}
      <div className="section">
        <div className="section-title">🎛️ ACTION BUTTONS GROUP</div>
        <div className="actionBar">
          <div className="iconGroup">
            <button className="circleButton">
              <OpenInFullIcon />
            </button>
            <button className="circleButton">
              <ExpandMoreIcon />
            </button>
            <button className="circleButton small">
              <ExpandMoreIcon />
            </button>
          </div>
        </div>
        <div className="note">💡 Action buttons with hover effects</div>
      </div>

      {/* SECTION 5: LR CONTROLLER */}
      <section className="controllerSection">
        <div className="section">
          <div className="section-title">🎛️ LR CONTROLLER (with JavaScript useState)</div>
          <div className="controllerBody">
            <div className="progressCard">
              <div className="progressTrack">
                {[...Array(totalItems)].map((_, index) => (
                  <div
                    key={index}
                    className={`progressItem ${
                      currentPage === index + 1 ? 'active' : ''
                    }`}
                  ></div>
                ))}
              </div>
              <br />
              <div className="arrowGroup">
                <button className="arrowBtn prev" onClick={handlePrev}>
                  <ChevronLeftIcon />
                </button>
                <button className="arrowBtn next" onClick={handleNext}>
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="note">💡 Click ← → to see JavaScript state change in action! (uses useState hook)</div>
        </div>
      </section>

      {/* SECTION 6: LIVE DEMO - ALL BUTTONS TOGETHER */}
      <div className="section">
        <div className="section-title">✨ LIVE DEMO (all components with JavaScript)</div>
        <div className="flex-row">
          <button className="btn-primary" onClick={handleFindSchool}>Find a School</button>
          <button className="btn-secondary" onClick={handleEnquire}>Enquire</button>
          <button className="btn-icon-left" onClick={handleDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
              <path d="M12 3v12m0 0-3-3m3 3 3-3M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
            </svg>
            Prospectus (PDF)
          </button>
          <button className="btn-icon-right" onClick={handleEligibility}>
            Check Eligibility
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="chip-prompt" onClick={handleContactAdmissions}>Contact Team</button>
          <div className="chip-tag">#Dulwich College</div>
          <span className="article-badge">Limited Seats</span>
          <button className="btn-text-off" disabled>Button OFF</button>
        </div>
        <div className="note" style={{ marginTop: '1rem' }}>
          💡 Try clicking any button! Each button has JavaScript console.log + alert for learning.
          Open browser console (F12) to see console.log messages!
        </div>
      </div>

      {/* SECTION 7: WHAT YOU'RE LEARNING */}
      <div className="section">
        <div className="section-title">📚 WHAT YOU'RE LEARNING FROM THIS FILE</div>
        <div className="note" style={{ marginBottom: '0.5rem' }}>
          ✅ <strong>Next.js:</strong> 'use client' directive, App Router, single file component
        </div>
        <div className="note" style={{ marginBottom: '0.5rem' }}>
          ✅ <strong>Sass (SCSS):</strong> Variables, Mixins, Nesting — all in external stylesheet
        </div>
        <div className="note" style={{ marginBottom: '0.5rem' }}>
          ✅ <strong>JavaScript:</strong> Functions, console.log(), alert(), onClick events
        </div>
        <div className="note" style={{ marginBottom: '0.5rem' }}>
          ✅ <strong>React useState:</strong> const [currentPage, setCurrentPage] = useState(1)
        </div>
        <div className="note">
          ✅ <strong>Separation of concerns:</strong> JSX logic in page.jsx, styles in global.scss
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        ✅ All 9 components from image: PRIMARY CTA · SECONDARY CTA · BUTTON+ICON L · BUTTON+ICON R · 
        BUTTON TEXT OFF · PROMPT CHIP · TAG CHIP · LR CONTROLLER · ARTICLE BADGE
        <br /><br />
        🎉 Clean JSX structure — styles imported from global stylesheet!
      </div>
    </div>
  );
}