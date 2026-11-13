import { css } from '../lib/css.js';


export default function IntroOverlay({ v }) {
  return (
    <>
      {v.introPlaying ? (
        <div data-action="skipintro" style={{"position":"fixed","inset":"0","zIndex":"300","cursor":"pointer"}}>
          <div style={css(`position:absolute;inset:0;background:var(--bg);transition:opacity 1.4s cubic-bezier(.16,1,.3,1);opacity:${v.introBgOpacity ?? ""}`)} />
          <div style={css(`position:absolute;left:var(--gx);right:var(--gx);bottom:clamp(26px,4.5vh,52px);display:flex;justify-content:space-between;align-items:baseline;gap:24px;transition:opacity .8s cubic-bezier(.16,1,.3,1);opacity:${v.introChromeOpacity ?? ""}`)}>
            <div id="pd-intro-word" style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"400","fontSize":"clamp(22px,2.4vw,32px)","lineHeight":"1","letterSpacing":"-.005em","color":"var(--ink)","whiteSpace":"nowrap","transformOrigin":"0 50%","animation":"pdWord 1.6s cubic-bezier(.16,1,.3,1) both"}}>
              Primitive Design
            </div>
          </div>
          <div className="pd-card" data-clone="0" style={css(`position:fixed;transform-origin:0 0;left:${v.introClone0?.left ?? ""};top:${v.introClone0?.top ?? ""};width:${v.introClone0?.width ?? ""};height:${v.introClone0?.height ?? ""};opacity:${v.introClone0?.opacity ?? ""};transform:${v.introClone0?.transform ?? ""};transition:${v.introClone0?.transition ?? ""};will-change:left,top,width,height,opacity,transform`)}>
            <img src={v.introClone0?.srcA} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone0?.opA ?? ""};object-fit:${v.introClone0?.fitA ?? ""};padding:${v.introClone0?.padA ?? ""};background:${v.introClone0?.bgA ?? ""};filter:${v.introClone0?.filterA ?? ""}`)} />
            <img src={v.introClone0?.srcB} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone0?.opB ?? ""};object-fit:${v.introClone0?.fitB ?? ""};padding:${v.introClone0?.padB ?? ""};background:${v.introClone0?.bgB ?? ""};filter:${v.introClone0?.filterB ?? ""}`)} />
          </div>
          <div className="pd-card" data-clone="1" style={css(`position:fixed;transform-origin:0 0;left:${v.introClone1?.left ?? ""};top:${v.introClone1?.top ?? ""};width:${v.introClone1?.width ?? ""};height:${v.introClone1?.height ?? ""};opacity:${v.introClone1?.opacity ?? ""};transform:${v.introClone1?.transform ?? ""};transition:${v.introClone1?.transition ?? ""};will-change:left,top,width,height,opacity,transform`)}>
            <img src={v.introClone1?.srcA} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone1?.opA ?? ""};object-fit:${v.introClone1?.fitA ?? ""};padding:${v.introClone1?.padA ?? ""};background:${v.introClone1?.bgA ?? ""};filter:${v.introClone1?.filterA ?? ""}`)} />
            <img src={v.introClone1?.srcB} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone1?.opB ?? ""};object-fit:${v.introClone1?.fitB ?? ""};padding:${v.introClone1?.padB ?? ""};background:${v.introClone1?.bgB ?? ""};filter:${v.introClone1?.filterB ?? ""}`)} />
          </div>
          <div className="pd-card" data-clone="2" style={css(`position:fixed;transform-origin:0 0;left:${v.introClone2?.left ?? ""};top:${v.introClone2?.top ?? ""};width:${v.introClone2?.width ?? ""};height:${v.introClone2?.height ?? ""};opacity:${v.introClone2?.opacity ?? ""};transform:${v.introClone2?.transform ?? ""};transition:${v.introClone2?.transition ?? ""};will-change:left,top,width,height,opacity,transform`)}>
            <img src={v.introClone2?.srcA} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone2?.opA ?? ""};object-fit:${v.introClone2?.fitA ?? ""};padding:${v.introClone2?.padA ?? ""};background:${v.introClone2?.bgA ?? ""};filter:${v.introClone2?.filterA ?? ""}`)} />
            <img src={v.introClone2?.srcB} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone2?.opB ?? ""};object-fit:${v.introClone2?.fitB ?? ""};padding:${v.introClone2?.padB ?? ""};background:${v.introClone2?.bgB ?? ""};filter:${v.introClone2?.filterB ?? ""}`)} />
          </div>
          <div className="pd-card" data-clone="3" style={css(`position:fixed;transform-origin:0 0;left:${v.introClone3?.left ?? ""};top:${v.introClone3?.top ?? ""};width:${v.introClone3?.width ?? ""};height:${v.introClone3?.height ?? ""};opacity:${v.introClone3?.opacity ?? ""};transform:${v.introClone3?.transform ?? ""};transition:${v.introClone3?.transition ?? ""};will-change:left,top,width,height,opacity,transform`)}>
            <img src={v.introClone3?.srcA} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone3?.opA ?? ""};object-fit:${v.introClone3?.fitA ?? ""};padding:${v.introClone3?.padA ?? ""};background:${v.introClone3?.bgA ?? ""};filter:${v.introClone3?.filterA ?? ""}`)} />
            <img src={v.introClone3?.srcB} alt="" loading="lazy" style={css(`position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s ease;opacity:${v.introClone3?.opB ?? ""};object-fit:${v.introClone3?.fitB ?? ""};padding:${v.introClone3?.padB ?? ""};background:${v.introClone3?.bgB ?? ""};filter:${v.introClone3?.filterB ?? ""}`)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
