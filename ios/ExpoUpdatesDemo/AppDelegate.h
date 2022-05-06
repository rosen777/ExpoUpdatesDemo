#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>

#import <React/RCTBridgeDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>

#import <UMCore/UMAppDelegateWrapper.h>

@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
