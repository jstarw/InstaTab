var key = '8c78771934d3245c13a7ca25966549fa';
var secret = '17e2425c2d5ec462';
var endpoint = 'https://api.flickr.com/services/rest/?';
var  searchOnFlickr_= endpoint +
  'method=flickr.interestingness.getList&' +
  'api_key=' + key + '&' +
  'extras=url_k&' +
  'format=json';var xhr = new XMLHttpRequest();
var counter = 0;
var date = new Date();
var photoArr = [];
var url = getPhoto();
var randomNumber = Math.floor(Math.random()*url.length);

window.onload = check();

$(document).ready(function() {
  $('#link').hover(function() {
  //   $(this).css("color", "red");
  // }, function() {
  //    $(this).css("color", "white");
  }).click(function() {
    getPhotoURL();
  });
  updateTime();
  setInterval(updateTime, 1000);
   
});

function updateTime() {
  date = new Date(date.getTime() + 1000);
  $('#time').html(function () {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      if (minutes<10) minutes = '0' + minutes;
      if (hours==0) hours = 12;
      else if (hours>12) hours = hours-12;
      return hours + ':' + minutes;
    });
}

function check() {
  if (counter == url.length-1) {
    url = getPhoto();
  }
  
  var img = new Image();
  img.onload = function() {
    $('#black-screen').fadeOut();
  }
  img.src = url[randomNumber];
  $('#background').css("background-image", "url(" + img.src + ")");


}

function getPhoto() {
  xhr.open("GET", searchOnFlickr_, false);
  xhr.send();
  photoArr = jsonParse(xhr.responseText);
  console.log(photoArr);
  var url = populate(photoArr);
  return url;
}

// var payload = {
//   method: 'flickr.photos.search',
//   api_key: '56cafe818f54df1aefc4cf7c6eea5cb8',
//   text: 'dog',
// }
// $.ajax({
//   type: "GET",
//   url: 'https://api.flickr.com/services',
//   data: payload,
//   success: function(data) {
//     console.log(data);
//     populate(data.photos.photo);
//   },
//   dataType: 'jsonp'
// })

function jsonParse(data) {
  var jsonData = data.substring(14, data.length-1);
  var obj = JSON.parse(jsonData);
  return obj.photos.photo;
}

function populate(arr) {
	var len = arr.length;
  var urlArr = [];
  for (var i=0; i<len; i++) {
    if (typeof arr[i].url_k === 'undefined') {
       // urlArr.push('https://farm'+ arr[i].farm + '.staticflickr.com/'+ arr[i].server + '/' + arr[i].id + 
       // '_' + arr[i].secret + '.jpg');
      arr.splice(i,1);
      len--;
      i--;
    }
    else {
      urlArr.push(arr[i].url_k);   
    }
    
  }
  return urlArr;
}

function getPhotoURL() {
  var link = 'https://www.flickr.com/photos/' + photoArr[randomNumber].owner + '/' 
    + photoArr[randomNumber].id + '/';
  $('#link').attr('href', link);
}