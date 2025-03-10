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

This project utilizes [Vite](https://vite.dev/) to scaffold the landing page in React. The page adheres to strong SEO and accessibility practices while maintaining a robust design language and a friendly development experience.

We employ a solid pattern of component composition in this repository, many of which follow the [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) principle.

Please refer to `BaseButton` for an example. This component is not used directly in our landing pages; instead, we compose it in `/core/Button` and `/modal/CloseButton`. These components, in turn, are further composed in the hierarchy into larger "organisms," such as forms.

We take extra care to delineate pure components from those with coupled logic. This separation allows us to reuse components and test them appropriately. For example, `/header/Header` and `/footer/Footer` are not directly baked into `Home` and can be composed for future pages.

For our APIs, we use [react-query](https://tanstack.com/query/latest) for our requests. The library provides an elegant interface to manage different data states and caching.

# Design Language

We make great strides in providing a modern, engaging interface without compromising developer and user interface standards.

Our choice of serif font, Goudy Bookletter 1911, gives the landing page a classy look. This is paired with a simple two-tone muted green palette, #2D3E40 and #93BFB7, which establishes the page branding. Our cover image, a close-up macro shot of broccoli, further reinforces our brand.

The tilted stylized button also aligns with our design language, with our CTA buttons and modal reflecting the same themes. We adhere to best UX practices in designing forms. Forms are powered by [react-hook-form](https://react-hook-form.com/), giving us better control over mutating the form state, especially when handling errors.

![Modal](https://github.com/user-attachments/assets/f2235a32-3eef-4e27-9660-27ccbdc0879d)

Finally, we leverage [styled-components](https://styled-components.com/) to theme our page. We utilize `createGlobalStyle` to reset the default HTML styling. We perform all our CSS through this library, which makes composition extremely intuitive with its syntax.

Notably, we do not rely on a component library. While these libraries are great for scaffolding quick prototype applications, they are often bloated (even with tree-shaking), prioritize style over accessibility, and can be extremely difficult to eject once a project grows. This last point is especially pertinent since large companies often have a branding design language to follow. Custom branding frequently clashes with the predefined styles of component libraries, resulting in unsightly style overrides. It is often better to build up from the core HTML elements to mitigate this.

# Performance

![Performance](https://github.com/user-attachments/assets/c89bbca4-63e1-4da2-b150-9120f59eb8c9)

Performance metrics are tested against [PageSpeed Insights](https://pagespeed.web.dev/). We optimize for performance by preloading critical assets and using modern formats. For example, the cover image is compressed in `.webp` format from the original full-size `.png` format. We also self-host our chosen font instead of relying on a third-party service like Google Fonts to reduce latency.

Additionally, the landing page relies on a small set of libraries, with a strong preference for native HTML semantic elements and CSS instead of JavaScript. By not including large libraries, such as component libraries, we keep our bundle size small.

# Testing

We perform a smoke test on the following browsers, and they render well:

- Chrome 134.0.6998.36
- Microsoft Edge 134.0.3124.51
- Mozilla Firefox 128.8.0esr

Additionally, we tested the site on different dynamic viewports, and it does not clip on smaller screens.

For testing, we use [React Testing Library](https://testing-library.com/). Run the tests by invoking `yarn test`.

These tests are designed to mimic real-world usage by rendering the application to a DOM. We then test for all states by invoking certain user actions on the modal and form fields.

# Deployment

The built site is deployed on [Cloudflare Pages](https://pages.cloudflare.com/). It is free and works well with Cloudflare's distribution of edge computing to serve the page.
