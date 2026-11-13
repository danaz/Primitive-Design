import { Fragment } from 'react';
import { css } from '../lib/css.js';


export default function BrandPanel({ v }) {
  return (
    <>
      {v.brandPanelOpen ? (
        <div className={`pd-panel ${v.bpanelCenterCls ?? ""}`}>
          <div className="pd-panel-scrim" data-action="closebrandpanel" />
          <div className="pd-panel-box">
            {" "}
            <span data-action="closebrandpanel" title="Close" className="pd-x pd-panel-x">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            {" "}
            <div className="pd-panel-media">
              {" "}
              <span data-action="closebrandpanel" className="pd-iconbtn" style={{"position":"absolute","top":"16px","left":"16px","borderColor":"transparent","background":"transparent"}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {" "}
              <div className="pd-panel-frame" data-shape={v.bpanelShape} style={{"cursor":"default"}}>
                {" "}
                {v.bpanelPair ? (
                  <div className="pd-pair" style={{"position":"absolute","inset":"0","display":"grid","gridTemplateRows":"minmax(0,1fr) minmax(0,1fr)","gap":"12px","padding":"5%","background":"#fff"}}>
                    <img data-pair="A" alt={v.bpanel?.name} decoding="async" style={{"width":"100%","height":"100%","minHeight":"0","objectFit":"contain","display":"block"}} />
                    <img data-pair="B" alt={v.bpanel?.name} decoding="async" style={{"width":"100%","height":"100%","minHeight":"0","objectFit":"contain","display":"block"}} />
                  </div>
                ) : null}
                {" "}
                {v.bpanelSingle ? (
                  <img src={v.bpanelImage} alt={v.bpanel?.name} loading="lazy" decoding="async" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:${v.bpanelFit ?? ""};padding:${v.bpanelPad ?? ""};background:${v.bpanelBg ?? ""};filter:${v.bpanel?.filter ?? ""};transform:scale(${v.bpanelZoom ?? ""})`)} />
                ) : null}
                {" "}
                {v.bpanelNoMedia ? (
                  <div className="pd-empty" style={{"position":"absolute","inset":"0"}}>
                    <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"22px","color":"var(--muted)"}}>
                      {v.bpanelEmptyName}
                    </span>
                    <span style={{"fontSize":"10px","letterSpacing":".14em","textTransform":"uppercase","marginTop":"12px","color":"var(--muted)"}}>
                      Photography in preparation
                    </span>
                  </div>
                ) : null}
              </div>
              {" "}
              {v.bpanelHasVariants ? (
                <div style={css(`display:flex;gap:8px;justify-content:center;flex-wrap:${v.bpThumbWrap ?? ""};width:min(100%,460px);height:${v.bpThumbH ?? ""};margin-top:${v.bpThumbMt ?? ""};overflow:visible;align-items:flex-start;transform:${v.bpThumbTf ?? ""}`)}>
                  {" "}
                  {(v.bpanelVariants || []).map((t, $index) => (
                    <Fragment key={$index}>
                      <div data-action="bvariant" data-idx={t?.idx} className="pd-thumb" style={css(`border-color:${t?.border ?? ""}`)}>
                        <img src={t?.src} alt={`Variant ${t?.idx ?? ""}`} loading="lazy" style={css(`object-fit:${t?.fit ?? ""};background:${v.bpanelBg ?? ""}`)} />
                      </div>
                    </Fragment>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="pd-panel-info">
              <div>
                <div style={{"fontSize":"12px","color":"var(--muted)"}}>
                  {v.bpanel?.country}
                </div>
                <h2 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"clamp(24px,2.2vw,30px)","margin":"6px 0 0","lineHeight":"1.12","letterSpacing":"-.01em"}}>
                  {v.bpanel?.name}
                </h2>
                {" "}
                {v.bpanel?.tagline ? (
                  <div style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"16px","color":"var(--sec)","marginTop":"8px"}}>
                    {v.bpanel?.tagline}
                  </div>
                ) : null}
              </div>
              {" "}
              {v.bpanel?.body ? (
                <p style={{"fontSize":"14px","lineHeight":"1.45","color":"var(--sec)","margin":"0","textWrap":"pretty"}}>
                  {v.bpanel?.body}
                </p>
              ) : null}
              {" "}
              {v.bpanel?.body2 ? (
                <p style={{"fontSize":"14px","lineHeight":"1.45","color":"var(--sec)","margin":"-8px 0 0","textWrap":"pretty"}}>
                  {v.bpanel?.body2}
                </p>
              ) : null}
              {" "}
              {v.bpieceHas ? (
                <div style={{"borderTop":"1px solid var(--line2)","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"18px"}}>
                  <div style={{"display":"flex","alignItems":"baseline","justifyContent":"space-between","gap":"14px"}}>
                    {" "}
                    <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"20px","lineHeight":"1.15","letterSpacing":"-.01em"}}>
                      {v.bpiece?.name}
                    </span>
                    {" "}
                    <span style={{"fontSize":"14px","color":"var(--sec)","textAlign":"right","whiteSpace":"nowrap","fontVariantNumeric":"tabular-nums"}}>
                      {v.bpiece?.priceLabel}
                    </span>
                  </div>
                  {" "}
                  {v.bpiece?.priceNote ? (
                    <div style={{"fontSize":"12px","lineHeight":"1.45","color":"var(--muted)","marginTop":"-8px"}}>
                      {v.bpiece?.priceNote}
                    </div>
                  ) : null}
                  {" "}
                  {v.bpiece?.desc ? (
                    <p style={{"fontSize":"14px","lineHeight":"1.45","color":"var(--sec)","margin":"-8px 0 0","textWrap":"pretty"}}>
                      {v.bpiece?.desc}
                    </p>
                  ) : null}
                  {" "}
                  <div>
                    <div style={{"fontSize":"11px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)","marginBottom":"10px"}}>
                      Specifications
                    </div>
                    {" "}
                    {(v.bpieceSpecs || []).map((sp, $index) => (
                      <Fragment key={$index}>
                        <div style={{"display":"flex","alignItems":"baseline","justifyContent":"space-between","gap":"16px","padding":"7px 0","borderTop":"1px solid var(--line2)"}}>
                          {" "}
                          <span style={{"fontSize":"14px","color":"var(--muted)","whiteSpace":"nowrap"}}>
                            {sp?.label}
                          </span>
                          {" "}
                          <span style={{"fontSize":"14px","color":"var(--sec)","textAlign":"right"}}>
                            {sp?.value}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                    {" "}
                    {v.bpiece?.hasDocs ? (
                      <div style={{"display":"flex","gap":"20px","flexWrap":"wrap","marginTop":"12px"}}>
                        {" "}
                        {v.bpiece?.hasPdf ? (
                          <a href={v.bpiece?.pdf} target="_blank" rel="noopener" className="pd-navlink" style={{"display":"inline-flex","alignItems":"center","gap":"7px","fontSize":"14px","color":"var(--sec)"}}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M6 1v7M3.2 5.4L6 8.2l2.8-2.8M1.6 10.4h8.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                            </svg>
                            Catalogue (PDF)
                          </a>
                        ) : null}
                        {" "}
                        {v.bpiece?.hasVideo ? (
                          <a href={v.bpiece?.video} target="_blank" rel="noopener" className="pd-navlink" style={{"display":"inline-flex","alignItems":"center","gap":"7px","fontSize":"14px","color":"var(--sec)"}}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3.5 2v8l6-4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                            </svg>
                            Watch video
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div style={{"display":"flex","gap":"10px","flexWrap":"wrap"}}>
                    {" "}
                    <span data-action="bpcontact" className="pd-btn" style={{"borderRadius":"6px","height":"34px","padding":"0 14px","fontSize":"13.5px","letterSpacing":".01em","textTransform":"none","cursor":"pointer"}}>
                      Email us
                    </span>
                    {" "}
                    <a href={v.waHref} target="_blank" rel="noopener" className="pd-btn-ghost" style={{"borderRadius":"6px","height":"34px","padding":"0 14px","fontSize":"13.5px","letterSpacing":".01em","textTransform":"none","cursor":"pointer","textDecoration":"none","color":"inherit","display":"inline-flex","alignItems":"center"}}>
                      WhatsApp
                    </a>
                  </div>
                </div>
              ) : null}
              {" "}
              {v.bpanelHasProducts ? (
                <div>
                  <div style={{"display":"flex","alignItems":"baseline","justifyContent":"space-between","gap":"10px","marginBottom":"12px"}}>
                    <span style={{"fontSize":"11px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--muted)"}}>
                      Pieces
                    </span>
                    <span style={{"fontSize":"12px","color":"var(--muted)","fontVariantNumeric":"tabular-nums"}}>
                      {v.bpanelCount}
                    </span>
                  </div>
                  <div className="pd-related">
                    {" "}
                    {(v.bpanelProducts || []).map((p, $index) => (
                      <Fragment key={$index}>
                        {" "}
                        <a href="#" data-brand-open={p?.brand} data-piece={p?.id}>
                          {" "}
                          <div className="pd-card">
                            {" "}
                            {p?.cover ? (
                              <img src={p?.cover} alt={p?.name} loading="lazy" decoding="async" style={css(`object-fit:${p?.fit ?? ""};padding:${p?.padSmall ?? ""};background:${p?.tileBg ?? ""};filter:${p?.filter ?? ""};--imgz:${p?.zoom ?? ""}`)} />
                            ) : null}
                            {" "}
                            {p?.noCover ? (
                              <div className="pd-empty" style={{"position":"absolute","inset":"0","fontSize":"10px","textAlign":"center","padding":"8px"}}>
                                {p?.name}
                              </div>
                            ) : null}
                          </div>
                          {" "}
                          <div style={{"fontSize":"11.5px","color":"var(--sec)","marginTop":"6px","lineHeight":"1.3"}}>
                            {p?.name}
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
