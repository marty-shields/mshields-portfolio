$(function() {
  //get all of the links from the navbar and find the one that matchs with
  //the path name
  var links = $('.navbar-nav').find('a');
  links.each(function(index, el) {
    //split the path name by the /
    var array = window.location.pathname.split('/');
    //if we are in the uni sub folder then always set parent as active
    if(array[1] == 'uni')
    {
      //get the parent element and set class as active
      var uniParent = $('.navbar-nav')
        .find('a[href="/uni"]')
        .addClass('active');

      return;
    }
    //if we are in the uni sub folder then always set parent as active
    if(array[1] == 'projects')
    {
      //set the parent as active
      var projParent = $('.navbar-nav')
        .find('a[href="projects/index.html"]')
        .addClass('active');

      return;
    }

    if (el.pathname == window.location.pathname) {
      //set the class of the parent to active
      $(this).addClass('active');
      return;
    }
  });

  //this takes the parent and child element to generate the breadcrumbs
  function LoadBreadcrumbs(childElement, parentElement){
    $('#breadcrumbs').append('<li class="breadcrumb-item"><a href="'+
      parentElement[0].pathname+'">'+parentElement[0].innerHTML+'</a></li>'+
    '<li class="breadcrumb-item active">'+childElement.innerHTML+'</li>');
  }
});
