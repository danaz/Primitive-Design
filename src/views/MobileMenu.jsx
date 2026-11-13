import { css } from '../lib/css.js';


export default function MobileMenu({ v }) {
  return (
    <>
      {v.menuOpen ? (
        <div className="pd-mmenu" style={{"position":"fixed","inset":"0","zIndex":"200","background":"var(--bg)","display":"flex","flexDirection":"column","padding":"20px var(--gx) calc(24px + env(safe-area-inset-bottom))","animation":"pdFade .3s ease"}}>
          <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start"}}>
            <a href="#" data-go="home" style={{"display":"block","fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"500","color":"var(--ink)","fontSize":"17px","lineHeight":"0.98","letterSpacing":".02em"}}>
              PRIMITIVE
              <br />
              DESIGN
              <br />
              <span style={{"color":"#6B6862","wordSpacing":"-.1em"}}>
                SINCE 1993
              </span>
            </a>
            <span data-action="menu" className="pd-iconbtn" style={css(`width:44px;height:44px;position:fixed;top:${v.mxTop ?? ""};right:${v.mxRight ?? ""};z-index:2`)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <nav style={{"margin":"auto 0","display":"flex","flexDirection":"column","gap":"10px","fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontSize":"36px"}}>
            {" "}
            <a href="#" data-go="home">
              Brands
            </a>
            {" "}
            <a href="#" data-go="collection">
              Collection
            </a>
            {" "}
            <a href="#" data-go="about">
              About
            </a>
            {" "}
            <span data-action="visit" style={{"cursor":"pointer"}}>
              Visit
            </span>
          </nav>
          <div style={{"display":"flex","justifyContent":"space-between","gap":"16px","fontSize":"13px","color":"var(--sec)"}}>
            <span>
              Yehuda Halevi 77, Tel Aviv
            </span>
            <span style={{"display":"flex","gap":"16px"}}>
              <a href="https://www.instagram.com/primitive.design/" target="_blank" rel="noopener" style={{"color":"var(--sec)"}}>
                Instagram
              </a>
              <a href="https://www.facebook.com/primitiveanddesign" target="_blank" rel="noopener" style={{"color":"var(--sec)"}}>
                Facebook
              </a>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
