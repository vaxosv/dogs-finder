
$(document).on('click','.del',function(e) {
    let id = $(this).attr('data-id');
    let obj = {id: id}
    axios.post('/dell', obj)
      .then(function (response) {
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
});