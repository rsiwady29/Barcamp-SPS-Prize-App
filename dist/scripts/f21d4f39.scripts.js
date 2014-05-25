"use strict";angular.module("barcampPrizeAppApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/tombola",{templateUrl:"views/tombola.html",controller:"TombolaController"}).otherwise({redirectTo:"/"})}]),angular.module("barcampPrizeAppApp").controller("MainController",["$scope","$modal","ParseService","RaffleUsersService","CodeService",function(a,b,c,d,e){a.alerts=[];var f=function(){var a={success:g,error:h};d.populateRaffleUsers(a)},g=function(b){a.raffleUsers=b,a.$apply()},h=function(a){alert(a)},i=function(b,c,d){a.alerts.push({msg:b,type:c}),a.$apply(),setTimeout(j,d)},j=function(){a.alerts=[],a.$apply()},k=function(c){if(void 0==c)return a.code="",void i("Codigo Invalido!","danger",4e3);if(1==c.get("Used"))return a.code="",i("Codigo ya ha sido utilizado!","danger",4e3),void a.$apply();b.open({templateUrl:"views/modalContent.html",controller:function(a,b,c,d){a.callbacks=d,a.RaffleUser={Name:void 0,Email:void 0};var e=function(){c.populateRaffleUsers(d),b.dismiss("cancel")},f=function(){b.dismiss("cancel")};a.guardar=function(){if(void 0!=a.RaffleUser.Name||void 0!=a.RaffleUser.Email){var b={success:e,error:f};c.AddRaffleUser(a.RaffleUser,b)}},a.cancelar=function(){b.dismiss("cancel")}},size:"lg",resolve:{callbacks:function(){return{success:g,error:h}}}});a.code="",c.set("Used",!0),e.MarkCodeAsUsed(c)},l=function(){};a.closeAlert=function(b){a.alerts.splice(b,1)},a.AddCode=function(){a.alerts=[];var b={success:k,error:l};e.CheckCode(a.code,b)},f()}]),angular.module("barcampPrizeAppApp").factory("ParseCredentialService",[function(){var a={},b="O7ZtOKoa3YC8jkArrRkabPdVUAK4qiFv88FegSYb",c="1MRYbsPz5STCBRrY23ZUHAoiHE75L9Za8Eekh76s";return a.getAppId=function(){return b},a.getJsKey=function(){return c},a}]),angular.module("barcampPrizeAppApp").service("ParseService",["ParseCredentialService",function(a){var b=a.getAppId(),c=a.getJsKey();Parse.initialize(b,c)}]),angular.module("barcampPrizeAppApp").factory("RaffleUsersService",[function(){var a={};return a.populateRaffleUsers=function(a){var b=Parse.Object.extend("RaffleUsers"),c=new Parse.Query(b);c.find({success:a.success,error:a.error})},a.AddRaffleUser=function(a,b){var c=Parse.Object.extend("RaffleUsers"),d=new c;d.set("Name",a.Name),d.set("Email",a.Email),d.save(null,{success:b.success,error:b.error})},a.FindRaffleUsers=function(a,b){var c=Parse.Object.extend("RaffleUsers"),d=new Parse.Query(c);d.equalTo("Name",a.attributes.Name),d.equalTo("Email",a.attributes.Email),d.first({success:b.success,error:b.error})},a.RemoveRaffleUser=function(a,b){a.destroy({success:b.success,error:b.error})},a.AddRaffleWinner=function(a,b){var c=Parse.Object.extend("RaffleWinners"),d=new c;d.set("Name",a.Name),d.set("Email",a.Email),d.save(null,{success:b.success,error:b.error})},a}]),angular.module("barcampPrizeAppApp").factory("CodeService",[function(){var a={};return a.CheckCode=function(a,b){var c=Parse.Object.extend("Codes"),d=new Parse.Query(c);d.equalTo("Code",a),d.first({success:b.success,error:b.error})},a.MarkCodeAsUsed=function(a){a.save()},a}]),angular.module("barcampPrizeAppApp").controller("TombolaController",["$scope","$modal","ParseService","RaffleUsersService","CodeService",function(a,b,c,d){var e=function(a){return Math.floor(Math.random()*a)},f=function(){var a={success:g,error:h};d.populateRaffleUsers(a)},g=function(b){a.raffleUsers=b,a.$apply()},h=function(a){alert(a)},i=function(a){alert("Ganador: User: "+a.attributes.Name+" && Email: "+a.attributes.Email)},j=function(a){alert(a)},k=function(a){var b={success:i,error:j};d.AddRaffleWinner({Name:a.attributes.Name,Email:a.attributes.Email},b)},l=function(a){alert(a)},m=function(a){var b={success:k,error:l};d.RemoveRaffleUser(a,b)},n=function(a){alert(a)};a.escogerGanador=function(){if(0!=a.raffleUsers.length){var b=a.raffleUsers[e(a.raffleUsers.length)],c={success:m,error:n};d.FindRaffleUsers(b,c)}},f()}]);