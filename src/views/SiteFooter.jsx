import { css } from '../lib/css.js';


export default function SiteFooter({ v }) {
  return (
    <footer style={{"position":"relative","backgroundImage":"linear-gradient(var(--line),var(--line))","backgroundSize":"calc(100% - 2 * var(--gx)) 1px","backgroundPosition":"top center","backgroundRepeat":"no-repeat","padding":"clamp(32px,3.4vw,48px) var(--gx)"}}>
      <div className="pd-footgrid" style={css(`display:grid;grid-template-columns:repeat(${v.homeColumns ?? ""},minmax(0,1fr));column-gap:var(--gx);row-gap:clamp(24px,3vw,44px);align-items:start;justify-items:start`)}>
        {" "}
        <a href="#" data-go="home" aria-label="Primitive Design — home" style={{"display":"block","textDecoration":"none","cursor":"pointer"}}>
          {" "}
          <div style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"500","fontSize":"20px","lineHeight":"0.98","letterSpacing":".02em","color":"var(--ink)"}}>
            <img src="assets/primitive-logo.png" alt="Primitive" style={{"display":"block","height":"1.7em","width":"auto","marginBottom":".3em"}} />
          </div>
          {" "}
          <div style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"500","fontSize":"20px","lineHeight":"0.98","letterSpacing":".02em","wordSpacing":"-.1em","textTransform":"uppercase","color":"#6B6862"}}>
            Since 1993
          </div>
          {" "}
        </a>
        {" "}
        <div style={css(`grid-column:${v.footSocialCol ?? ""};display:flex;flex-direction:column;gap:2px;font-size:14px`)}>
          <a href="https://www.instagram.com/primitive.design/" target="_blank" rel="noopener" className="pd-navlink" style={{"alignSelf":"flex-start"}}>
            Instagram
            <span className="pd-farr" style={{"marginLeft":"4px","display":"inline-block","transition":"transform .3s ease","color":"var(--muted)"}}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </a>
          <a href="https://www.facebook.com/primitiveanddesign" target="_blank" rel="noopener" className="pd-navlink" style={{"alignSelf":"flex-start"}}>
            Facebook
            <span className="pd-farr" style={{"marginLeft":"4px","display":"inline-block","transition":"transform .3s ease","color":"var(--muted)"}}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </a>
          <span data-action="visit" className="pd-navlink" style={{"alignSelf":"flex-start","cursor":"pointer"}}>
            Contact
            <span className="pd-farr" style={{"marginLeft":"4px","display":"inline-block","transition":"transform .3s ease","color":"var(--muted)"}}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </div>
        <div style={css(`grid-column:${v.footLegalCol ?? ""};display:flex;flex-direction:column;gap:2px;font-size:14px`)}>
          <a href="#" className="pd-navlink" style={{"alignSelf":"flex-start"}}>
            Privacy Policy
            <span className="pd-farr" style={{"marginLeft":"4px","display":"inline-block","transition":"transform .3s ease","color":"var(--muted)"}}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </a>
          <a href="#" className="pd-navlink" style={{"alignSelf":"flex-start"}}>
            Terms
            <span className="pd-farr" style={{"marginLeft":"4px","display":"inline-block","transition":"transform .3s ease","color":"var(--muted)"}}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </a>
          <a href="#" data-go="materials" className="pd-navlink" style={{"alignSelf":"flex-start"}}>
            Materials
            <span className="pd-farr" style={{"marginLeft":"4px","display":"inline-block","transition":"transform .3s ease","color":"var(--muted)"}}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div style={{"position":"absolute","right":"var(--gx)","bottom":"clamp(32px,3.4vw,48px)","display":"flex","alignItems":"center","fontSize":"11px","letterSpacing":".04em","color":"var(--muted)"}}>
        {" "}
        <span className="pd-chip" style={{"height":"28px","padding":"0 12px","border":"1px solid var(--line)","fontSize":"11px"}}>
          EN
        </span>
      </div>
    </footer>
  );
}
