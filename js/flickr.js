//
//General variables
var sApiKey = "cd10999eff845a2d8c02857358b73b4f";
var aGallery = [];
var savedGallery = [];
var currentImg;

//
//Query flickr by tag and fill up gallery
function queryFlickr(tag)
{
	downloadPage("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + sApiKey + "&tags=" + tag + "&format=json&per_page=150");
}

//
//Downloads the string form passed url
//In this demo we'll download the flickr json
function downloadPage(url)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Connection", "close");
	
	xmlHttp.onreadystatechange = function() 
	{
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200) 
		{
			eval("(" + xmlHttp.responseText + ")");
		}
	}
	
	xmlHttp.send();
}

//
//cb for json call
function jsonFlickrApi (response) 
{
	var galleryDiv = document.getElementById("rg-gallery");
	galleryDiv.innerHTML = "";
	savedGallery = [];
	
	var addToGallaryButton = document.getElementById("addGallery");
	addToGallaryButton.innerText = "Add to gallery";
	
	var photoArr = response.photos.photo;
	for (var i in photoArr)
	{
		var imgurl = "https://farm" + photoArr[i].farm + ".staticflickr.com/" + photoArr[i].server + "/" + photoArr[i].id + "_" + photoArr[i].secret + ".jpg";
		
		var img = document.createElement("img");
		img.setAttribute("src", imgurl);
		img.setAttribute("alt", photoArr[i].title);
		img.setAttribute("class", "rg-img");
		
		var link = document.createElement("a");
		link.setAttribute("onclick", "popup('popUpDiv', '" + imgurl + "')");
		link.appendChild(img);
		
		galleryDiv.appendChild(link);
	}
}

//
//Toggles the pop-up div
function toggle(div_id, imgurl) 
{
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) 
	{	
		el.style.display = 'block';
		if(typeof imgurl !== "undefined")
		{
			var img = document.createElement("img");
			img.src = imgurl;
			currentImg = img;
			
			el.style.background = "url('" + imgurl + "') no-repeat center";
		}
	}
	else {el.style.display = 'none';}
}

//
//Sets the popup div
function popup(windowname, imgurl) 
{
	toggle('blanket');
	toggle(windowname, imgurl);		
}

//
//Saves the current image to gallery array
function saveToGallery()
{
	savedGallery.push(currentImg);
}

//
//Views the saved images in gallery
function viewGallery()
{
	var addToGallaryButton = document.getElementById("addGallery");
	addToGallaryButton.innerText = "";
	
	var galleryDiv = document.getElementById("rg-gallery");
	galleryDiv.innerHTML = "";
	for(var i in savedGallery)
	{
		var img = savedGallery[i];
		img.setAttribute("class", "rg-img");
		
		var link = document.createElement("a");
		link.setAttribute("onclick", "popup('popUpDiv', '" + img.src + "')");
		link.appendChild(img);
		
		galleryDiv.appendChild(link);
	}
}