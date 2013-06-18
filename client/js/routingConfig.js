(function(exports){


    var config = {

        /* List all the roles you wish to use in the app
        * ORDER matters do not change the order simply append new roles to the end
        * You have a max of 31 before the bit shift pushes the accompanying integer out of
        * the memory footprint for an integer
        */
        roles :[
            'public',
            'user',
            'admin'],

        /*
        Build out all the access levels you want referencing the roles listed above
        You can use the "*" symbol to represent access to all roles
         */
        accessLevels : {
            'public' : "*",
            'anon': ['public','errortest'],
            'user' : ['user','admin'],
            'admin': ['admin']
        }

    }

    /*
        Method to build a distinct bit mask for each role
        It starts off with "1" and shifts the bit to the left for each element in the
        roles array provided in the config object above
     */

    function buildRoles(){

        var bitMask = "01";
        exports.userRoles = {};

        for(var role in config.roles){
            var intCode = parseInt(bitMask,2);
            exports.userRoles[config.roles[role]]= intCode;
            bitMask = (intCode << 1 ).toString(2)
        }
    }

    /*
    This method takes the config for the access level and matches it to the roles defined above
     */
    function buildAccessLevels(){

        exports.accessLevels = {};
        for(var level in config.accessLevels){

            if(typeof config.accessLevels[level] == 'string'){

                if(config.accessLevels[level]=='*'){

                    var resultBitMask='';

                    for( var role in exports.userRoles){
                        resultBitMask += "1"
                    }
                    exports.accessLevels[level] = parseInt(resultBitMask,2);

                }else{
                    console.log("Access Control Error: Could not parse '"+config.accessLevels[level]+"' as access definition for level '"+level+"'")
                }

            }else{

                var resultBitCode=0;
                for(var role in config.accessLevels[level]){

                    if(exports.userRoles.hasOwnProperty(config.accessLevels[level][role])){
                        resultBitCode = resultBitCode | exports.userRoles[config.accessLevels[level][role]]

                    }else{
                        console.log("Access Control Error: Could not find role '"+config.accessLevels[level][role]+"' in registered roles while building access for '"+level+"'")
                    }
                }
                exports.accessLevels[level] = resultBitCode;
            }
        }
    }



  //Build out the actual configuration to be used in the app
  buildRoles();
  buildAccessLevels();



})(typeof exports === 'undefined'? this['routingConfig']={}: exports);