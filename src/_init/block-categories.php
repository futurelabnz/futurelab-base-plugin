<?php
/**
 * Add Filter to add a block category
 */
function add_new_block_category($categories, $post)
{
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'fl-Blocks',
				'title' => __('FutureLab Blocks', 'fl-Blocks'),
			),
		)
	);
}

add_filter('block_categories', 'add_new_block_category', 10, 2);
