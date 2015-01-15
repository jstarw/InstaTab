var key = '8c78771934d3245c13a7ca25966549fa';
var secret = '17e2425c2d5ec462';
var endpoint = 'https://api.flickr.com/services/rest/?';
var  searchOnFlickr_= endpoint +
  'method=flickr.interestingness.getList&' +
  'api_key=' + key + '&' +
  'extras=url_k&' +
  'format=json';
var counter = 0;
var xhr = new XMLHttpRequest();
var url = getPhoto();
document.onload = check();

function check() {
  if (counter == url.length-1) {
    url = getPhoto();
    counter = 0;
  }
  $('body').css("background-image", "url(" + url[Math.floor(Math.random()*url.length)] + ")");
  counter++;
}

function getPhoto() {
  xhr.open("GET", searchOnFlickr_, false);
  xhr.send();
  var photoArr = jsonParse(xhr.responseText);
  //console.log(photoArr);
  var url = populate(photoArr);
  console.log(Math.random());
  return url;
}

function randomUrl(url) {
  counter++;
  return url[Math.floor(Math.random()*url.length)];
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
  for (var i=0; i<len-1; i++) {
    if (typeof arr[i].url_k === 'undefined') {
      continue;
    }
    else {
      urlArr.push(arr[i].url_k);   
    }
    // urlArr.push('https://farm'+ arr[i].farm + '.staticflickr.com/'+ arr[i].server + '/' + arr[i].id + 
    // '_' + arr[i].secret + '_o.jpg');
  }
  //console.log(urlArr);
  return urlArr;
}