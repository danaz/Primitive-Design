import IntroOverlay from './IntroOverlay.jsx';
import SiteHeader from './SiteHeader.jsx';
import MobileMenu from './MobileMenu.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import CollectionPage from './CollectionPage.jsx';
import HomePage from './HomePage.jsx';
import BrandPage from './BrandPage.jsx';
import AboutPage from './AboutPage.jsx';
import MaterialsPage from './MaterialsPage.jsx';
import SiteFooter from './SiteFooter.jsx';
import VisitPanel from './VisitPanel.jsx';
import BrandPanel from './BrandPanel.jsx';
import ProductPanel from './ProductPanel.jsx';
import InquiryModal from './InquiryModal.jsx';
import CartPanel from './CartPanel.jsx';
import Lightbox from './Lightbox.jsx';
import Toast from './Toast.jsx';

export default function SiteView({ v }) {
  return (
    <>
      <IntroOverlay v={v} />
      <div style={{"fontFamily":"'Hanken Grotesk','Helvetica Neue',Arial,sans-serif","color":"var(--ink)","background":"var(--bg)","minHeight":"100vh","overflowX":"clip","position":"relative"}}>
        <div className="pd-mlogo" style={{"position":"absolute","top":"32px","left":"var(--gx)","zIndex":"101"}}>
          {" "}
          <a href="#" data-go="home" id="pd-header-logo" style={{"display":"block","fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"500","color":"var(--ink)","fontSize":"20px","lineHeight":"0.98","letterSpacing":".02em"}}>
            <img src="assets/primitive-logo.png" alt="Primitive" style={{"display":"block","height":"1.7em","width":"auto","marginBottom":".3em"}} />
          </a>
          {" "}
          <div className="pd-logo-since" style={{"fontFamily":"'Victor Serif','Instrument Serif',Georgia,serif","fontWeight":"500","fontSize":"20px","lineHeight":"0.98","letterSpacing":".02em","wordSpacing":"-.1em","textTransform":"uppercase","color":"#6B6862"}}>
            Since 1993
          </div>
        </div>
        <SiteHeader v={v} />
        <MobileMenu v={v} />
        <SearchOverlay v={v} />
        <main>
          <CollectionPage v={v} />
          <HomePage v={v} />
          <BrandPage v={v} />
          <AboutPage v={v} />
          <MaterialsPage v={v} />
        </main>
        <SiteFooter v={v} />
        <VisitPanel v={v} />
        <BrandPanel v={v} />
        <ProductPanel v={v} />
        <InquiryModal v={v} />
        <CartPanel v={v} />
        <Lightbox v={v} />
        <Toast v={v} />
      </div>
    </>
  );
}
