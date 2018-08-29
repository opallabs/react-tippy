# React Tippy (opallabs)

Major changes:

- [tippy.js](https://atomiks.github.io/tippyjs/) is now a true dependency (rather than a full copy of the source code)
  - Requires `tippy.js@2.x`, `react@16.x`
  - See [tippy.js docs](https://atomiks.github.io/tippyjs/#all-options) for the list of all props/options
- `html` prop has been renamed to `content` (can be a function or React element); React Portal is used behind the scene to render the tooltip's content
