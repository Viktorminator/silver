$(window).ready ->
  revapi = jQuery('.tp-banner').revolution(
    delay: 15000
    startwidth: 1164
    startheight: 517
    hideThumbs: 10
    fullWidth: 'off'
    fullScreen: 'off'
    fullScreenOffsetContainer: '')

  $('.main-menu__dropdownlink').click (e) ->
    e.preventDefault()
    $(this).siblings('.main-menu__dropdown').toggle()
    return
  $('.main-menu__item--active').siblings('.main-menu__dropdownlink').css({borderBottom: '4px solid #bfaa64'})
  $('.header__menu__user--login').click (e) ->
    e.preventDefault()
    $('.header__menu__login').toggle()
    return

# ---
# generated by js2coffee 2.0.1
