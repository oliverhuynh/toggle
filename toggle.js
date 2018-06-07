(function($, $GLOBAL) {
var toggleNode = {
  toggle: function($elm, state) {
    if (state == $elm.hasClass('active')) {
      return ;
    }
    $elm.find('div.content').toggle();

    // Toggle its td as well
    $elm.toggleAttr('colspan', 12);
    $elm.toggleClass('active').siblings('td').toggleClass('sib-td-active').parent('tr').toggleClass('tr-active');
    $elm.closest('table').trigger({
        type: 'node_show',
        cell: $elm,
        active: $elm.hasClass('active')
    });
  },
  toggleClick: $.debounce(1000,true, function(e) {
    e.preventDefault();
    var $elm = $(this).closest('td');
    toggleNode.toggle($elm, false);
  }),
  activeDropDown: $.debounce(1000,true, function(e) {
    e.preventDefault();
    $(this).siblings('.links').toggle();
    $(this).closest('tr').toggleClass('tr-active-dropdown');
  }),
  attach: function(context){
    var toggle = toggleNode.toggle;
    $('.view-og-ghp-ron .view-content .node .link, .view-board .view-content .node a.link, a.togglelink', context).once('ltoggle').click(function(e){
      e.preventDefault();
      var $elm = $(this).closest('td');
      toggle($elm, true);
    });
    $('.view-og-ghp-ron .view-content .node .link, .view-board .view-content .node .link').once('ltoggle2').each(function(){
      var $links = $(this).closest('.node').find('div.links ul.links');
      $links.append('<li><a href="' + $(this).attr('href') + '">'+ Drupal.t('View full') +'</a></li>');
    });
    $(".views-field-nodefield div.links").once('ltoggle3').before('<a href="#" id="toggle-links-2" class="toggle-links-2 toggle-links button ui-link"><i class="fa fa-toggle-off"></i></a><a href="#" id="toggle-links" class="toggle-links-1 toggle-links button">+</a>');
    $('.toggle-links-1').once('ltoggle4').click(toggleNode.activeDropDown);
    $('.toggle-links-2').once('ltoggle5').click(toggleNode.toggleClick);
  }
};


Drupal.behaviors.toggleNode = toggleNode.attach;
})(jQuery, jQueryLatest);
