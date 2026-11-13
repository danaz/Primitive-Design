import { css } from '../lib/css.js';


export default function Lightbox({ v }) {
  return (
    <>
      {v.lightboxOpen ? (
        <div style={{"position":"fixed","inset":"0","zIndex":"240","background":"rgba(23,21,15,0.94)","display":"flex","alignItems":"center","justifyContent":"center","animation":"pdFade .3s ease"}} data-action="closelightbox">
          {" "}
          <span data-action="closelightbox" className="pd-iconbtn" style={{"position":"absolute","top":"20px","right":"24px","background":"rgba(255,255,255,.12)","borderColor":"transparent","color":"#fff"}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </span>
          {" "}
          <img src={v.lightboxImage} alt={v.product?.name} loading="lazy" onClick={v.stop} decoding="async" style={css(`max-width:88vw;max-height:88vh;object-fit:contain;border-radius:0;animation:pdModalIn .4s cubic-bezier(.19,1,.22,1);transition:opacity .3s ease;opacity:${v.product?.imgOpacity ?? ""}`)} />
          {" "}
          {v.product?.hasThumbs ? (
            <>
              <span data-action="lbprev" className="pd-iconbtn" style={{"position":"absolute","left":"24px","top":"50%","transform":"translateY(-50%)","background":"rgba(255,255,255,.12)","borderColor":"transparent","color":"#fff"}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span data-action="lbnext" className="pd-iconbtn" style={{"position":"absolute","right":"24px","top":"50%","transform":"translateY(-50%)","background":"rgba(255,255,255,.12)","borderColor":"transparent","color":"#fff"}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
