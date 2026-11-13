

export default function Toast({ v }) {
  return (
    <>
      {v.toast ? (
        <div style={{"position":"fixed","bottom":"22px","left":"50%","transform":"translateX(-50%)","zIndex":"260","background":"var(--ink)","color":"var(--bg)","padding":"12px 20px","borderRadius":"999px","fontSize":"13px","animation":"pdFade .3s ease","boxShadow":"var(--shadow)"}}>
          {v.toast}
        </div>
      ) : null}
    </>
  );
}
