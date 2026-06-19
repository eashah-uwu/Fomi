# Fomi Frontend Assessment

A responsive AI Content Generation interface built with Next.js as part of the Tarum Frontend Developer Technical Assessment.

## Live Demo

**Vercel Deployment:**  
https://YOUR-VERCEL-LINK.vercel.app

---

## Design References

### Original Assessment Design

**Provided Mockup:**  
[FIGMA_OR_ASSESSMENT_LINK]

### Bonus Creative Design

As part of the optional bonus submission, a second version was created with an original creative direction while maintaining the core AI image generation workflow.

**Figma Design:**  
[FIGMA_LINK_HERE]

**Bonus Deployment:**  
https://YOUR-BONUS-VERCEL-LINK.vercel.app

---

## Features

### Core Requirements

- Responsive implementation across mobile, tablet, desktop, and large screens
- Reusable component architecture
- Next.js App Router
- Tailwind CSS styling
- Mock API for generated content
- Optimized image rendering using Next.js Image
- Semantic HTML and accessibility considerations

### Additional Enhancements

- Prompt history system
- Clickable history items
- Previous generations remain accessible
- Hover interactions
- Loading states
- Smooth transitions and micro-interactions
- Responsive image gallery
- Dark mode support (if implemented)

---

## Prompt History Behavior

Unlike a simple single-generation interface, this implementation preserves previous prompts and generated content.

Users can:

- Submit multiple prompts
- Browse previous generations
- Click history items
- Restore previous generated results
- Continue generating without losing context

---

## Tech Stack

### Framework

- Next.js

### Language

- JavaScript

### Styling

- Tailwind CSS
- CSS Modules

### Tooling

- ESLint
- Git
- GitHub
- Vercel

---

## Project Structure

```text
src/
├── app/
├── components/
├── hooks/
├── lib/
├── data/
├── styles/
└── public/
