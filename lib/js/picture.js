//Key: 8c78771934d3245c13a7ca25966549fa
//Secret: 17e2425c2d5ec462

var  searchOnFlickr_= 'https://api.flickr.com/services/rest/?' +
  'method=flickr.photos.search&' +
  'api_key=813134bd29001c613d88e73203cc3719&' +
  'tags=dogs&'+
  'format=json';

var payload = {
  method: 'flickr.photos.search',
  api_key: '56cafe818f54df1aefc4cf7c6eea5cb8',
  text: 'dog',
}

// var endpoint = 'https://api.flickr.com/services';
// var xhr = new XMLHttpRequest();

// xhr.open("GET", searchOnFlickr_, false);
// xhr.send();
// console.log(xhr.responseText);

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

$.get('https://api.flickr.com/services', payload, function(data) {
  console.log(data);
}, 'jsonp' );

function populate(e) {
	var length = e.length;
	console.log(length);
}

// console.log(xhr.status);
// console.log(xhr.statusText);
// console.log(document.getElementById("test"));
