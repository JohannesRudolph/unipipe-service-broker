{ serviceInstanceId : Text
, asyncAccepted : Bool
, context :
    { auth_url : Optional Text
    , customer_id : Text
    , permission_url : Optional Text
    , platform : Text
    , project_id : Text
    , token_url : Optional Text
    }
, deleted : Optional Bool
, originatingIdentity :
    Optional
      { platform : Text, user_euid : Optional Text, user_id : Optional Text }
, parameters : { projectdescription : Text, projectname : Text }
, planId : Text
, serviceDefinition :
    { bindable : Bool
    , dashboardClient : Optional Text
    , description : Text
    , id : Text
    , metadata :
        { displayName : Text
        , documentationUrl : Text
        , imageUrl : Text
        , longDescription : Text
        , providerDisplayName : Text
        , supportUrl : Text
        , tenantAware :
            -- indicates this is a tenant-aware service supporting tenant bindings
            Optional Bool
        }
    , name : Text
    , planUpdateable : Bool
    , plans :
        -- we ignore many common plan metadata for now in the schema, we can add more later
        List { description : Optional Text, id : Text, name : Text }
    , requires : List <>
    , tags : List Text
    }
}
