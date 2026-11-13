import { Fragment } from 'react';


export default function MaterialsPage({ v }) {
  return (
    <>
      {v.isMaterials ? (
        <div style={{"animation":"pdViewIn .5s cubic-bezier(.19,1,.22,1) both"}}>
          <section style={{"padding":"clamp(28px,4vw,56px) var(--gx) clamp(40px,5vw,64px)"}}>
            <div style={{"display":"flex","flexDirection":"column","gap":"clamp(16px,2vw,24px)","width":"520px","maxWidth":"100%","marginTop":"calc(39.6px - clamp(28px,4vw,56px))"}}>
              <h1 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"28px","margin":"0","lineHeight":"1.2","letterSpacing":"-.025em","wordSpacing":".15em","textTransform":"uppercase","color":"var(--ink)","textWrap":"pretty"}}>
                A library of materials
              </h1>
              <p style={{"fontSize":"16px","lineHeight":"1.62","color":"var(--sec)","margin":"0","width":"460px","maxWidth":"100%"}}>
                The woods, fibres and finishes found across the collection: where they come from, how they behave and how to care for them.
              </p>
            </div>
            <div style={{"marginTop":"clamp(40px,5vw,72px)","borderBottom":"1px solid var(--line)"}}>
              {" "}
              {(v.materialsList || []).map((m, $index) => (
                <Fragment key={$index}>
                  <div className="pd-matrow" style={{"display":"grid","gridTemplateColumns":"repeat(4,minmax(0,1fr))","columnGap":"var(--gx)","rowGap":"20px","padding":"clamp(24px,2.8vw,36px) 0","borderTop":"1px solid var(--line)","alignItems":"start"}}>
                    <div style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                      <div style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"22px","lineHeight":"1.15","color":"var(--ink)"}}>
                        {m?.name}
                      </div>
                      <div style={{"fontSize":"12px","color":"var(--muted)"}}>
                        {m?.origin}
                      </div>
                    </div>
                    <div className="pd-matbody" style={{"gridColumn":"2 / span 2","display":"flex","flexDirection":"column","gap":"18px","maxWidth":"560px"}}>
                      <p style={{"fontSize":"15px","lineHeight":"1.62","color":"var(--sec)","margin":"0","textWrap":"pretty"}}>
                        {m?.text}
                      </p>
                      <div style={{"display":"grid","gridTemplateColumns":"110px minmax(0,1fr)","rowGap":"8px","columnGap":"16px","fontSize":"13px","lineHeight":"1.5"}}>
                        {" "}
                        <span style={{"color":"var(--muted)"}}>
                          Character
                        </span>
                        <span style={{"color":"var(--ink)"}}>
                          {m?.props}
                        </span>
                        {" "}
                        <span style={{"color":"var(--muted)"}}>
                          Care
                        </span>
                        <span style={{"color":"var(--ink)"}}>
                          {m?.care}
                        </span>
                        {" "}
                        <span style={{"color":"var(--muted)"}}>
                          In the collection
                        </span>
                        <span style={{"color":"var(--ink)"}}>
                          {m?.countLabel}
                        </span>
                      </div>
                    </div>
                    <div style={{"display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","gap":"8px"}}>
                      {" "}
                      {(m?.pieces || []).map((p, $index1) => (
                        <Fragment key={$index1}>
                          {" "}
                          <a href="#" className="pd-tile" data-open={p?.id} title={p?.name}>
                            {" "}
                            <div className="pd-card" style={{"aspectRatio":"1 / 1"}}>
                              <img src={p?.cover} alt={p?.name} loading="lazy" decoding="async" style={{"objectFit":"contain","padding":"18.5%","background":"#FFFFFF"}} />
                            </div>
                            {" "}
                            <div style={{"fontSize":"11.5px","color":"var(--sec)","marginTop":"6px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
                              {p?.name}
                            </div>
                            {" "}
                          </a>
                        </Fragment>
                      ))}
                    </div>
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
