'use strict';

/* jasmine specs for services go here */


describe('directives', function() {
    var scope, elem;
	beforeEach(module('angular-client-side-auth'));
	

	describe('accessLevel', function() {		
        beforeEach(function() {
		
		    var mockAuth = {
				user :{ name:'', role:{bitMask: 1, title: "public"}},
				authorize:function(accessLevel, role){
					return accessLevel.bitMask & role.bitMask;
				}
			}
			
			var accessLevels = {
				"public":{"bitMask":7,"title":"*"},
				"anon":{"bitMask":1,"title":"public"},
				"user":{"bitMask":6,"title":"admin"},//user & admin
				"admin":{"bitMask":4,"title":"admin"},
				"useronly":{"bitMask":2,"title":"user"}
			};
							
		    module(function($provide) {
			    $provide.value('Auth', mockAuth);
				$provide.value('accessLevels', accessLevels);				
		    });
		})
	
		it('when user is public and access is public - the menu must be visible',inject(function($compile, $rootScope, accessLevels){
		

		    scope = $rootScope.$new();
			scope.accessLevels = accessLevels;

		    var elem = $compile("<li data-access-level='accessLevels.anon'>some text here</li>")(scope);
			
			//fire watch
			scope.$apply();
						
			expect(elem.css('display')).toEqual('');	
		}));
		
	
		it('when user is public and access is user - the menu must be hidden',inject(function($compile, $rootScope, accessLevels){		

		    scope = $rootScope.$new();
			scope.accessLevels = accessLevels;

		    var elem = $compile("<li data-access-level='accessLevels.user'>some text here</li>")(scope);
			
			//fire watch
			scope.$apply();
						
			expect(elem.css('display')).toEqual('none');	
		}))		
    });

	describe('activeNav', function() {
	    var scope, location, compile;
		beforeEach(inject(function($compile, $rootScope, $location) {
			scope = $rootScope.$new();
            location = $location
			compile = $compile;
		}));
		it('when location is same as "href" of link - the link must be decorated with "active" class',function(){
		    location.path('someurl');
		
		    var elem = compile("<li data-active-nav ><a href='http://server/someurl'>somelink</a></li>")(scope);
			
			//fire watch
			scope.$apply();            		
			expect(elem.hasClass('active')).toBe(true);
		});
		
		it('when location is different from "href" of link - the "active" class must be removed',function(){
		    location.path('some_different_url');
		    //initially  decorated with 'active'
		    var elem = compile("<li data-active-nav class='active'><a href='http://server/someurl'>somelink</a></li>")(scope);
			
			//fire watch
			scope.$apply();            		
			expect(elem.hasClass('active')).toBe(false);
		})		
	})

	
});
