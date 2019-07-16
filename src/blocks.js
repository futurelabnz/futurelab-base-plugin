/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

// regist block
import './blocks/image-text/block.js';
import './blocks/slider2/block.js';
import './blocks/social/block.js';
import './blocks/layout-container/block.js';
// import './blocks/my-team/block.js';
// import './blocks/custom-post-type/block.js';
import './blocks/my-team-post-type/block.js';
import './blocks/gallery/block.js';
import './blocks/content-carousel/block.js';
import './blocks/content-carousel-item/block.js';
import './blocks/latest-news/index.js';
// import './blocks/cover-image/block.js';

// // flex grid
// import './blocks/flex-grid1/block.js';
// import './blocks/flex-grid1/components/fl-column.js';

// Hank rebuild content carousel
import './blocks/content-carousel-dev/block.js';
import './blocks/content-carousel-dev/components/content-carousel-item/block';
import './blocks/content-carousel-dev/components/slide/index';

// regist plugins
// import './plugins/defaultLayout/index.js';

// regist extend style
import './extend-styles/block-styles.js';
