({
    fetchAccounts : function( component, event, helper ) {
        var columns = [
            {
                type: 'text',
                fieldName: 'Name',
                label: 'Account Name'
            },
            {
                type: 'text',
                fieldName: 'Industry',
                label: 'Industry'
            },
            {
                type: 'text',
                fieldName: 'FirstName',
                label: 'First Name'
            },
            {
                type: 'text',
                fieldName: 'LastName',
                label: 'Last Name'
            },
            {
                type: 'email',
                fieldName: 'Email',
                label: 'Email'
            }
        ];
        component.set('v.gridColumns', columns);
        var action = component.get("c.fetchAccts");
        action.setCallback(this, function(response){
            var state = response.getState();
            if ( state === "SUCCESS" ) {
                var data = response.getReturnValue();
                for ( var i = 0; i < data.length; i++ ) {
                    data[i]._children = data[ i ][ 'Contacts' ];
                    delete data[i].Contacts;

                }
                component.set( 'v.gridData', data );
            }
        });
        $A.enqueueAction(action);
    },
   
    onSelected : function( component, event, helper ) {
       
        var selectedRows = event.getParam( 'selectedRows' );
        var data = component.get( 'v.gridData' );
        var selectedData = [];
       
        for ( var i = 0; i < selectedRows.length; i++ ) {
           
            for ( var j = 0; j < data.length; j++ ){
               
                if ( selectedRows[ i ].Id == data[ j ].Id ) {
                   
                    var childrenRecs = data[ j ][ '_children' ];
                    selectedData.push( data[ j ].Id );
                   
                    for ( var k = 0; k < childrenRecs.length; k++ )
                        selectedData.push( childrenRecs[ k ].Id );   
                   
                }
               
            }
           
        }
       
        component.set( 'v.gridData', data );
        component.set( 'v.selectedRows', selectedData );
       
    }

})