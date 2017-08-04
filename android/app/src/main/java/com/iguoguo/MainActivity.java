package com.iguoguo;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.graphics.Color;

import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "iguoguo";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        // getWindow().requestFeature(Window.FEATURE_NO_TITLE);  
        // if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {  
        //     Window window = getWindow();
        //     window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        //     window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        //     window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        //     window.setStatusBarColor(Color.TRANSPARENT);
        // }  
  
        // setContentView(R.layout.activity_main);
    }
}
