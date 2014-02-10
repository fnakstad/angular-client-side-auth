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
    
});
