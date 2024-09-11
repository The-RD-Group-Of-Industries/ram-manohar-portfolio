Notes about this code>>>

1. /app  -> this for all pages & routes in Website . 
    /api -> this not aa route this for the backend api. 
            /auth -> Authentication using nextAuth.
            /contact -> Sent Email.
            /uploadthing -> this is third party upload image & pdf library Api . 
    /auth -> this for the authentication & forgot Password routes .
    /dashboard -> this for the dashboard routes. 
    /(site) 
             /blog -> this for the blog routes on site 
             /publication -> this for the publication routes on site.

2. /components -> this for all the components in the website.
    /AUI -> aceternity UI third party library for UI.
    /auth -> Authentication pages components.
    /dashboard -> Dashboard pages components.
    /site -> Site pages components.
    /Reusable -> Reusable components.
    /ui -> for Shadcn UI components.
    /magicUI -> for Magic UI components.


3. /core/actions -> this for all the actions in the website (Backend).
    /Dashboard -> Dashboard actions.
    /forgotPassword -> forgot password actions.

4. /lib -> this for all the libraries in the website.
    utils.ts -> this for all the utils functions in the website.( working of shadcn & magic UI )

5. /resources -> this for all the resources in the website.
     /images -> this for all the images in the website.
     /schemas -> this for all the schemas in the Signin.
     /types -> this for all the types in the website.
     /uploadthing -> this for all the upload things in the website.


6. Middleware.ts -> this for all the middleware in this website to control who can access the dasboard for not.


Notes: Uploadthing data set as  public on this dashboard  https://uploadthing.com/

 ----------> kindly change the UPLOADTHING_APP_ID of uploadthings in the next.config.mjs