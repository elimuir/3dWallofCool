/* JQuery Carousel
	Copyright (c) 2009 Eli Muir - Translucent Nine
*/

	
	/*
	*	Create carousel object
		- id (required)
		- singleSlideWidth (required)
	*/
function carousel(id, file, singleSlideWidth, transitionSpeed, scrollNum, visibleNum, numRows, viewSlide ) {
	
	//validate arguments passed into variable
	if(!id){return false}else{var carousel = id};				//return false if no id
	if(!file){return false}else{var file = file};
	if(!singleSlideWidth){return false};	//return false if no slide width specified
	if(!transitionSpeed){transitionSpeed = 750};	//set default if not specified
	if(!scrollNum){scrollNum = 5};	//set default if not specified
	if(!viewSlide){viewSlide = 0};	
	if(!numRows){numRows = 3};	
	if(!visibleNum){visibleNum = 3};
	var currentThumb = Number();
	var currCarouselPos = Number(0);  				//Used to hold the slideset in view
	var slidesetsArray = new Array();
	var totalSlidesets;
	var totalThumbCount= Number(0);	//Construct name of carousel list items
	var currentThumb=0;
	var masterArray = new Array();	//Set url container array
	var urlArray = new Array();
	var imgArray = new Array();
	var loadcheck;
	var thmbnailHeight = Number(115);
	var carouselMove;
	var scrollBooster = Number(1.5);
	var scrollVal = Number(25);
	
	window.setTimeout(function(){
		if(jQuery('#'+id).length != 0) {
			jQuery('#'+id).html(createCarouselHTML());
			loadXML(file);
		}
	},1000);
	
	
		//Start carousel initiation process
	
	
	function loadXML(filename){
		$.ajax({
    	type: "GET",
    	url: filename,
   		dataType: "xml",
    	success: function(feed){
    		
    		totalThumbCount = jQuery(feed).find("item").size();
    		var cntCol=0;
    		var cntRow=0;
    		
    		jQuery(feed).find("item").each(function(index){
    		
    			cntRow = (index % numRows);				//Gets the current thumbnail column location
					cntCol = Math.floor(index / numRows);	//Gets the current thumbnail row location
    			
    			x_value = cntCol * singleSlideWidth;
					y_value = cntRow * thmbnailHeight;
    			//TotalCount
    			//ColumnCount
    			//RowCount
    			
    			
    			/* Note on XML Namespaces 
    			*  	.find("[nodeName=z:row]")	in Safari
    			*		.find("z\\:row") in Firefox
    			*  - http://stackoverflow.com/questions/853740/jquery-xml-parsing-with-namespaces
    			*/
    			
    			jQuery("#thumbs-container").append('<div class="thumbnail row'+cntRow+'" id="col'+cntCol+'row'+cntRow+'" style="left:'+x_value+'px;top:'+y_value+'px;"><a href="'+jQuery(this).find("link").text()+'"><img src="' +jQuery(this).find("[nodeName=media:thumbnail]").attr("url")+ '"/></a><div class="thumbnail-meta"><a href="'+jQuery(this).find("link").text()+'">'+ jQuery(this).find("title").text() +'</a></div></div>');
 	 			});
  
    		init();
    	}
  	});
	//init();
	}
		
		//Initiate carousel when created
	function init() {
		
		//jQuery('#thumb_clipwindow').width(singleSlideWidth * visibleNum);
			//Set default state of carousel
		jQuery('#'+carousel+' #btn-next').addClass("nextdisable");
		jQuery('#'+carousel+' #btn-prev').addClass("previousdisable");
		//jQuery('#'+carousel+'_status').html("No previews displayed");
		//jQuery('#'+carousel+'_loading').hide();
		totalThumbCount = jQuery('#'+carousel+' #thumbs-container .thumbnail');
		totalThumbCount = totalThumbCount.length;
		intNavBullets();
		fadeInThumb();
		mouseToolTip();
	}


	function mouseToolTip() {
		var mouseX = 0;
		var mouseY = 0;
		
		jQuery('#'+carousel +' #thumbs-container .thumbnail a img').mouseover(function(e){
			mouseX = e.pageX;
			mouseY = e.pageY;
			jQuery('.thumbnail-meta').css({display:'block',position:"absolute",left:mouseX,top:mouseY}).fadeIn(100);
		});
		
		jQuery('#'+carousel +' #thumbs-container .thumbnail a img').mouseout(function(){
			jQuery('.thumbnail-meta').fadeOut(100);
		});
		
	}

	function fadeInThumb(){

		jQuery('#'+carousel +' #thumbs-container img').each(function(){
			
			// fade in the thumbnail when finnished loading
			var rand = Math.random(1500);
			jQuery(this).css({display:'none', opacity:'1'}).fadeIn(rand); 
		});

		jQuery('#ngg-image-1').addClass("selected");
		jQuery('#ngg-image-1 img').css({opacity:'1'});
		
	}

	function loadImages(){
	
		jQuery('#'+carousel +' #thumbs-container .thumbnail').each(function(i){
		
				// create loader image            
			var _loader = new Image();
			
			// begin loader
			$(_loader).load(function () {
				
			});
		
		});
	
	}
	
		/*
		*	Initiate navigation bullets
		*/
	function intNavBullets() {
		
		jQuery('#'+carousel+' #btn-prev').unbind('click');
		jQuery('#'+carousel+' #btn-next').unbind('click');
		//jQuery('#'+carousel+' .thumbnail img').unbind('click');
		jQuery('#_bulletcontainer a').unbind('click');
		jQuery('#_bulletcontainer').html("");
			
			//Determine number of slideset by dividing total slides by scrollNum
		currCarouselPos = 0;	//Reset current Slideset
		//slidesetsArray = Array();
		totalCarouselWidth = calcCarouselWidth();  //totalSlidesets = Math.round(slideArray.length / scrollNum);
	
			
			//Assign Click handler for thumbnails
		/*jQuery('#'+carousel+' .carousel-thumbnail a').click(function(event){
			selectImage(event.target, carousel);
			return false;
		})
		jQuery('#'+carousel+' .carousel-thumbnail img')
			.mouseover(function(event){
				//alert("over:"+this);
				jQuery(event.target).fadeTo(250, 1);
			})
			.mouseout(function(event){
				
				//alert(jQuery(event.target).parent().parent());
				
				var _fadeTo = jQuery(event.target).parent().parent().is('.selected') ? '1' : '0.6'; 
				
				jQuery(event.target).fadeTo(250, _fadeTo);			   
			});
		*/
		
		jQuery('#'+carousel+' #btn-next').removeClass("nextdisable");
		jQuery('#'+carousel+' #btn-prev').removeClass("previousdisable");
				
			//assign click handler for previous button
		jQuery('#'+carousel+' #btn-prev').mousedown(function(){
				carouselMove = setInterval(scrollLeft, 250); 
				//switchThumb("prev");
		});
		jQuery('#'+carousel+' #btn-prev').mouseout(function(){
				clearInterval(carouselMove); 
				scrollBooster = 0;
		});
		jQuery('#'+carousel+' #btn-prev').mouseup(function(){
				clearInterval(carouselMove); 
				scrollBooster = 0;
		});
		
		
			//Assign click handler for next button
		jQuery('#'+carousel+' #btn-next').mousedown(function(){
			carouselMove = setInterval(scrollRight, 250);
			//switchThumb("next")
		});
		jQuery('#'+carousel+' #btn-next').mouseout(function(){
				clearInterval(carouselMove);
				scrollBooster = 0;
		});
		jQuery('#'+carousel+' #btn-next').mouseup(function(){
				clearInterval(carouselMove);
				scrollBooster = 0;
		});
		
		updateNavButtons();
	}
	
	
		//Update carousel navigation buttons & indicator
	function updateNavButtons() {
		//alert(currSlideSet +","+ totalSlidesets);
		/*if(totalSlidesets <= 1) {
			jQuery('#'+carousel+'_navbuttons').hide();
		} else {
			jQuery('#'+carousel+'_navbuttons').show();
		}*/
		
		if(currCarouselPos == 0) {
			jQuery('#'+carousel+' #btn-prev').addClass("previousdisable");
			//jQuery('#'+carousel+'_previousbutton').removeClass("previousbutton");
		} else {
			jQuery('#'+carousel+' #btn-prev').removeClass("previousdisable");
			//jQuery('#'+carousel+'_previousbutton').addClass("previousbutton");
		}
		
		if(currCarouselPos >= totalCarouselWidth) { 
			jQuery('#'+carousel+' #btn-next').addClass("nextdisable");
			//jQuery('#'+carousel+'_nextbutton').removeClass("nextbutton");
		} else {
			jQuery('#'+carousel+' #btn-next').removeClass("nextdisable");
			//jQuery('#'+carousel+'_nextbutton').addClass("nextbutton");
		}
		
		//jQuery('#'+carousel+'_navindicate').html((currentThumb+1) +' of '+ totalThumbCount);
		
	}
	
		/**
		* Calculate Carousel Width
		*
		* 	find width based on total thumbnail count divided by number of rows times single thumbnail width
		* 
		* @return carouselwidth in pixels
		*/ 
	function calcCarouselWidth(){
		var rowCount;
			//check if total count divides evenly with scrollnum and number of rows
		if (totalThumbCount % numRows == 0){
			rowCount = totalThumbCount / numRows;
			return rowCount * singleSlideWidth;
		} else {
				//If cannot divide evenly, then add value to allow proper rounding
			rowCount = Math.round(totalThumbCount / numRows + .5);
			return rowCount * singleSlideWidth;
		}
	}
	
	
	function scrollLeft(){
		if(currCarouselPos < 0){
			//jQuery('#'+carousel+' .imagecontainer').css("margin-left", currCarouselPos + (scrollVal*scrollBooster));
			//currCarouselPos = jQuery('#'+carousel+' .imagecontainer').css("margin-left");
			var newPos = (currCarouselPos + scrollVal);
			jQuery('#'+carousel+' .imagecontainer').css("margin-left", newPos+"px");
			currCarouselPos = newPos;
			//scrollVal = Math.round(scrollVal*scrollBooster);
			updateNavButtons();
		}
	}
	
	function scrollRight(){
		if(currCarouselPos > -totalCarouselWidth) {
		 
			var newPos = (currCarouselPos - scrollVal);
			jQuery('#'+carousel+' .imagecontainer').css("margin-left", newPos+"px");
			currCarouselPos = newPos;
			//scrollVal = Math.round(scrollVal*scrollBooster);		
			updateNavButtons();
		}
	}
	
	function moveCarousel(newPos) {
		jQuery('#'+carousel+' .imagecontainer').animate(
								{marginLeft:''+newPos+'px'});
								//{duration: ''+transitionSpeed+'', easing: 'easeInOutQuad'});
		updateNavButtons();
	}
	
}



function createCarouselHTML(){

	var output = "";
	output += '<div id="carousel-container" class="">';
	output += '<div id="thumb_clipwindow" class="_clipwindow">';
	output += '<ul id="thumbs-container" class="imagecontainer">';	
	output += '</ul>';
	output += '</div>';
	output += '<div id="_navbuttons" class="carouselnavbuttons">';
	output += '<div id="btn-prev" class="previousbutton"></div><div id="btn-next"  class="nextbutton"></div>';
	output += '</div></div>';
	output += '<div class="thumbnail-meta"></div>';
	return output;
}


function searchEditorField(regexp, lookfor) {
	
		var resultArray = Array();	//Set container for matched results
		
		
			//Get FCKeditor content
		var oEditor = FCKeditorAPI.GetInstance('oFCK_1');	//Get FCK object on page
		var strFCKEditorHTML = oEditor.GetHTML();	//Get HTML from FCK editor
		var oDOM = oEditor.EditorDocument;
		var strFCKEditorText = "";
				
		if (document.all){	
			// If I.E.
			strFCKEditorText = oDOM.body.innerText;
		} else {
			//All other browsers
			var r = oDOM.createRange();
			r.selectNodeContents(oDOM.body);
			strFCKEditorText = r.toString();
		} 
		
			//Check FCK HTML for <a href tags>
		if(strFCKEditorHTML) {
			
			var linkArray;
			switch(lookfor){
				case "a":
					linkArray = parseHTML(strFCKEditorHTML, "a");	//return array of all <a href> tags
				break;
				
				case "img":
					linkArray = parseHTML(strFCKEditorHTML, "img");
				break;
				
				case "embed":
					linkArray = parseHTML(strFCKEditorHTML, "embed");
				break;
			}
			//var imgArray = parseHTML(strFCKEditorHTML, "img");	//return array of all <a href> tags
			//jQuery.merge(linkArray, imgArray);
			
			//var tmpArray = strFCKEditorText.split(" ");
			//alert(tmpArray);
			
			jQuery.each(linkArray, function(i,word) {
				resultArray.push(word);
			});
			
		}
			
			//Check FCK text for URLs
		if(strFCKEditorText) {
			
			var splitregex = /\s|<\/p>/;
			var txtArray = strFCKEditorText.split(splitregex);
			//alert(txtArray.length);
			jQuery.each(txtArray, function(i,word) {
					if(word.match(regexp)) {
						resultArray.push(word);
					}
			});
		}
		
		

				

		
		return resultArray;
		
}


	/* 
	*	Handle highlighting image selected by user
	*/
function selectImage(e, carousel) {
	jQuery(e).parent().parent().parent().children().removeClass("selected");	//Remove previous selected image with class name
	jQuery(e).parent().parent().addClass("selected");	//Add selected class name to image
	jQuery(e).parent().parent().parent().children().not('.selected').children().children().fadeTo(250, "0.6");
	
	//jQuery(e).parent().fadeIn(250);
	var url = jQuery(e).parent().attr("href");
	var imgId = jQuery(e).attr("picid");
	
	
		jQuery.get(ngg_ajax.path + "nggajax.php", {pid: imgId, type: "single"}, function (data) {
			
				//Fade out preview window 
			jQuery('#preview-window').fadeOut(250, function(){
			
				//After fadeout finished, set new image and fade in
				jQuery('#preview-window')
					.html(data)
					.fadeIn(500);
			});
		});
	
	
	//jQuery('#'+carousel+' #preview-window').html('<img src='+url+' height="300" width="300" />');
	//alert(jQuery(e).attr("src"));	//Get source url of image to return
	return false;
}


	/*
	*	Search HTML for all <A> tags and return their href value
	*/
function parseHTML(html, tag) {
	var imgArray = Array();
	jQuery(html).find(tag).each(function() {
		switch(tag){
		 	case "a":
				imgArray.push(jQuery(this).attr("href"));
			break;
			
			case "img":
				imgArray.push(jQuery(this).attr("src"));
			break;
			
			case "embed":
				imgArray.push(jQuery(this).attr("src"));
			break;
			
			default:
				imgArray.push(jQuery(this));
			break;
		}
	});

	return imgArray;
}


	//Adds TrimTo to string objects
	// @len :: Number of characters to reduce the string to.
	// @atEnd :: Blank, or false to work at beginning of string, true to work at end of string.
String.prototype.trimTo = function(len, atEnd){
   var rex = new RegExp( (atEnd ? ('^.*(.{' + len + '})jQuery') : ('^(.{' + len + '}).*jQuery')), 'gim');
   return this.replace(rex, 'jQuery1');
}