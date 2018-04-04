/*global $*/

$(function () {
    'use strict';
    var companies = $.Deferred();
    var ubigeo = $.Deferred();
    var $region;
    var $provincia;
    var $company;

    var populateRegion = function () {
        var tempHtml = [];
        var regiones = ubigeo.filter(function (entry) {
            return entry.provincia === '00' && entry.distrito === '00';
        });
        regiones.forEach(function (item) {
            tempHtml.push("<option value='" + item.departamento + "'>" + item.nombre + "</option>");
        });
        $region.html('<option value="" disabled selected>Departamento</option>' + tempHtml.join(''));
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
    };

    var filterCompanies = function (event) {
        var q = $(event.currentTarget).val();
        return companies.filter(function (elem) {
            return Object.keys(elem).some(function (k) {
                return elem[k].indexOf(q) !== -1;
            });
        });
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

    var bind = function () {
        $region.on('change', populateProvincia);
        $company.on('keyUp', filterCompanies);
    };

    var cache = function () {
        $region = $('#dep');
        $provincia = $('#prov');
        $company = $('#company');
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