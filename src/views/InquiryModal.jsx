

export default function InquiryModal({ v }) {
  return (
    <>
      {v.inquiryOpen ? (
        <div style={{"position":"fixed","inset":"0","zIndex":"230","background":"rgba(247,246,242,.62)","backdropFilter":"blur(14px) saturate(110%)","WebkitBackdropFilter":"blur(14px) saturate(110%)","display":"flex","alignItems":"center","justifyContent":"center","padding":"20px","animation":"pdFade .3s ease"}} data-action="closeinquiry">
          <div onClick={v.stop} style={{"background":"var(--bg)","maxWidth":"520px","width":"100%","maxHeight":"90vh","overflow":"auto","padding":"clamp(24px,3.4vw,36px)","borderRadius":"6px","boxShadow":"var(--shadow)","animation":"pdModalIn .4s cubic-bezier(.19,1,.22,1)"}}>
            <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start","gap":"12px"}}>
              <div>
                <div style={{"fontSize":"12px","color":"var(--muted)"}}>
                  {v.inquiryKind}
                </div>
                <h2 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"26px","margin":"4px 0 0"}}>
                  {v.inquiryTitle}
                </h2>
              </div>
              <span onClick={v.closeInquiry} title="Close" className="pd-x" style={{"margin":"-8px -8px 0 0"}}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <p style={{"fontSize":"14px","color":"var(--sec)","lineHeight":"1.6","margin":"12px 0 0"}}>
              Tell us a little about your interest and we will respond personally with availability, configuration options and pricing.
            </p>
            <form onSubmit={v.onInquiry} style={{"display":"grid","gap":"12px","marginTop":"22px"}}>
              {" "}
              <input required="" placeholder="Full name" className="pd-modal-field" style={{"border":"none","borderBottom":"1px solid var(--line3)","background":"transparent","padding":"11px 0","fontSize":"15px","outline":"none","color":"var(--ink)"}} />
              {" "}
              <div className="pd-inq2" style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>
                <input required="" type="email" placeholder="Email" className="pd-modal-field" style={{"border":"none","borderBottom":"1px solid var(--line3)","background":"transparent","padding":"11px 0","fontSize":"15px","outline":"none","color":"var(--ink)"}} />
                <input placeholder="Phone" className="pd-modal-field" style={{"border":"none","borderBottom":"1px solid var(--line3)","background":"transparent","padding":"11px 0","fontSize":"15px","outline":"none","color":"var(--ink)"}} />
              </div>
              {" "}
              <textarea rows="3" placeholder="Your message (optional)" className="pd-modal-field" style={{"border":"none","borderBottom":"1px solid var(--line3)","background":"transparent","padding":"11px 0","fontSize":"15px","outline":"none","resize":"vertical","color":"var(--ink)"}} />
              {" "}
              <div style={{"display":"flex","marginTop":"6px"}}>
                <button type="submit" className="pd-btn" style={{"borderRadius":"6px","height":"34px","padding":"0 14px","fontSize":"13.5px","letterSpacing":".01em","textTransform":"none"}}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
