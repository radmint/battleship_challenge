let url = '/ships';

fetch(url)
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });