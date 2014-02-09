'use strict';

/* jasmine specs for services go here */


describe('directives', function() {
    var scope, elem, $httpBackend, Auth;

    beforeEach(
        module('angular-client-side-auth')
    );

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        Auth = $injector.get('Auth');
    }));

    // On module load there will always be a stateChange event to the login state
    beforeEach(function() {
        $httpBackend.expectGET('login').respond();
        $httpBackend.flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('accessLevel', function() {
    
        it('when user is public and access is public - the menu must be visible',inject(function($compile, $rootScope){
        

            scope = $rootScope.$new();
            scope.accessLevels = routingConfig.accessLevels;

            var elem = $compile("<li data-access-level='accessLevels.anon'>some text here</li>")(scope);
            
            //fire watch
            scope.$apply();
                        
            expect(elem.css('display')).to.equal('');
        }));
        
    
        it('when user is public and access is user - the menu must be hidden',inject(function($compile, $rootScope){

            scope = $rootScope.$new();
            scope.accessLevels = routingConfig.accessLevels;

            var elem = $compile("<li data-access-level='accessLevels.user'>some text here</li>")(scope);
            
            //fire watch
            scope.$apply();
                        
            expect(elem.css('display')).to.equal('none');
        }))        
    });

    describe('activeNav', function() {
        var location, compile;

        beforeEach(inject(function($compile, $rootScope, $location) {
            scope = $rootScope.$new();
            location = $location
            compile = $compile;
        }));

        it('when location is same as "href" of link - the link must be decorated with "active" class',function(){
            location.path('register');
            $httpBackend.expectGET('register').respond();
            $httpBackend.flush();
        
            var elem = compile("<li data-active-nav ><a href='http://server/register'>Register</a></li>")(scope);
            
            //fire watch
            scope.$apply();                    
            expect(elem.hasClass('active')).to.equal(true);
        });
        
        it('when location is different from "href" of link - the "active" class must be removed',function(){
            location.path('register');
            $httpBackend.expectGET('register').respond();
            $httpBackend.flush();

            //initially  decorated with 'active'
            var elem = compile("<li data-active-nav class='active'><a href='http://server/login'>somelink</a></li>")(scope);
            
            //fire watch
            scope.$apply();                    
            expect(elem.hasClass('active')).to.equal(false);
        })        
    })

    
});
