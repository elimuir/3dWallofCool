﻿/** Created by Eli Muir (Synapse LLC)*	http://www.synapse.com*	http://wallofcool.synapse.com*	* Version 1.0*	Date Changed: 07/29/2010*/package org.synapse {			/* Events Class */	import flash.events.Event;	public class ImageEvent extends Event{				static public const CLICK:String = "click";		static public const ZOOM_IN:String = "zoomin";		static public const ZOOM_OUT:String = "zoomout";		static public const MOVE_RIGHT:String = "moveright";		static public const MOVE_LEFT:String = "moveleft";				static public const WALL_ZOOMING:String = "wallzooming";				static public const THUMBIMAGE_REFLECT:String = "reflect";				static public const IMAGE_LARGE_COMPLETE:String = "image_large_complete";		static public const IMAGE_LARGE_PROGRESS:String = "image_large_progress";		static public const IMAGE_LARGE_MOUSEOVER:String = "image_large_mouseover";		static public const IMAGE_LARGE_MOUSEOUT:String = "image_large_mouseout";		static public const IMAGE_LARGE_CLICK:String = "image_large_click";				static public const IMAGE_SMALL_COMPLETE:String = "image_small_complete";		static public const IMAGE_SMALL_PROGRESS:String = "image_small_progress";		static public const IMAGE_SMALL_MOUSEOVER:String = "image_small_mouseover";		static public const IMAGE_SMALL_MOUSEOUT:String = "image_small_mouseout";		static public const IMAGE_SMALL_CLICK:String = "image_small_click";				public function ImageEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false){			super(type, bubbles, cancelable);		}			}}