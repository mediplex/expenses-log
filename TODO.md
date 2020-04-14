# TODO

## create reset script

To remove (node_modules, .gradle, android, ios, build)

    ionic build
    ionic cap add andoid
    ionic cap add ios
    ionic cap copy android
    ionic cap copy ios

    cordova-res ios --skip-config --copy
    cordova-res android --skip-config --copy


    ionic cap run ios -l --external
    ionic cap run android -l --external

## create useForm hook

## replace modals by routes

## create authContext
