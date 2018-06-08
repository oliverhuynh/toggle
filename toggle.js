(function($, $GLOBAL) {
$.jftoggle = {
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
    $.jftoggle.toggle($elm, false);
  }),
  options: {},
  activeDropDown: function() {
    this.$dropdown.toggle();
    this.options.$elm.closest('tr').toggleClass('tr-active-dropdown');
  },
  create: function(options) {
    this.options = options;
    var it = $.extend(true, {}, this);
    it.attachItem();
    return it;
  },
  $dropdown: false,
  attachItem: function() {
    var $elm = this.options.$elm;
    this.$dropdown = $elm.siblings($elm.attr("data-dropdown"));
    this.$dropdown.addClass("toggle-links-dropdown");
    $elm.add(this.$dropdown).wrapAll('<span class="toggle-links-dropdown-wrapper" />');
    var t = this;
    this.options.$elm.click(function(e) {
      e.preventDefault();
      t.activeDropDown();
    });
  },
  attach: function(context){
    $('.toggle-links-1').once('ltoggle4').each(function() {
      $.jftoggle.create({
        $elm: $(this)
      });
    });
    var toggle = $.jftoggle.toggle;
    $('.view-og-ghp-ron .view-content .node .link, .view-board .view-content .node a.link, a.togglelink', context).once('ltoggle').click(function(e){
      e.preventDefault();
      var $elm = $(this).closest('td');
      toggle($elm, true);
    });
    $('.view-og-ghp-ron .view-content .node .link, .view-board .view-content .node .link').once('ltoggle2').each(function(){
      var $links = $(this).closest('.node').find('div.links ul.links');
      $links.append('<li><a href="' + $(this).attr('href') + '">'+ Drupal.t('View full') +'</a></li>');
    });
    $('.toggle-links-2').once('ltoggle5').click(this.toggleClick);
  }
};
})(jQuery, jQueryLatest);
