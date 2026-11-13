import { Fragment } from 'react';
import { css } from '../lib/css.js';


export default function SearchOverlay({ v }) {
  return (
    <>
      {v.searchOpen ? (
        <div style={{"position":"fixed","inset":"0","zIndex":"190","background":"rgba(247,246,242,.62)","backdropFilter":"blur(14px) saturate(110%)","WebkitBackdropFilter":"blur(14px) saturate(110%)","animation":"pdFade .3s ease","display":"flex","justifyContent":"center","alignItems":"flex-start","padding":"90px 20px 20px"}} data-action="closesearch">
          <div onClick={v.stop} style={{"background":"var(--bg)","width":"min(640px,100%)","maxHeight":"70vh","overflow":"auto","borderRadius":"6px","boxShadow":"var(--shadow)","padding":"10px 10px 8px","animation":"pdModalIn .4s cubic-bezier(.19,1,.22,1)"}}>
            <div style={{"display":"flex","alignItems":"center","gap":"12px","height":"48px","padding":"0 8px 0 16px","borderRadius":"6px","background":"var(--surface)"}}>
              {" "}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{"color":"var(--muted)","flexShrink":"0"}}>
                <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {" "}
              <input id="pd-search" autoFocus="" placeholder="Search pieces, brands, categories" onInput={v.onSearch} style={{"flex":"1","border":"none","background":"transparent","outline":"none","fontSize":"15px","color":"var(--ink)"}} />
              {" "}
              <span data-action="closesearch" className="pd-chip" style={{"height":"32px"}}>
                Esc
              </span>
            </div>
            {" "}
            {v.searchHasQuery ? (
              <div style={{"padding":"8px 4px 4px","display":"flex","flexDirection":"column","gap":"2px"}}>
                {" "}
                {(v.searchResults || []).map((r, $index) => (
                  <Fragment key={$index}>
                    {" "}
                    <a href="#" data-open={r?.id} style={css(`display:flex;align-items:center;gap:14px;padding:8px 10px;border-radius:6px;color:var(--ink);cursor:pointer;background:${r?.rowBg ?? ""}`)}>
                      {" "}
                      <div style={{"width":"44px","height":"44px","flexShrink":"0","overflow":"hidden","borderRadius":"0","background":"var(--surface)"}}>
                        {r?.cover ? (
                          <img src={r?.cover} alt={r?.name} loading="lazy" decoding="async" style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                        ) : null}
                      </div>
                      {" "}
                      <div style={{"flex":"1","minWidth":"0"}}>
                        <div style={{"fontSize":"14px","color":"var(--ink)"}}>
                          {r?.name}
                        </div>
                        <div style={{"fontSize":"12px","color":"var(--sec)","marginTop":"2px"}}>
                          {r?.brandName}{" · "}{r?.category}
                        </div>
                      </div>
                      {" "}
                      <div style={{"fontSize":"12.5px","color":"var(--sec)","fontVariantNumeric":"tabular-nums"}}>
                        {r?.priceLabel}
                      </div>
                      {" "}
                    </a>
                  </Fragment>
                ))}
                {" "}
                {v.searchNoResults ? (
                  <div style={{"padding":"18px 10px 10px","color":"var(--sec)","fontSize":"14px"}}>
                    No pieces found.
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
