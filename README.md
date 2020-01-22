# Futurelab base plugin
Futurelab blocks to build websites.

# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 13-01-2020

### Added
- Changelog in README
- layout switcher

### Fixed
- Narrator screen reader read first slider two time when infinity loop ( moved the fix code from base plugin to base theme )
- layout-container has max-width of 1600, changed to 7680
- slider style fix
- Image text block style fix

### Removed
- padding-left and padding-right in alignwide class
- removed swiper.js and swiper.css enqueue in slider block in plugin, and move enqueue to theme to avoid duplicated enqueue swiper js and css.
