import { Fragment } from 'react';
import { css } from '../lib/css.js';


export default function HomePage({ v }) {
  return (
    <>
      {v.isHome ? (
        <div style={{"animation":"pdViewIn .5s cubic-bezier(.19,1,.22,1) both"}}>
          {" "}
          {v.showCamp ? (
            <section className="pd-campwrap" style={{"padding":"0 var(--gx)","display":"flex","alignItems":"center","justifyContent":"center","minHeight":"180px"}}>
              {" "}
              {v.variantImage ? (
                <div className="pd-campimg">
                  <img src="assets/campaign-01.webp" alt="Campaign" loading="lazy" decoding="async" style={{"position":"absolute","inset":"0","width":"100%","height":"100%","objectFit":"cover","borderRadius":"0"}} />
                  <img className="pd-campalt" src="assets/campaign-01-alt.webp" alt="" loading="lazy" decoding="async" style={{"position":"absolute","inset":"0","width":"100%","height":"100%","objectFit":"cover","borderRadius":"0"}} />
                </div>
              ) : null}
              {" "}
              {v.variantText ? (
                <p className="pd-hero30" style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"28px","lineHeight":"1.2","letterSpacing":"-.025em","wordSpacing":".15em","textAlign":"center","maxWidth":"none","whiteSpace":"nowrap","margin":"0","color":"var(--ink)"}}>
                  <span className="pd-hl-since">
                    CURATED
                  </span>
                  <span className="pd-hl-glob" style={{"display":"none"}}>
                    A CURATION OF
                  </span>
                  {" ICONIC DESIGN &"}
                  <br />
                  {"RARE "}
                  <span className="pd-hl-since">
                    HANDCRAFTED OBJECTS, SINCE 1993
                  </span>
                  <span className="pd-hl-glob" style={{"display":"none"}}>
                    HANDCRAFTED OBJECTS, WORLDWIDE.
                  </span>
                  {v.showCollectionLine ? (
                    <>
                      <br />
                      <a href="#" data-go="collection" className="pd-navlink pd-hover-0" style={{"color":"#9A8E55","textDecoration":"none","transition":"color .35s ease"}}>
                        THE FULL COLLECTION
                        <span className="pd-collarr" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </>
                  ) : null}
                </p>
              ) : null}
            </section>
          ) : null}
          {v.campSpacer ? (
            <div style={{"height":"clamp(24px,3.4vw,52px)"}} />
          ) : null}
          {" "}
          <section style={{"padding":"0 var(--gx) clamp(40px,5vw,64px)"}}>
            <div className="pd-edgrid">
              {" "}
              {(v.homeCells || []).map((c, $index) => (
                <Fragment key={$index}>
                  <div className={c?.cls} style={css(`grid-column:span ${c?.span ?? ""}`)}>
                    {" "}
                    {c?.isImg ? (
                      <>
                        {" "}
                        {c?.headlineTop ? (
                          <div className="pd-hero30" style={css(`font-family:'Victor Serif','Instrument Serif',Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;letter-spacing:-.025em;word-spacing:.15em;white-space:nowrap;margin:0 0 clamp(20px,2.4vw,32px);color:var(--ink);position:relative;z-index:1;display:flex;flex-direction:column;align-items:${c?.hlItems ?? ""};text-align:${c?.hlAlign ?? ""}`)}>
                            <span>
                              <span className="pd-hl-since">
                                CURATED
                              </span>
                              <span className="pd-hl-glob" style={{"display":"none"}}>
                                A CURATION OF
                              </span>
                              {" ICONIC DESIGN\u00a0&"}
                            </span>
                            <span>
                              {"RARE "}
                              <span className="pd-hl-since">
                                HANDCRAFTED OBJECTS, SINCE 1993
                              </span>
                              <span className="pd-hl-glob" style={{"display":"none"}}>
                                HANDCRAFTED OBJECTS, WORLDWIDE.
                              </span>
                            </span>
                            <a href="#" data-go="collection" className="pd-navlink pd-hover-0" style={{"color":"#9A8E55","textDecoration":"none","transition":"color .35s ease"}}>
                              THE FULL COLLECTION
                              <span className="pd-collarr" aria-hidden="true">
                                →
                              </span>
                            </a>
                          </div>
                        ) : null}
                        {" "}
                        <a href="#" className={`pd-tile ${c?.tileClass ?? ""}`} data-brand-open={c?.id} data-piece={c?.pieceId} data-variant={c?.variantIdx} data-hero={c?.heroKey} data-reveal={c?.rev}>
                          {" "}
                          <div className="pd-card" style={css(`aspect-ratio:${c?.ar ?? ""}`)}>
                            <img src={c?.image} alt={c?.name} loading="lazy" decoding="async" data-src={c?.raw} style={css(`object-fit:${c?.fit ?? ""};padding:${c?.pad ?? ""};filter:${c?.filter ?? ""};background:${c?.tileBg ?? ""};--imgz:${c?.zoom ?? ""}`)} />
                            {c?.video ? (
                              <video src={c?.video} autoPlay muted="" loop="" playsInline="" preload="metadata" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:brightness(1.09) contrast(1.06) saturate(.9);transform:translateY(${c?.vShift ?? ""}) scale(${c?.vScale ?? ""});-webkit-mask-image:${c?.vMask ?? ""};mask-image:${c?.vMask ?? ""};-webkit-mask-composite:source-in;mask-composite:intersect`)} />
                            ) : null}
                            {c?.spin ? (
                              <div style={{"position":"absolute","inset":"0","background":"#F7F6F2","zIndex":"1","isolation":"isolate"}}>
                                {(c?.spinFrames || []).map((f, $index1) => (
                                  <Fragment key={$index1}>
                                    <div className="pd-spinf" aria-hidden="true" style={css(`position:absolute;inset:0;padding:0 6%;background-image:${f?.bg ?? ""};background-size:contain;background-position:center;background-repeat:no-repeat;background-origin:content-box;background-clip:content-box;transform:${f?.tf ?? ""};mix-blend-mode:multiply;opacity:0;animation-delay:${f?.delay ?? ""}`)} />
                                  </Fragment>
                                ))}
                              </div>
                            ) : null}
                            {c?.hover ? (
                              <div className="pd-hoverimg" aria-hidden="true" style={css(`position:absolute;inset:0;background-color:${c?.hoverCol ?? ""};background-image:${c?.hoverBg ?? ""};background-size:contain;background-position:center;background-repeat:no-repeat;opacity:0;transition:opacity .5s ease;z-index:2;pointer-events:none`)} />
                            ) : null}
                          </div>
                          {" "}
                          {c?.hasCap ? (
                            <div className="pd-edcap">
                              <span>
                                {c?.name}
                              </span>
                              <span style={{"color":"var(--muted)"}}>
                                {c?.country}
                              </span>
                            </div>
                          ) : null}
                          {" "}
                          {c?.mCap ? (
                            <div className="pd-edcap pd-mcap">
                              <span>
                                {c?.mName}
                              </span>
                              <span style={{"color":"var(--muted)"}}>
                                {c?.mBrand}
                              </span>
                            </div>
                          ) : null}
                          {" "}
                        </a>
                        {" "}
                        {c?.headline ? (
                          <div className={c?.hlCls} style={css(`font-family:'Victor Serif','Instrument Serif',Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;letter-spacing:-.025em;word-spacing:.15em;white-space:nowrap;margin:clamp(20px,2.4vw,32px) 0 0;color:var(--ink);position:relative;z-index:1;display:flex;flex-direction:column;align-items:${c?.hlItems ?? ""};text-align:${c?.hlAlign ?? ""}`)}>
                            <span>
                              <span className="pd-hl-since">
                                CURATED
                              </span>
                              <span className="pd-hl-glob" style={{"display":"none"}}>
                                A CURATION OF
                              </span>
                              {" ICONIC DESIGN\u00a0&"}
                            </span>
                            <span>
                              {"RARE "}
                              <span className="pd-hl-since">
                                HANDCRAFTED OBJECTS, SINCE 1993
                              </span>
                              <span className="pd-hl-glob" style={{"display":"none"}}>
                                HANDCRAFTED OBJECTS, WORLDWIDE.
                              </span>
                            </span>
                            <a href="#" data-go="collection" className="pd-navlink pd-hover-0" style={{"color":"#9A8E55","textDecoration":"none","transition":"color .35s ease"}}>
                              THE FULL COLLECTION
                              <span className="pd-collarr" aria-hidden="true">
                                →
                              </span>
                            </a>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                    {" "}
                    {c?.isPair ? (
                      <>
                        <div style={{"display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","columnGap":"var(--gx)"}}>
                          {" "}
                          {(c?.pair || []).map((p, $index1) => (
                            <Fragment key={$index1}>
                              {" "}
                              <a href="#" className="pd-tile" data-brand-open={p?.id} data-piece={p?.pieceId} data-reveal={c?.rev}>
                                {" "}
                                <div className="pd-card" style={css(`aspect-ratio:${p?.ar ?? ""}`)}>
                                  <img src={p?.image} alt={p?.name} loading="lazy" decoding="async" data-src={p?.raw} style={css(`object-fit:${p?.fit ?? ""};padding:${p?.pad ?? ""};filter:${p?.filter ?? ""};background:${p?.tileBg ?? ""};--imgz:${p?.zoom ?? ""}`)} />
                                  {p?.hover ? (
                                    <div className="pd-hoverimg" aria-hidden="true" style={css(`position:absolute;inset:0;background-color:#FFFFFF;background-image:${p?.hoverBg ?? ""};background-size:contain;background-position:center;background-repeat:no-repeat;opacity:0;transition:opacity .5s ease;z-index:2;pointer-events:none`)} />
                                  ) : null}
                                </div>
                                {" "}
                                {p?.hasCap ? (
                                  <div className="pd-edcap">
                                    <span>
                                      {p?.name}
                                    </span>
                                    <span style={{"color":"var(--muted)"}}>
                                      {p?.country}
                                    </span>
                                  </div>
                                ) : null}
                                {p?.mCap ? (
                                  <div className="pd-edcap pd-mcap">
                                    <span>
                                      {p?.mName}
                                    </span>
                                    <span style={{"color":"var(--muted)"}}>
                                      {p?.mBrand}
                                    </span>
                                  </div>
                                ) : null}
                                {" "}
                              </a>
                            </Fragment>
                          ))}
                        </div>
                        <div className="pd-hero30" style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"28px","lineHeight":"1.2","letterSpacing":"-.025em","wordSpacing":".15em","whiteSpace":"nowrap","margin":"clamp(20px,2.4vw,32px) 0 0","color":"var(--ink)","position":"relative","zIndex":"1","display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center"}}>
                          <span>
                            <span className="pd-hl-since">
                              CURATED
                            </span>
                            <span className="pd-hl-glob" style={{"display":"none"}}>
                              A CURATION OF
                            </span>
                            {" ICONIC DESIGN\u00a0&"}
                          </span>
                          <span>
                            {"RARE "}
                            <span className="pd-hl-since">
                              HANDCRAFTED OBJECTS, SINCE 1993
                            </span>
                            <span className="pd-hl-glob" style={{"display":"none"}}>
                              HANDCRAFTED OBJECTS, WORLDWIDE.
                            </span>
                          </span>
                          <a href="#" data-go="collection" className="pd-navlink pd-hover-0" style={{"color":"#9A8E55","textDecoration":"none","transition":"color .35s ease"}}>
                            THE FULL COLLECTION
                            <span className="pd-collarr" aria-hidden="true">
                              →
                            </span>
                          </a>
                        </div>
                      </>
                    ) : null}
                    {" "}
                    {c?.isText ? (
                      <div className="pd-edtext" data-reveal={c?.rev}>
                        <div className="pd-edtext-h">
                          {c?.brandName}
                        </div>
                        <p className="pd-edtext-p">
                          {c?.para1}
                        </p>
                        {" "}
                        {c?.para2 ? (
                          <p className="pd-edtext-p">
                            {c?.para2}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </Fragment>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
