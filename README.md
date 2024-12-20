# Credit: Asaki Yuki
This is a fork of the jsonui-scripting package version 2.0.2, created to be stored and reused when needed. I made this backup because version 2.0.2 is not yet available on npm and GitHub. This copy is shared completely free of charge and stored for the sole purpose of serving, without changing the ownership of the original. All ownership rights belong to the original author of the package, Asaki Yuki. Any further changes and developments should still be done on the original copy of the repository.

# Minecraft Scripting UI

 Create your UI Resource Packs for Minecraft Bedrock with JavaScript/TypeScript!

# Installation
To install the required dependencies, run the following command in your project directory:
```bat
npm install jsonui-scripting # Nope
npm install git+https://github.com/Wd-Endd/AsakiYuki-s-JsonUI-Scripting-2.0.2.git
```
This will add jsonui-scripting to your project's package.json file and download the package into your node_modules directory.

# How to use

The syntax is very simple, I can provide an example using code snippets displaying 'Hello World!' text on the Start Screen as follows:
```javascript
// Import the JsonUIElement and Modify classes from JsonUI Scripting.
const { JsonUIElement, Modify } = require('jsonui-scripting');

// Create an image element to be used as the background for the text
const textBackground = JsonUIElement.image({
    texture: 'textures/ui/Black',
    size: "100%cm + 2px",
    layer: 10,
    alpha: 0.8
});

// Create a text element with the content "Hello World!"
const text = JsonUIElement.label({
    text: "Hello World!"
});

// Add the text element to the image background
textBackground.addElement(text);

// Insert the image background (with the text element) into the start screen's content controls
Modify.StartScreen('start_screen_content').modifications.controls.insertFront(textBackground);
```

And the code snippet you will receive in JsonUI format will be as follows after you run app.js:

```jsonc
// start_screen.json
{
    "start_screen_content": {
        "modifications": [
            {
                "array_name": "controls",
                "operation": "insert_front",
                "value": [ { "a9e0fe62cac2194d5b9a4a297@app.app-js:5:38": {} } ]
            }
        ]
    }
}
```

```jsonc
{
    "namespace": "app",
    "app-js:5:38": {
        "type": "image",
        "texture": "textures/ui/Black",
        "size": [ "100%cm + 2px", "100%cm + 2px" ],
        "layer": 10,
        "alpha": 0.8,
        "controls": [ { "d8202554472234d22b5c841fe@app.app-js:13:28": {} } ]
    },
    "app-js:13:28": {
        "type": "label",
        "text": "Hello World!"
    }
}
```

# Config.json
You can also create a config.json file in your project so that when the JsonUI pack is built, it will be installed into the game.
```json
{
    "folder_name": "output_ui_pack",
    "preview": true,
    "development": true,
    "obfuscate_element_names": false,
    "debug_screen_content": false,
    "manifest": {
        "name": "pack_name",
        "version": [ 1, 0, 0 ],
        "uuid": "********-****-****-****-************",
        "description": "pack_decscription"
    }
}
```
