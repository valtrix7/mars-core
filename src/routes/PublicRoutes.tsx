import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import PublicInfoPage from '../pages/PublicInfoPage';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<PublicInfoPage pageId="privacy" />} />
      <Route path="/terms" element={<PublicInfoPage pageId="terms" />} />
      <Route path="/cookies" element={<PublicInfoPage pageId="cookies" />} />
      <Route path="/risk-disclosure" element={<PublicInfoPage pageId="risk" />} />
      <Route path="/aml-kyc" element={<PublicInfoPage pageId="aml" />} />
      <Route path="/pricing" element={<PublicInfoPage pageId="pricing" />} />
      <Route path="/docs" element={<PublicInfoPage pageId="docs" />} />
      <Route path="/status" element={<PublicInfoPage pageId="status" />} />
      <Route path="/support" element={<PublicInfoPage pageId="support" />} />
      <Route path="/blog" element={<PublicInfoPage pageId="blog" />} />
    </Routes>
  );
}
