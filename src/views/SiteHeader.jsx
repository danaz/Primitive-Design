import { css } from '../lib/css.js';


export default function SiteHeader({ v }) {
  return (
    <header className="pd-mhead" style={css(`position:sticky;top:0;z-index:100;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;padding:40px var(--gx) ${v.headerPadBottom ?? ""};background:transparent`)}>
      {" "}
      <span style={{"justifySelf":"start"}} />
      {" "}
      <nav className="pd-pillbar pd-desknav" style={{"justifySelf":"center"}}>
        {" "}
        <a href="#" data-go="home" className={`pd-chip ${v.navHome ?? ""}`}>
          Brands
        </a>
        {" "}
        <a href="#" data-go="collection" className={`pd-chip ${v.navCollection ?? ""}`}>
          Collection
        </a>
        {" "}
        <a href="#" data-go="about" className={`pd-chip ${v.navAbout ?? ""}`}>
          About
        </a>
      </nav>
      <div style={{"display":"flex","alignItems":"center","gap":"22px","justifySelf":"end","fontSize":"13.5px"}}>
        {" "}
        {v.showHeaderMeta ? (
          <>
            {" "}
            {v.showVisitBtn ? (
              <span data-action="visit" className="pd-btn pd-desknav" style={{"height":"40px","padding":"0 18px","fontSize":"13px"}}>
                Visit
              </span>
            ) : null}
          </>
        ) : null}
        {" "}
        {v.isDev ? (
          <span data-action="variant" title="Cover variation (only visible to you)" className="pd-iconbtn pd-desknav" style={{"width":"40px","height":"40px","fontSize":"12px","fontVariantNumeric":"tabular-nums","cursor":"pointer"}}>
            {v.variantLabel}
          </span>
        ) : null}
        {" "}
        <span data-action="menu" className="pd-iconbtn pd-burger" title="Menu">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </header>
  );
}
