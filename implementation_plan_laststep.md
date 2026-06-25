# Website Revamp, Navigation & E-commerce Integration Plan

This plan addresses all your recent requirements: removing direct Add to Cart, revamping the navigation, changing the domain, improving the hero section, and addressing the CMS integration using your provided credentials.

## User Review Required
> [!IMPORTANT]
> **CMS & Credentials Strategy - BLOCKED FOR NOW**
> You are correct—the `Peditor` account only has Editor privileges. To use WordPress as a Headless CMS for a full product catalog, we will likely need to install plugins (like ACF or WooCommerce) and enable API access, which requires **Administrator credentials**. 
> 
> *Action Item for you*: Please request an Admin account from whoever manages the WordPress site. In the meantime, I will proceed with all the design revamps, the domain change, the navigation updates, and the external e-commerce links using our current mock data so the frontend is 100% ready!

## Open Questions
> [!TIP]
> **Signature Product & Testimonials**
> 1. **Signature Product**: Currently, "Pavithram Pure Sesame Oil" is set as the signature product in the UI. You asked if this is correct: *Yes, given the 75-year history starting from a humble oil mill, Sesame Oil is traditionally the strongest anchor product.* However, once we link the WordPress CMS, you can easily change this to any product you want!
> 2. **Original Logo**: The original logo is currently saved in your codebase under `public/logo.png`. We will ensure it is used everywhere.
> 3. **Testimonials**: Please send over any real testimonials you have, and I will replace the placeholders.
> 4. **External E-commerce Links**: Since we are removing "Add to Cart", please confirm if we should add placeholder Amazon/Flipkart buttons for now until you provide the real links for each product?

## Proposed Changes

### Global Replacements
#### [MODIFY] Multiple Files
- Replace all hardcoded instances of `https://pavithram.online` and `https://www.pavithram.online` with `https://www.pavithramfoods.com` across the codebase (e.g., `sitemap.js`, `robots.js`, `layout.js`, `productData.js`, `page.js`).

### App Layout (Navigation)
#### [MODIFY] `src/app/layout.js`
- Rewrite the Header/Navbar to exactly match your requested structure:
  - Home
  - Our Story (Dropdown: Heritage, Certifications)
  - Shop (Dropdown: All Products, Oils, Ghee, Millets)
  - Recipes & Blogs
  - Contact Us (Dropdown: Contact, FAQ)
  - [Export Enquiry] (Highlighted Button)

### Home Page Design Revamp
#### [MODIFY] `src/app/page.js` & `src/app/home.css`
- **Hero Section Replacement**: Remove the "daily photo" (Model-Foreground-Hero.png) and replace it with a more vibrant, dynamic layout using your requested references (MDH, Idhayam, KLF Nirmal). We will use a richer aesthetic.
- Ensure the site feels more premium and organic, honoring the references provided.

### Product E-Commerce Linking
#### [MODIFY] `src/app/products/[slug]/ProductClient.js`
- Remove the "Quantity Selector" and "Add to Cart" button.
- Replace with external purchasing buttons (e.g., "Buy on Amazon", "Buy on Flipkart").
- Keep the "Request Bulk Quote" button for Wholesale/Export products.

#### [MODIFY] `src/data/productData.js`
- Add external URL placeholder fields (`amazonUrl`, `flipkartUrl`) to the data model so the UI can render them.

## Verification Plan

### Automated Tests
- Build the Next.js app locally (`npm run build`) to ensure no broken links or missing variables.

### Manual Verification
- Review the new Navbar structure.
- Verify that clicking "Buy" redirects externally.
- Verify the domain is correctly referenced as `pavithramfoods.com` in SEO tags and sitemaps.
