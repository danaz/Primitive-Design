import { Fragment } from 'react';
import { css } from '../lib/css.js';


export default function CollectionPage({ v }) {
  return (
    <>
      {v.isCollection ? (
        <div className="pd-ixmodal" style={{"position":"fixed","inset":"0","zIndex":"150","display":"flex","alignItems":"center","justifyContent":"center","padding":"clamp(16px,3.4vh,44px) clamp(16px,3vw,48px)"}}>
          <div className="pd-visit-scrim" data-action="closecollection" style={{"position":"absolute","inset":"0","animation":"pdFade .3s ease","background":"rgba(247,246,242,.62)","backdropFilter":"blur(14px) saturate(110%)","WebkitBackdropFilter":"blur(14px) saturate(110%)"}} />
          <div className="pd-ix" style={{"zIndex":"1","--ixbg":"#131211","--ixink":"#EDE8DF","--ixmut":"#8A8377","--ixline":"rgba(237,232,223,.13)","--ink":"#EDE8DF","--sec":"#8A8377","--muted":"#8A8377","--pill":"transparent","--line":"rgba(237,232,223,.18)","--surface":"rgba(237,232,223,.10)","position":"relative","width":"min(1180px,100%)","maxHeight":"100%","height":"min(860px,100%)","overflowY":"auto","overscrollBehavior":"contain","borderRadius":"6px","background":"#131211","color":"var(--ixink)","boxShadow":"0 1px 2px rgba(0,0,0,.06),0 24px 64px rgba(0,0,0,.2)","animation":"pdModalIn .5s cubic-bezier(.19,1,.22,1) both"}}>
            <div style={{"position":"sticky","top":"0","zIndex":"8","pointerEvents":"none","padding":"16px 16px 0","display":"flex","justifyContent":"flex-end"}}>
              {" "}
              <span data-action="closecollection" title="Close" className="pd-x" style={{"pointerEvents":"auto"}}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <section style={{"position":"relative","maxWidth":"900px","margin":"0 auto","padding":"clamp(10px,1.4vw,20px) clamp(18px,2.4vw,40px) clamp(10px,1.2vw,16px)"}}>
              <nav id="pd-ix-nav" style={{"margin":"0","display":"flex","flexDirection":"column"}}>
                {" "}
                {(v.indexCats || []).map((c, $index) => (
                  <Fragment key={$index}>
                    {" "}
                    <a href="#" data-action="filtercat" data-value={c?.value} className={`pd-ix-item ${c?.cls ?? ""}`}>
                      {" "}
                      <span className="pd-ix-word">
                        <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"clamp(24px,3.1vw,42px)","lineHeight":"1.06","letterSpacing":"-.015em"}}>
                          {c?.label}
                        </span>
                        <span className="pd-ix-num">
                          {c?.count}
                        </span>
                        <span className="pd-ix-mk" />
                      </span>
                      {" "}
                    </a>
                  </Fragment>
                ))}
              </nav>
              <div style={css(`max-width:820px;margin:clamp(30px,3.6vw,52px) auto 0;transition:opacity .3s ease;opacity:${v.gridOpacity ?? ""}`)}>
                <div id="pd-ix-listhead" style={{"display":"flex","alignItems":"baseline","justifyContent":"space-between","gap":"20px","paddingBottom":"16px","fontSize":"11px","letterSpacing":".16em","textTransform":"uppercase","color":"var(--ixmut)"}}>
                  {" "}
                  <span>
                    {v.indexListLabel}
                  </span>
                  {" "}
                  <span style={{"fontVariantNumeric":"tabular-nums"}}>
                    {v.indexCount}
                  </span>
                </div>
                {" "}
                {(v.indexRows || []).map((p, $index) => (
                  <Fragment key={$index}>
                    <div className={`pd-ix-row ${p?.rowCls ?? ""}`} data-action="ixtoggle" data-value={p?.id} data-brand={p?.brand} style={{"cursor":"pointer"}} data-reveal={$index}>
                      {" "}
                      <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"clamp(17px,1.35vw,20px)","lineHeight":"1.15","letterSpacing":"-.01em"}}>
                        {p?.name}
                      </span>
                      {" "}
                      <span style={{"fontSize":"12.5px","letterSpacing":".02em","textAlign":"right","justifySelf":"end"}}>
                        {p?.brandName}
                      </span>
                      {" "}
                      <div className="pd-ix-open">
                        <div>
                          <div className="pd-ix-og" data-brand-open={p?.brand} data-piece={p?.id} style={{"display":"grid","gridTemplateColumns":"minmax(0,3fr) minmax(0,1fr)","gap":"12px","padding":"14px 0 6px"}}>
                            <div style={css(`position:relative;overflow:hidden;aspect-ratio:${p?.moodAr ?? ""};background:#3A3834`)}>
                              {p?.moodVideo ? (
                                <video src={p?.moodVideo} autoPlay muted="" loop="" playsInline="" preload="auto" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${p?.moodPos ?? ""}`)} />
                              ) : null}
                              {p?.moodImg ? (
                                <img className="pd-ix-mood" src={p?.mood} alt="" loading="lazy" decoding="async" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${p?.moodPos ?? ""}`)} />
                              ) : null}
                            </div>
                            <div style={{"display":"flex","flexDirection":"column","justifyContent":"space-between","gap":"12px"}}>
                              <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"8px"}}>
                                {" "}
                                {p?.ixPhoto ? (
                                  <>
                                    {(p?.ixShots || []).map((s, $index1) => (
                                      <Fragment key={$index1}>
                                        <span style={{"gridColumn":"1 / -1","aspectRatio":"4 / 5","background":"#EBE8E1","overflow":"hidden","display":"block"}}>
                                          <img src={s} alt="" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
                                        </span>
                                      </Fragment>
                                    ))}
                                  </>
                                ) : null}
                                {p?.ixPack ? (
                                  <>
                                    {(p?.ixShots || []).map((s, $index1) => (
                                      <Fragment key={$index1}>
                                        <span style={{"gridColumn":"1 / -1","aspectRatio":"4 / 5","background":"#fff","display":"flex","alignItems":"center","justifyContent":"center","overflow":"hidden"}}>
                                          <img src={s} alt="" loading="lazy" decoding="async" style={{"width":"84%","height":"84%","objectFit":"contain"}} />
                                        </span>
                                      </Fragment>
                                    ))}
                                  </>
                                ) : null}
                              </div>
                              {" "}
                              <span style={{"alignSelf":"flex-start","fontSize":"13px","color":"var(--ixink)","borderBottom":"1px solid var(--ixink)","paddingBottom":"2px"}}>
                                View piece
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {" "}
                      {p?.thumb ? (
                        <>
                          {" "}
                          <span className="pd-ix-pv">
                            <img src={p?.thumb} alt="" loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                          </span>
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                ))}
                {" "}
                <div style={{"borderTop":"1px solid var(--ixline)"}} />
                {" "}
                {v.noResults ? (
                  <p style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"22px","color":"var(--ixmut)","textAlign":"center","padding":"60px 0 0","margin":"0"}}>
                    Nothing catalogued here yet.
                  </p>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
