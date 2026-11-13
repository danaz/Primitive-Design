

export default function AboutPage({ v }) {
  return (
    <>
      {v.isAbout ? (
        <div style={{"animation":"pdViewIn .5s cubic-bezier(.19,1,.22,1) both"}}>
          <section style={{"padding":"clamp(28px,4vw,56px) var(--gx) clamp(40px,5vw,64px)"}}>
            <div className="pd-aboutgrid" style={{"--agap":"clamp(24px,3vw,48px)","display":"grid","gridTemplateColumns":"repeat(4,minmax(0,1fr))","columnGap":"var(--gx)","alignItems":"center"}}>
              <div className="pd-aboutcol" style={{"gridColumn":"1 / span 2","width":"580px","maxWidth":"100%","alignSelf":"start","marginTop":"calc(39.6px - clamp(28px,4vw,56px))","display":"flex","flexDirection":"column","gap":"clamp(16px,2vw,24px)"}}>
                <h1 style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"34px","margin":"0","lineHeight":"1.2","letterSpacing":"-.01em","textTransform":"none","textAlign":"left","color":"var(--ink)","whiteSpace":"nowrap"}}>
                  {"Founded in 1993 by master craftsman, "}
                  <br />
                  Avi Bourla.
                  <span className="pd-desk-only">
                    {" Based in Tel‑Aviv."}
                  </span>
                </h1>
                <p style={{"fontSize":"14px","lineHeight":"1.62","color":"var(--sec)","margin":"0","width":"470px","maxWidth":"100%","textWrap":"pretty"}}>
                  Primitive Design is a gallery of iconic international design and rare, handcrafted objects. We welcome collectors, designers and the curious by appointment, for an unhurried conversation about pieces, materials and provenance.
                </p>
                <p style={{"fontSize":"14px","lineHeight":"1.62","color":"var(--sec)","margin":"calc(-0.5 * clamp(16px,2vw,24px)) 0 0","width":"470px","maxWidth":"100%","textWrap":"pretty"}}>
                  It began with model aircraft in balsa wood and rice paper, then architectural models and sculpture maquettes made with uncompromising precision. In San Francisco came Victorian houses in mahogany, classic wooden sailboats and seven years building a modern wooden catamaran.
                </p>
                <p style={{"fontSize":"14px","lineHeight":"1.62","color":"var(--sec)","margin":"calc(-0.5 * clamp(16px,2vw,24px)) 0 0","width":"470px","maxWidth":"100%","textWrap":"pretty"}}>
                  {"For nearly thirty years, Indonesia has been a place of return: walking from village to village with friends who lead the way, meeting makers and gathering primitive pieces carved by hand from teak. Each object is restored slowly before it reaches Tel\u00a0Aviv."}
                </p>
                {" "}
                <a href="#" data-action="visit" style={{"alignSelf":"flex-start","fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","margin":"calc(-0.5 * clamp(16px,2vw,24px)) 0 0","fontSize":"16px","lineHeight":"1.62","color":"var(--ink)","textDecoration":"underline","textUnderlineOffset":"4px","textDecorationThickness":"1px","cursor":"pointer"}}>
                  Arrange a private visit
                </a>
              </div>
              <div className="pd-aboutimgs" style={{"gridColumn":"3 / span 2","alignSelf":"start","marginTop":"calc(45.6px - clamp(28px,4vw,56px))","display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","columnGap":"var(--gx)","alignItems":"start"}}>
                <div aria-hidden="true" style={{"gridColumn":"1","gridRow":"1","aspectRatio":"3/4","visibility":"hidden"}} />
                <div className="pd-card" style={{"gridColumn":"1 / -1","gridRow":"1","width":"100%","height":"100%","position":"relative","overflow":"hidden"}}>
                  <img src="assets/about-workshop-tools.jpg" alt="Steel scrapers and a hammer wrapped in a green cloth on a worn wooden workbench" loading="lazy" decoding="async" style={{"position":"absolute","inset":"0","width":"100%","height":"100%","objectFit":"cover"}} />
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
