(function (global) {
  'use strict';

  var $formSurvey;
  
  function setLocalization() {
    /*
    * Translated default messages for the jQuery validation plugin.
    * Locale: ES (Spanish; Español)
    * Region: PE (Perú)
    */
    $.extend($.validator.messages, {
      required: "Este campo es obligatorio.",
      remote: "Por favor, llene este campo.",
      email: "Por favor, escriba un correo electrónico válido.",
      url: "Por favor, escriba una URL válida.",
      date: "Por favor, escriba una fecha válida.",
      number: "Por favor, escriba un número válido.",
      digits: "Por favor, escriba sólo dígitos.",
      equalTo: "Por favor, escriba el mismo valor de nuevo.",
      maxlength: $.validator.format( "Por favor, no escriba más de {0} caracteres." ),
      minlength: $.validator.format( "Por favor, no escriba menos de {0} caracteres." ),
      rangelength: $.validator.format( "Por favor, escriba un valor entre {0} y {1} caracteres." ),
      range: $.validator.format( "Por favor, escriba un valor entre {0} y {1}." ),
      max: $.validator.format( "Por favor, escriba un valor menor o igual a {0}." ),
      min: $.validator.format( "Por favor, escriba un valor mayor o igual a {0}." )
    });
  }

  function bootstrapSupport() {
    $.validator.setDefaults({
      highlight: function (element) {
        var $element = $(element);
        
        if (element.getAttribute('type') === 'radio') {
          $element.closest('.radio').parent().addClass('has-error');
        } else {
          $element.closest('.form-group').addClass('has-error');
        }
      },
      
      unhighlight: function (element) {
        var $element = $(element);

        if (element.getAttribute('type') === 'radio') {
          $element.closest('.radio').parent().removeClass('has-error');
        } else {
          $element.closest('.form-group').removeClass('has-error');
        }
      },
      
      errorElement: 'div',
      errorClass: 'text-danger',
      errorPlacement: function ($error, $element) {
        var $el;

        if ($element.attr('type') === 'radio') {
          // $element.closest('.form-group').append($error);
          $el = $element.closest('.radio').siblings('.radio:last');
          $error.insertAfter($el);
        } else if ($element.is('select')) {
          $error.insertAfter($element);
        } else {
          $el = $element.closest('.form-group');
          
          if ($el.length === 0) {
            $error.insertAfter($element);
          } else {
            $el.append($error);
          }
        }
      }
    });
  }
  
  function onClickCardDynamicRemove(event) {
    event.preventDefault();

    var $btn = $(event.currentTarget);
    var $row = $btn.closest('.row');
    $row.remove();
  }

  function onClickCardDynamicAdd(event) {
    event.preventDefault();

    var $btn = $(event.currentTarget);
    var $row = $btn.closest('.row');
    
    var canAdd = $row.find('.form-control').toArray()
      .map(function (el) { return el.value.trim().length > 0 })
      .reduce(function (a, b) { return a && b });

    if (canAdd) {
      var $rowNew = $row.clone();
      $rowNew.find('.btn-primary').removeClass('btn-primary').addClass('btn-secondary').text('Quitar');
      $row.parent().append($rowNew.clone());

      $row.find('.form-control').toArray().forEach(function (el) {
        el.value = '';
      });
    } else {
      $row.find('.form-control').filter(function () { return this.value.trim().length === 0 })[0].focus();
    }
  }

  function cardDynamicSetup() {
    $('.card-dynamic').each(function (i, element) {
      var $cardDynamic = $(element);
      $cardDynamic.on('click', '.btn-primary', onClickCardDynamicAdd);
      $cardDynamic.on('click', '.btn-secondary', onClickCardDynamicRemove);
    });
  }

  function dataDisableCheck($el) {
    console.log('[dataDisableCheck] $el', $el);
    var elDataDisable = $el.attr('data-disable');
    var elDataNoDisable = $el.attr('data-nodisable');
    
    if (elDataDisable) {
      $(elDataDisable).prop('disabled', true);
    } else if (elDataNoDisable) {
      $(elDataNoDisable).prop('disabled', false);
    }
  }

  function onClickDataDisable(event) {
    var $el = $(event.currentTarget);

    dataDisableCheck($el);
  }

  function dataDisable() {
    $('[data-disable],[data-nodisable]')
      .each(function(i, el) {
        var $el = $(el);

        if ($el.is('input[type="radio"]')) {
          $('input[name=' + $el.attr('name') + ']')
            .off('click', onClickDataDisable)
            .on('click', onClickDataDisable);
        }
      })
      .filter(':checked').each(function (i, el) {
        var $el = $(el);

        if ($el.is('input[type="radio"]')) {
          dataDisableCheck($(this));
        }
      });
  }

  function init() {
    cardDynamicSetup();
    dataDisable();

    setLocalization();
    bootstrapSupport();

    var $formSurvey = $("#formSurvey");
    // var $formControls = $form.find('input:not([type="hidden"]), select, textarea');

    var validationOptions = {
      submitHandler: function (form) {

        console.log('--->', $formSurvey.serialize());
        // form.submit();
        $formSurvey.submit(function(e) {
          e.preventDefault();
          $.ajax({
            type: "POST",
            url: "https://survey.duckduck.wyracocha.com",
            data: $formSurvey.serialize(),
            success: function(data) {
              console.log(data);
            }
          });
          return false;
        });
      }
    };

    // $formControls.toArray().forEach(function (formControl) {
    //   if (formControl.getAttribute('required') !== null) {
    //     console.log('formControl required', formControl.getAttribute('required'), formControl);
    //     validationOptions.rules[formControl.name] = { required: true };
    //   }
    // });

    // console.log(validationOptions);
    // Show Modal
    // $('#myModal').modal({backdrop: 'static', keyboard: false});
    
    // $form.validate(validationOptions);
    $formSurvey.validate(validationOptions);
  }

  init();
}(this));