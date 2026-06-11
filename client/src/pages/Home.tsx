/**
 * DØMMVX — Home Page
 * Design Philosophy: "Void Architecture" — Brutalismo Espacial
 *
 * Estrutura:
 * 1. Hero Section fullscreen (100vh) com tipografia gigante + imagem editorial
 * 2. Product Details com specs e imagens (conectado ao Shopify)
 * 3. Footer minimalista
 * + Cart Drawer global
 */
import HeroSection from "@/components/HeroSection";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      <HeroSection />
      <ProductDetails />
      <Footer />
      <CartDrawer />
    </div>
  );
}
