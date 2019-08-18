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

// common styles
import './style.scss';

// regist block
import './blocks/image-text/block.js';
import './blocks/slider2/block.js';
import './blocks/social/block.js';
import './blocks/layout-container/block.js';
import './blocks/my-team-post-type/block.js';
import './blocks/gallery/block.js';
import './blocks/latest-news/index.js';
// Hank rebuild content carousel
import './blocks/content-carousel/block.js';
import './blocks/content-carousel/components/content-carousel-item/block';
import './blocks/content-carousel/components/slide/index';

// regist plugins
// import './plugins/defaultLayout/index.js';

// regist extend style
import './extend-styles/block-styles.js';
