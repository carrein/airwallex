| Desktop                                                                                           | Mobile                                                                                           |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![Desktop](https://github.com/user-attachments/assets/97a432f3-d934-4571-8353-930dc75304a5)       | ![Mobile](https://github.com/user-attachments/assets/6862b6c9-46b6-44e7-8d21-3f91f6d86fee)       |
| ![Desktop_Modal](https://github.com/user-attachments/assets/b5de88fc-0631-41db-bb08-765a705c95bd) | ![Mobile_Modal](https://github.com/user-attachments/assets/8840ff10-9851-437f-979d-00ef8ae4f029) |

[Site](https://airwallex.pages.dev/)

# Instructions

1. Clone the repo.
2. Run `yarn`.
3. Run development environment with `yarn dev`.

# Development

This project utilizes [Vite](https://vite.dev/) to scaffold the landing page in React. The page follows strong SEO and accessibility practices while still retaining a strong design language and friendly development experience.

We employ a strong pattern of component composition in this repository. Many of these follow the [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) principle.

Please look at `BaseButton` for an example. This component is not used directly in our landing pages. Instead, we compose over in `/core/Button` and `/modal/CloseButton`. These components in turn are further composed in the hierachy to bigger "organisms" like forms.

We take extra care in delineating pure components and those with coupled logic. This separation allows us to reuse components and test them appropriately. For example, `/header/Header` and `/footer/Footer` are not baked directly in `Home` and can be composed for future pages.

For our APIs, we use [react-query](https://tanstack.com/query/latest) to our requests. The library provides an elegant interface to work around different data states and caching.

# Design Language

We make great strides in providing a modern engaging interface without compromising on developer and user interface standards.

Our choice of serif font, Goudy Bookletter 1911, provides a classy look to the landing page. This is paired with a simple two-tone muted green palette, #2D3E40 and #93BFB7 which establishes the page branding. Our cover image of a close-up macro shot of a brocolli further establishes our brand.

The tilted stylized button also plays into our design language, with our CTA buttons and modal playing into the same themes. We retain best UX practices in designing forms. Forms are powered by [react-hook-form](https://react-hook-form.com/), giving us better control over mutating the form state especially handling errors.

Finally, we leverage [styled-components](https://styled-components.com/) to theme our page. We utilize the `createGlobalStyle` to reset the default HTML styling. We perform all our CSS through this library which makes composition extremely intuitive through its syntax.

Notably, we also do not rely on a component library. These libraries are great for scaffolding quick prototype applications but are often bloated (even with tree-shaking), eschew accessibility for style and are extremely hard to eject once a project grows. The last point is especially pertinent since large companies often have a branding design language to follow. These custom branding often clash with the pre-defined styles of component libraries resulting in ugly style overrides. It is often better to work up from the core HTML elements to mitigate this.

# Performance

![Performance](https://github.com/user-attachments/assets/c89bbca4-63e1-4da2-b150-9120f59eb8c9)

Performance metrics are tested against [PageSpeed Insights](https://pagespeed.web.dev/). We optimize for performance by preloading critical assets and using modern formats. For example, the cover page is compressed in `.webp` from the original full size `.png` format. We also self-host our choice of font instead of relying on a third party service like Google Fonts to reduce latency.

Additionally the landing page relies on a small set of library with a strong preference towards native HTML semantics elements and CSS instead of Javascript scripts. By not including large libraries such as component libraries, we keep our bundle size small.

# Testing

We perform a smoke test is on these browsers and they render well.

- Chrome 134.0.6998.36
- Microsoft Edge 134.0.3124.51
- Mozilla Firefox 128.8.0esr

Additionally, we also tested the site on different, dynamic viewports the site does not clip on smaller screens.

For individual unit test, we use [React Testing Library](https://testing-library.com/).

Run the tests by invoking `yarn test`.

These test

# Deployment

The built site is deployed on [Cloudflare Pages](https://pages.cloudflare.com/). It is free and works well with Cloudflare's distribution of edge compute to serve the page.
