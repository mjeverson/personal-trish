<?php

/*
	oEmbed Module
	Made by: Semplicelabs
*/

if($this->edit_mode) {
	
	// edit head
	$this->edit_head($values);
	
	if(!$values['in_column'] && $this->edit_mode !== 'single-edit') {
		// options head
		echo '<div class="row"><div class="span12 options">';
	} else {
		echo '<div class="options">';
	}
	
	// media type array
	$media_type = array(
		'video' => 'Video',
		'other' => 'Other'
	);
	
	// options
	
	$this->get_option('text', 'oEmbed Link (<a href="https://codex.wordpress.org/Embeds#Okay.2C_So_What_Sites_Can_I_Embed_From.3F" target="_blank">Supported Sites</a>)', 'oembed', 'https://www.youtube.com/watch?v=TwaMFVfXPwA', '', $values);
	
	// media type
	$this->get_option('select', 'Media Type', 'media_type', 'video', $media_type, $values);
	
	echo '<div class="clear"></div>';
	
	// close options
	if($values['content_type'] !== 'column-content-oembed') {
		echo '</div></div>';
	} else {
		echo '</div>';
	}
	
	// edit foot
	$this->edit_foot($values);
		
} else {

	$this->view_head($values);
	
	// responsive class
	$responsive_class 		= false;
	$responsive_class_nc 	= false;
	
	if($values['options']['media_type'] === 'video') {
		$responsive_class = 'responsive-video';
		$responsive_class_nc = ' class="responsive-video"';
	}
	
	if($values['has_container']) {
		$e = '<div class="span12 ' . $responsive_class . '">';
	} else {
		$e = '<div' . $responsive_class_nc . '>';
	}
	
	// get the audio url
	$url = $values['options']['oembed'];

	//$htmlcode = wp_oembed_get($url);
	
	$e .= '<div class="oembed-edit"><div class="is-oembed"></div></div>';
	$e .= '<div class="oembed-content">[embed]' . $url . '[/embed]</div>';
	
	$e .= '</div>';
	
	echo $e;
	
	// cs footer
	$this->view_foot($values);

}
