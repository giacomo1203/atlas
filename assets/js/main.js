/*global $*/

$(function () {
    'use strict';
    var companies = $.Deferred();
    var ubigeo = $.Deferred();
    var $region;
    var $provincia;
    var $company;
    var $suggest;
    var $ruc;

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
        var result;
        var tempHtml = [];
        if (q.length > 2) {
            result = filterCompanies(q);
        }

        if (result !== undefined) {
            result.forEach(function (item) {
                tempHtml.push("<a href='#!'' data-ruc='" + item.ruc + "'' class='collection-item'>" + item.empresa + '</a>');
            });
            $suggest.html(tempHtml.join(''));
            $suggest.slideDown();
            $('a[data-ruc]').on('click', selectedOption);
        } else {
            $suggest.slideUp();
        }

        tempHtml = [];
    };

    var loadUbigeo = function () {
        $.getJSON("assets/data/ubigeo.json", function (data) {
            ubigeo.resolve(data);
            populateRegion();
        });
    };

    var loadCompanies = function () {
        $.getJSON("assets/data/companies.json", function (data) {
            companies.resolve(data);
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

    var bind = function () {
        $region.on('change', populateProvincia);
        $company.on('keyup', typingInput);
        $company.on('blur', hideSuggest);
        $company.on('focus', showSuggest);
    };

    var cache = function () {
        $region = $('#dep');
        $provincia = $('#prov');
        $company = $('#company');
        $ruc = $('#ruc');
        $suggest = $('#suggest');
    };

    var setup = function () {
        loadUbigeo();
        loadCompanies();

        $.when(companies, ubigeo).done(function (_c, _u) {
            companies = _c;
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