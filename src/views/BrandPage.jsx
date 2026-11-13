import { Fragment } from 'react';
import { css } from '../lib/css.js';


export default function BrandPage({ v }) {
  return (
    <>
      {v.isBrand ? (
        <div style={{"animation":"pdViewIn .5s cubic-bezier(.19,1,.22,1) both"}}>
          <section className="pd-brandhero" style={{"padding":"clamp(24px,3.4vw,40px) clamp(16px,2.4vw,32px)","display":"grid","gridTemplateColumns":"minmax(0,1.4fr) minmax(0,1fr)","gap":"clamp(22px,3vw,40px)","alignItems":"start"}}>
            <div>
              <p style={{"fontSize":"12px","color":"var(--muted)","margin":"0 0 10px"}}>
                {v.brand?.country}
              </p>
              <h1 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"clamp(26px,3vw,36px)","margin":"0","lineHeight":"1.1","letterSpacing":"-.01em"}}>
                {v.brand?.name}
              </h1>
              <p style={{"fontSize":"14.5px","lineHeight":"1.65","color":"var(--sec)","margin":"16px 0 0","maxWidth":"52ch","whiteSpace":"pre-line"}}>
                {v.brand?.long}
              </p>
            </div>
            <div className="pd-card" style={{"aspectRatio":"4/5","display":"flex","alignItems":"center","justifyContent":"center"}}>
              {" "}
              {v.brand?.image ? (
                <img src={v.brand?.image} alt={v.brand?.name} loading="lazy" decoding="async" />
              ) : null}
              {" "}
              {v.brand?.noImage ? (
                <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"20px","color":"var(--muted)"}}>
                  {v.brand?.name}
                </span>
              ) : null}
            </div>
          </section>
          <section style={{"padding":"clamp(8px,1.4vw,20px) var(--gx) 0"}}>
            <div style={{"display":"flex","alignItems":"baseline","gap":"10px","marginBottom":"18px"}}>
              <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"22px"}}>
                Pieces
              </span>
              <span style={{"fontSize":"12px","color":"var(--muted)"}}>
                {v.brandCount}
              </span>
            </div>
            <div className="pd-grid" style={css(`grid-template-columns:repeat(auto-fill,minmax(${v.gridMin ?? ""}px,1fr))`)}>
              {" "}
              {(v.brandProducts || []).map((p, $index) => (
                <Fragment key={$index}>
                  {" "}
                  <a href="#" className="pd-tile" data-open={p?.id} data-reveal={$index}>
                    {" "}
                    <div className="pd-card" style={css(`aspect-ratio:${p?.ar ?? ""}`)}>
                      {" "}
                      {p?.cover ? (
                        <img src={p?.cover} alt={p?.name} loading="lazy" decoding="async" data-src={p?.raw} style={css(`background:${p?.tileBg ?? ""};object-fit:${p?.fit ?? ""};padding:${p?.pad ?? ""};filter:${p?.filter ?? ""}`)} />
                      ) : null}
                      {" "}
                      {p?.noCover ? (
                        <div className="pd-empty" style={{"position":"absolute","inset":"0"}}>
                          <span style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"18px","color":"var(--muted)"}}>
                            {p?.name}
                          </span>
                        </div>
                      ) : null}
                      {" "}
                      <div className={`pd-cap ${v.captionClass ?? ""}`}>
                        <span className="pd-tag pd-tag-light">
                          {p?.name}
                        </span>
                        {p?.priceLabel ? (
                          <span className="pd-tag">
                            {p?.priceLabel}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {" "}
                  </a>
                </Fragment>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
