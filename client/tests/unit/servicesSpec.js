'use strict';

/* jasmine specs for services go here */

describe('services', function() {
  var Auth;
  var $httpBackend;
 
  // you need to indicate your module in a test
  beforeEach(function() {
    module('angular-client-side-auth');
  });
 
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
 
  describe('Auth', function() {
    describe('instantiate', function() {
      it('should have isLoggedIn function', function() {
        expect(Auth.isLoggedIn).to.not.be.undefined;
        expect(angular.isFunction(Auth.isLoggedIn)).to.equal(true);
      });

      it('should have authorize function', function() {
        expect(Auth.authorize).to.not.be.undefined;
        expect(angular.isFunction(Auth.authorize)).to.equal(true);
      });

      it('should have login function', function() {
        expect(Auth.login).to.not.be.undefined;
        expect(angular.isFunction(Auth.login)).to.equal(true);
      });

      it('should have logout function', function() {
        expect(Auth.logout).to.not.be.undefined;
        expect(angular.isFunction(Auth.logout)).to.equal(true);
      });

      it('should have register function', function() {
        expect(Auth.register).to.not.be.undefined;
        expect(angular.isFunction(Auth.register)).to.equal(true);
      });

      it('should have the user object', function() {
        expect(Auth.user).to.not.be.undefined;
        expect(angular.isObject(Auth.user)).to.equal(true);
      });

      it('should have the userRoles object', function() {
        expect(Auth.userRoles).to.not.be.undefined;
        expect(angular.isObject(Auth.userRoles)).to.equal(true);
      });

      it('should have the accessLevels object', function() {
        expect(Auth.accessLevels).to.not.be.undefined;
        expect(angular.isObject(Auth.accessLevels)).to.equal(true);
      });

      it('should set the user object with no name and public role', function() {
        expect(Auth.user).to.deep.equal({ username: '', role: Auth.userRoles.public });
      });
    });

    describe('authorize', function() {
      it('should return 0 when role not recognized', function() {
        expect(Auth.authorize('foo')).to.equal(0);
      });

      it('should return 1 when role is recognized', function() {
        var accessLevels = { bitMask: 1 };
        var role = { bitMask: 1 };
        expect(Auth.authorize(accessLevels, role)).to.equal(1);
      });

      it('should return 0 when role is omitted and not equal', function() {
        var accessLevels = { bitMask: 0 };
        expect(Auth.user.role.bitMask).to.equal(1);
        expect(Auth.authorize(accessLevels)).to.equal(0);
      });

      it('should return 1 when role is omitted but equal', function() {
        var accessLevels = { bitMask: 1 };
        expect(Auth.user.role.bitMask).to.equal(1);
        expect(Auth.authorize(accessLevels)).to.equal(1);
      });
    });

    describe('isLoggedIn', function() {
      it('should use the currentUser when use omitted', function() {
        // current user has role public
        expect(Auth.isLoggedIn()).to.equal(false);
      });

      it('should return false when user has role public', function() {
        var user = { role: { title: 'public' } };
        expect(Auth.isLoggedIn(user)).to.equal(false);
      });

      it('should return true when user has role user', function() {
        var user = { role: { title: 'user' } };
        expect(Auth.isLoggedIn(user)).to.equal(true);
      });

      it('should return true when user has role admin', function() {
        var user = { role: { title: 'admin' } };
        expect(Auth.isLoggedIn(user)).to.equal(true);
      });
    });

    describe('register', function() {
      it('should make a request and invoke callback', function() {
        var invoked = false;
        var success = function() {
          invoked = true;
        };
        var error = function() {};
        $httpBackend.expectPOST('/register').respond();
        Auth.register({}, success, error);
        $httpBackend.flush();
        expect(invoked).to.equal(true);
      });

      it('should append the user', function() {
        var success = function() {};
        var error = function() {};
        $httpBackend.expectPOST('/register').respond({ 'user': 'foo' });
        Auth.register({}, success, error);
        $httpBackend.flush();
        expect(Auth.user).to.deep.equal({ username : '', role : { bitMask : 1, title : 'public' }, user : 'foo' });
      });
    });

    describe('login', function() {
      it('should make a request and invoke callback', function() {
        var invoked = false;
        var success = function() {
          invoked = true;
        };
        var error = function() {};
        $httpBackend.expectPOST('/login').respond();
        Auth.login({}, success, error);
        $httpBackend.flush();
        expect(invoked).to.equal(true);
      });

      it('should append the user', function() {
        var success = function() {};
        var error = function() {};
        $httpBackend.expectPOST('/login').respond({ 'user': 'bar' });
        Auth.login({}, success, error);
        $httpBackend.flush();
        expect(Auth.user).to.deep.equal({ username : '', role : { bitMask : 1, title : 'public' }, user : 'bar' });
      });
    });

    describe('logout', function() {
      it('should make a request and invoke callback', function() {
        var invoked = false;
        var success = function() {
          invoked = true;
        };
        var error = function() {};
        $httpBackend.expectPOST('/logout').respond();
        Auth.logout(success, error);
        $httpBackend.flush();
        expect(invoked).to.equal(true);
      });
    });
  });
});
