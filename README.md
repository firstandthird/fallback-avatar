# Fallback Avatar

Small module to generate an SVG that you can serve inlined for images so you always offer a default avatar for your user.

## Usage

```javascript
  const fallbackAvatar = require('fallback-avatar');

  fallbackAvatar.getSVG('a');
  fallbackAvatar.getDataSVG('l'); // Data URI string for direct image usage.
```