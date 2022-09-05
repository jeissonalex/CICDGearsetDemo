public class AccountListController {

    @AuraEnabled
    public static List < Account > fetchAccts() {
        return [ SELECT Id, Name, Industry,
                ( SELECT Id, FirstName, LastName FROM Contacts )
                FROM Account LIMIT 100 ];
    }
   

}