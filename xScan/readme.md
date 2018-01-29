
# [<span class="octicon octicon-link"></span>](#awakeapp)Awake.app

[÷–ŒƒΩÈ…‹](http://type.so/object-c/awake-app.html)

[![screenshot](https://camo.githubusercontent.com/2bb97b776db20dbac366727cf21328d8f8a2c8bb/68747470733a2f2f7261772e6769746875622e636f6d2f7869616f7a692f4177616b652e6170702f6d61737465722f73637265656e73686f742e706e67)](https://camo.githubusercontent.com/2bb97b776db20dbac366727cf21328d8f8a2c8bb/68747470733a2f2f7261772e6769746875622e636f6d2f7869616f7a692f4177616b652e6170702f6d61737465722f73637265656e73686f742e706e67)

An app for mac osx to prevent sleeping; inspired by Caffeine.

1.  left click to toggle "should sleep status"
2.  right click for menu

"run at login" will not take effect unless you put this app in the `/Applications` directory.

### [<span class="octicon octicon-link"></span>](#download)download

[https://github.com/xiaozi/Awake.app/releases](https://github.com/xiaozi/Awake.app/releases)

### [<span class="octicon octicon-link"></span>](#apple-script-supported)apple script supported

```applescript
tell application "Awake"
    turn on for 1
    -- turn off
end tell
```