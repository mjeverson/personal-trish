<?php

// Re-define meta box path and URL
define( 'RWMB_URL', trailingslashit( get_stylesheet_directory_uri() . '/includes/meta-box' ) );
define( 'RWMB_DIR', trailingslashit( get_template_directory() . '/includes/meta-box' ) );

// Include the meta box script
require_once RWMB_DIR . 'meta-box.php';

// Include content editor meta boxes
require get_template_directory() . '/content-editor/meta_boxes.php';

// content editor ajax
if(is_admin()) {
	function semplice_ce_ajax() {
		if (isset($_REQUEST)) {
			// include content editor
			require get_template_directory() . '/content-editor/editor.php';
		}
		// stop script here after ajax request
		die();
	}
}

add_action( 'wp_ajax_semplice_ce_ajax', 'semplice_ce_ajax' );

// container styles
function container_styles($styles) {

	$css = '';

	if(!empty($styles['padding-top']) && $styles['padding-top'] !== '0px') {
		$css .= 'padding-top: ' . $styles['padding-top'] . ';';
	}
	if(!empty($styles['padding-bottom']) && $styles['padding-bottom'] !== '0px') {
		$css .= 'padding-bottom: ' . $styles['padding-bottom'] . ';';
	}
	if(!empty($styles['padding-right']) && $styles['padding-right'] !== '0px') {
		$css .= 'padding-right: ' . $styles['padding-right'] . ';';
	}
	if(!empty($styles['padding-left']) && $styles['padding-left'] !== '0px') {
		$css .= 'padding-left: ' . $styles['padding-left'] . ';';
	}
	if(!empty($styles['background-image'])) {			
		$css .= 'background-image: url(' . $styles['background-image'] . ');';
		$css .= 'background-repeat: ' . $styles['background-repeat'] . ';';
		if(!empty($styles['background-size']) && $styles['background-size'] === 'cover') {
			$css .= 'background-size: cover;';	
		} else if(!empty($styles['background-repeat']) && $styles['background-repeat'] !== 'no-repeat') {
			$css .= 'background-size: auto !important;';
		}
		if(!empty($styles['background-position'])) {
			$css .= 'background-position: ' . $styles['background-position'] . ';';
		} else {
			$css .= 'background-position: top center;';
		}
	}
	if(preg_match('/^#[a-f0-9]{6}$/i', $styles['background-color'])) {
		$has_color = true;
	} 
	if(!empty($has_color) && $has_color === true) {
		$css .= 'background-color: ' . $styles['background-color'] . ';';
	} else {
		$css .= 'background-color: transparent;';
	}
	
	// fwt border bottom
	if(!empty($styles['border-bottom'])) {
		$css .= 'border-color: ' . $styles['border-bottom'] . ' !important;';
	} 

	return $css;
}

?>