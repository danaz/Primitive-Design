

export default function VisitPanel({ v }) {
  return (
    <>
      {v.visitOpen ? (
        <div className="pd-visitwrap" style={{"position":"fixed","inset":"0","zIndex":"200","display":"flex","alignItems":"center","justifyContent":"center","padding":"clamp(16px,3.4vh,44px) clamp(16px,3vw,48px)"}}>
          <div className="pd-visit-scrim" data-action="closevisit" style={{"position":"absolute","inset":"0","animation":"pdFade .3s ease","background":"rgba(247,246,242,.62)","backdropFilter":"blur(14px) saturate(110%)","WebkitBackdropFilter":"blur(14px) saturate(110%)"}} />
          <div className="pd-visit-box" style={{"position":"relative","zIndex":"1","width":"min(720px,100%)","maxHeight":"100%","overflowY":"auto","overflowX":"hidden","containerType":"inline-size","background":"var(--bg)","color":"var(--ink)","borderRadius":"6px","boxShadow":"var(--shadow)","padding":"32px","animation":"pdModalIn .45s cubic-bezier(.19,1,.22,1) both"}}>
            <div style={{"position":"absolute","top":"16px","right":"16px"}}>
              {" "}
              <span data-action="closevisit" title="Close" className="pd-x">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <h2 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"clamp(20px,4.5cqi,28px)","lineHeight":"1.2","letterSpacing":"-.01em","margin":"0","maxWidth":"none","textWrap":"balance","paddingRight":"24px"}}>
              <span className="pd-dsk">
                {"Primitive is a multidisciplinary gallery for furniture, "}
                <br />
                design objects, art & lighting.
              </span>
              <span className="pd-mob">
                {"A gallery for furniture, design objects, art\u00a0&\u00a0lighting."}
              </span>
            </h2>
            <p style={{"fontSize":"16px","lineHeight":"1.62","color":"var(--sec)","margin":"14px 0 0","maxWidth":"none","textWrap":"pretty"}}>
              <span className="pd-dsk">
                Visit the gallery or book a private appointment.
              </span>
              <span className="pd-mob">
                Visit us or book a private appointment.
              </span>
            </p>
            <div style={{"marginTop":"clamp(22px,2.6vw,32px)","borderTop":"1px solid var(--line)","paddingTop":"clamp(18px,2.2vw,26px)","display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","gap":"clamp(16px,2vw,24px)"}} className="pd-visitgrid">
              <div>
                <div style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                  Gallery
                </div>
                <div style={{"fontSize":"16px","marginTop":"6px","lineHeight":"1.5"}}>
                  <div>
                    Yehuda Halevi Street 77, Tel Aviv
                  </div>
                  <a href="https://www.google.com/maps/search/?api=1&query=%D7%99%D7%94%D7%95%D7%93%D7%94%20%D7%94%D7%9C%D7%95%D7%99%2077%2C%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91-%D7%99%D7%A4%D7%95%2C%20%D7%99%D7%A9%D7%A8%D7%90%D7%9C" target="_blank" rel="noopener" style={{"display":"inline-flex","alignItems":"baseline","gap":"4px","color":"var(--sec)","textDecoration":"none"}}>
                    <span style={{"textDecoration":"underline","textUnderlineOffset":"3px","textDecorationThickness":"1px"}}>
                      View on map
                    </span>
                    <span style={{"display":"inline-block","alignSelf":"center","color":"var(--muted)"}}>
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{"display":"block"}}>
                        <path d="M2.6 7.4L7.4 2.6M3.6 2.6h3.8v3.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div>
                <div style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                  Opening hours
                </div>
                <div style={{"fontSize":"16px","marginTop":"6px","lineHeight":"1.5"}}>
                  Sun–Thu 10:00–19:00
                  <br />
                  Fri 10:00–14:00
                </div>
              </div>
              <div>
                <div style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                  Private visits
                </div>
                <div style={{"fontSize":"16px","marginTop":"6px"}}>
                  By appointment
                </div>
              </div>
              <div>
                <div style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                  Phone
                </div>
                <a href="tel:+97235660551" style={{"display":"block","fontSize":"16px","marginTop":"6px","color":"inherit","textDecoration":"none"}}>
                  03 566 0551
                </a>
              </div>
              <div>
                <div style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                  WhatsApp
                </div>
                <a href={v.waHref} target="_blank" rel="noopener" style={{"display":"block","fontSize":"16px","marginTop":"6px","cursor":"pointer","color":"inherit","textDecoration":"none"}}>
                  050 838 5580
                </a>
              </div>
              <div>
                <div style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                  Email
                </div>
                <a href={v.mailHref} style={{"display":"block","fontSize":"16px","marginTop":"6px","color":"inherit","textDecoration":"none"}}>
                  {v.mailText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
