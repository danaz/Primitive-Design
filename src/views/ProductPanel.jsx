import { Fragment } from 'react';
import { css } from '../lib/css.js';


export default function ProductPanel({ v }) {
  return (
    <>
      {v.panelOpen ? (
        <div className="pd-panel pd-panel-center">
          <div className="pd-panel-scrim" data-action="closepanel" />
          <div className="pd-panel-box">
            {" "}
            <span data-action="closepanel" title="Close" className="pd-x pd-mclose">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            {" "}
            <div className="pd-panel-media">
              {" "}
              <span data-action="closepanel" className="pd-iconbtn" style={{"position":"absolute","top":"16px","left":"16px","borderColor":"transparent","background":"transparent"}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {" "}
              <div data-action="lightbox" className="pd-panel-frame" data-shape={v.product?.shape} style={css(`opacity:${v.product?.imgOpacity ?? ""}`)}>
                {" "}
                {v.product?.activeImage ? (
                  <img src={v.product?.activeImage} alt={v.product?.name} loading="lazy" decoding="async" data-src={v.product?.rawActive} style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:${v.product?.fit ?? ""};padding:${v.product?.padPanel ?? ""};background:${v.product?.tileBg ?? ""};filter:${v.product?.filter ?? ""}`)} />
                ) : null}
                {" "}
                {v.product?.noCover ? (
                  <div className="pd-empty" style={{"position":"absolute","inset":"0"}}>
                    <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"22px","color":"var(--muted)"}}>
                      {v.product?.name}
                    </span>
                    <span style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","marginTop":"12px","color":"var(--muted)"}}>
                      Photography in preparation
                    </span>
                  </div>
                ) : null}
              </div>
              {" "}
              {v.product?.hasThumbs ? (
                <div style={css(`display:flex;gap:8px;justify-content:center;flex-wrap:${v.product?.thumbWrap ?? ""};width:min(100%,460px)`)}>
                  {" "}
                  {(v.product?.thumbs || []).map((t, $index) => (
                    <Fragment key={$index}>
                      <div data-action="gallery" data-idx={t?.idx} className="pd-thumb" style={css(`border-color:${t?.border ?? ""}`)}>
                        <img src={t?.src} alt={`View ${t?.idx ?? ""}`} loading="lazy" style={css(`padding:${t?.pad ?? ""};background:${v.product?.tileBg ?? ""};object-fit:${t?.fit ?? ""}`)} />
                      </div>
                    </Fragment>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="pd-panel-info">
              <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start","gap":"14px"}}>
                <div style={{"minWidth":"0"}}>
                  <div style={{"fontSize":"12px","color":"var(--muted)"}}>
                    <a href="#" data-go="brand" data-id={v.product?.brand} style={{"color":"var(--sec)"}}>
                      {v.product?.brandName}
                    </a>
                    {" · "}{v.product?.country}
                  </div>
                  <h2 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"clamp(24px,2.2vw,30px)","margin":"6px 0 0","lineHeight":"1.12","letterSpacing":"-.01em"}}>
                    {v.product?.name}
                  </h2>
                  {" "}
                  {v.product?.designer ? (
                    <div style={{"fontSize":"13px","color":"var(--sec)","marginTop":"4px"}}>
                      {"Designed by "}{v.product?.designer}
                    </div>
                  ) : null}
                </div>
                {" "}
                <span data-action="closepanel" className="pd-iconbtn pd-infox" style={{"flexShrink":"0"}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div style={{"display":"flex","alignItems":"baseline","justifyContent":"space-between","gap":"12px"}}>
                {" "}
                {v.product?.priceLabel ? (
                  <div style={{"fontSize":"16px","fontWeight":"500","fontVariantNumeric":"tabular-nums"}}>
                    {v.product?.priceLabel}
                  </div>
                ) : null}
                {" "}
                {v.product?.availabilityNote ? (
                  <div style={{"fontSize":"12px","color":"var(--muted)"}}>
                    {v.product?.availabilityNote}
                  </div>
                ) : null}
              </div>
              {" "}
              {v.product?.priceNote ? (
                <div style={{"fontSize":"12px","lineHeight":"1.45","color":"var(--muted)","marginTop":"-6px"}}>
                  {v.product?.priceNote}
                </div>
              ) : null}
              {" "}
              <p style={{"fontSize":"14.5px","lineHeight":"1.65","color":"var(--sec)","margin":"0","maxWidth":"48ch"}}>
                {v.product?.desc}
              </p>
              <div style={{"display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
                {" "}
                <span data-action="secondary" className="pd-btn" style={{"borderRadius":"6px","height":"34px","padding":"0 14px","fontSize":"13.5px","letterSpacing":".01em","textTransform":"none","cursor":"pointer"}}>
                  Email us
                </span>
                {" "}
                <a href={v.waHref} target="_blank" rel="noopener" className="pd-btn-ghost" style={{"borderRadius":"6px","height":"34px","padding":"0 14px","fontSize":"13.5px","letterSpacing":".01em","textTransform":"none","cursor":"pointer","textDecoration":"none","color":"inherit","display":"inline-flex","alignItems":"center"}}>
                  WhatsApp
                </a>
              </div>
              <div>
                {" "}
                {(v.product?.specs || []).map((s, $index) => (
                  <Fragment key={$index}>
                    <div className="pd-spec">
                      <span style={{"color":"var(--muted)"}}>
                        {s?.label}
                      </span>
                      <span style={{"lineHeight":"1.5","whiteSpace":"pre-line"}}>
                        {s?.value}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
              {" "}
              {v.product?.hasDocs ? (
                <div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>
                  {" "}
                  {v.product?.pdf ? (
                    <a href={v.product?.pdf} target="_blank" rel="noopener" className="pd-doc">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{"flexShrink":"0"}}>
                        <path d="M5 2.5h5.5L14 6v9.5H5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M10.5 2.5V6H14" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M9.5 8.5v4.5M7.5 11.2l2 1.8 2-1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{"flex":"1"}}>
                        Full specification
                      </span>
                      <span style={{"fontSize":"11px","color":"var(--muted)","letterSpacing":".08em"}}>
                        PDF
                      </span>
                    </a>
                  ) : null}
                  {" "}
                  {v.product?.video ? (
                    <a href={v.product?.video} target="_blank" rel="noopener" className="pd-doc">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{"flexShrink":"0"}}>
                        <rect x="2.5" y="4" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M8 7l3 2-3 2z" fill="currentColor" />
                      </svg>
                      <span style={{"flex":"1"}}>
                        Watch the piece
                      </span>
                      <span style={{"fontSize":"11px","color":"var(--muted)","letterSpacing":".08em"}}>
                        VIDEO
                      </span>
                    </a>
                  ) : null}
                </div>
              ) : null}
              {" "}
              {v.hasRelated ? (
                <div style={{"paddingTop":"6px"}}>
                  <div style={{"fontSize":"12px","color":"var(--muted)","marginBottom":"10px"}}>
                    {"More from "}{v.product?.brandName}
                  </div>
                  <div className="pd-related">
                    {" "}
                    {(v.related || []).map((p, $index) => (
                      <Fragment key={$index}>
                        {" "}
                        <a href="#" data-open={p?.id} title={p?.name}>
                          {" "}
                          <div className="pd-card">
                            {" "}
                            {p?.cover ? (
                              <img src={p?.cover} alt={p?.name} loading="lazy" data-src={p?.raw} style={css(`position:absolute;inset:0;object-fit:${p?.fit ?? ""};padding:${p?.padSmall ?? ""};background:${p?.tileBg ?? ""};filter:${p?.filter ?? ""}`)} />
                            ) : null}
                            {" "}
                            {p?.noCover ? (
                              <div className="pd-empty" style={{"position":"absolute","inset":"0","padding":"8px"}}>
                                <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"13px","color":"var(--muted)"}}>
                                  {p?.name}
                                </span>
                              </div>
                            ) : null}
                          </div>
                          {" "}
                        </a>
                      </Fragment>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
