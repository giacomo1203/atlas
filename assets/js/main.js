/*global $*/

$(function () {
    'use strict';
    var companies;
    var ubigeo;
    var dCom = $.Deferred();
    var dUbi = $.Deferred();
    var $region;
    var $provincia;
    var $company;
    var $suggest;
    var $ruc;
    var $block1;
    var $checkProccess;
    var $btnStart;

    var populateRegion = function () {
        var tempHtml = [];
        var regiones = ubigeo.filter(function (entry) {
            return entry.provincia === '00' && entry.distrito === '00';
        });
        regiones.forEach(function (item) {
            tempHtml.push("<option value='" + item.departamento + "'>" + item.nombre + "</option>");
        });
        $region.html('<option value="" disabled selected>Departamento</option>' + tempHtml.join(''));
        tempHtml = [];
    };

    var populateProvincia = function (event) {
        var reg = $(event.currentTarget).val();
        var tempHtml = [];
        var provincias = ubigeo.filter(function (entry) {
            return entry.departamento === reg && entry.provincia !== '00' && entry.distrito === '00';
        });
        provincias.forEach(function (item) {
            tempHtml.push("<option value='" + item.provincia + "'>" + item.nombre + "</option>");
        });
        $provincia.html('<option value="" disabled selected>Provincia</option>' + tempHtml.join(''));
        tempHtml = [];
    };

    var filterCompanies = function (q) {
        return companies.filter(function (elem) {
            return Object.keys(elem).some(function () {
                return elem.empresa.toLowerCase().indexOf(q) !== -1;
            });
        });
    };

    var selectedOption = function (event) {
        var $elem = $(event.currentTarget);
        $ruc.val($elem.attr('data-ruc'));
        $company.val($elem.text());
    };

    var typingInput = function (event) {
        var q = $(event.currentTarget).val().toLowerCase();
        var result = [];
        var tempHtml = [];
        if (q.length > 1) {
            result = filterCompanies(q);
        }

        if (result.length !== 0) {
            result.forEach(function (item) {
                tempHtml.push("<a href='#!'' data-ruc='" + item.ruc + "'' class='collection-item'>" + item.empresa + "</a>");
            });
        } else {
            tempHtml.push("<a class='collection-item'> Sin resultados </a>");
        }

        $suggest.html(tempHtml.join(''));
        $suggest.slideDown();
        $('a[data-ruc]').on('click', selectedOption);

        //tempHtml = [];
    };

    var loadUbigeo = function () {
        $.getJSON("assets/data/ubigeo.json", function (data) {
            dUbi.resolve(data);
            populateRegion();
        });
    };

    var cleanCompanies = function (json) {
        var ids = [],
            clean = [];

        $.each(json, function (index, value) {
            if ($.inArray(value.ruc, ids) === -1) {
                ids.push(value.ruc);
                clean.push(value);
            }
        });

        return clean;
    };

    var loadCompanies = function () {
        $.getJSON("assets/data/companies.json", function (data) {
            dCom.resolve(data);
        });
    };

    var hideSuggest = function () {
        $suggest.slideUp();
    };

    var showSuggest = function () {
        if ($suggest.html() !== '') {
            $suggest.slideDown();
        }
    };

    var toggleBlock = function (event) {
        var $elem = $(event.currentTarget);

        if ($elem.is(":checked")) {
            $block1.slideDown(500);
            $('.alert.alert-info').hide();
        } else {
            $block1.slideUp(500);
            if ($('.alert.alert-info').length > 0) {
                $('.alert.alert-info').show();
            } else {
                $('<div class="alert alert-info">' +
                        '<div class="container">' +
                        '    <div class="alert-icon">' +
                        '        <i class="material-icons">info_outline</i>' +
                        '    </div>' +
                        '    <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '        <span aria-hidden="true"><i class="material-icons">clear</i></span>' +
                        '    </button>' +
                        '    <b>Nota:</b> Se omitirá las tres primeras preguntas, debido a que el procedimiento no se encuentra en la VUCE.' +
                        '</div>' +
                        '</div>').insertAfter($block1);
            }
        }
    };

    var scrollInit = function () {
        $("html, body").stop().animate({scrollTop: $('#formSurvey').offset().top - 80}, 500, 'swing');
    };

    var bind = function () {
        $region.on('change', populateProvincia);
        $company.on('keyup', typingInput);
        $company.on('blur', hideSuggest);
        $company.on('focus', showSuggest);
        $checkProccess.on('change', toggleBlock);
        $btnStart.on('click', scrollInit);
    };

    var cache = function () {
        $region = $('#dep');
        $provincia = $('#prov');
        $company = $('#company');
        $ruc = $('#ruc');
        $suggest = $('#suggest');
        $block1 = $('#block1');
        $checkProccess = $('#checkProccess');
        $btnStart = $('#btnStart');
    };

    var setup = function () {
        loadUbigeo();
        loadCompanies();

        $.when(dCom, dUbi).done(function (_c, _u) {
            companies = cleanCompanies(_c);
            ubigeo = _u;
        });
    };

    var init = function () {
        cache();
        bind();
        setup();
    };

    init();
});