import { Fragment } from 'react';


export default function CartPanel({ v }) {
  return (
    <>
      {v.cartOpen ? (
        <div className="pd-panel" style={{"zIndex":"225"}}>
          <div className="pd-panel-scrim" data-action="closecart" />
          <div className="pd-panel-box" style={{"width":"min(420px,92vw)","gridTemplateColumns":"1fr","padding":"22px clamp(18px,2.6vw,28px)","gap":"0"}}>
            <div style={{"display":"flex","flexDirection":"column","height":"100%"}}>
              <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
                <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"22px"}}>
                  Your inquiry list
                </span>
                <span data-action="closecart" className="pd-iconbtn">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              {" "}
              {v.cartEmpty ? (
                <div style={{"flex":"1","display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center","textAlign":"center","color":"var(--sec)","gap":"14px"}}>
                  <p style={{"fontSize":"14px","margin":"0"}}>
                    No pieces added yet.
                  </p>
                  <span data-action="closecart" className="pd-btn-ghost">
                    Continue browsing
                  </span>
                </div>
              ) : null}
              {" "}
              {v.cartHasItems ? (
                <>
                  <div style={{"flex":"1","overflow":"auto","marginTop":"16px"}}>
                    {" "}
                    {(v.cart || []).map((c, $index) => (
                      <Fragment key={$index}>
                        <div style={{"display":"flex","gap":"12px","padding":"12px 0","borderBottom":"1px solid var(--line2)","alignItems":"center"}}>
                          <div style={{"width":"52px","height":"52px","borderRadius":"6px","background":"var(--surface)","overflow":"hidden","flexShrink":"0"}}>
                            {c?.cover ? (
                              <img src={c?.cover} loading="lazy" alt={c?.name} style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                            ) : null}
                          </div>
                          <div style={{"flex":"1","minWidth":"0"}}>
                            <div style={{"fontSize":"14px"}}>
                              {c?.name}
                            </div>
                            <div style={{"fontSize":"12px","color":"var(--sec)"}}>
                              {c?.brandName}{" · "}{c?.priceLabel}
                            </div>
                          </div>
                          <span data-action="removecart" data-id={c?.id} className="pd-chip" style={{"height":"28px","fontSize":"12px"}}>
                            Remove
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div style={{"paddingTop":"16px"}}>
                    <p style={{"fontSize":"12px","color":"var(--sec)","lineHeight":"1.6","margin":"0 0 12px"}}>
                      These pieces will be sent to our team as an inquiry. Pricing and configuration are confirmed personally.
                    </p>
                    <button data-action="submitcart" className="pd-btn" style={{"width":"100%","borderRadius":"6px","height":"34px","padding":"0 14px","fontSize":"13.5px","letterSpacing":".01em","textTransform":"none"}}>
                      Send inquiry list
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
