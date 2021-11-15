# React/Redux, Webpack 5, Typescript, default PWA config


# VScode setup

** In .vscode folder you can see extensions.json where you can find a recommended VScode extensions which will help you code faster cleaner and easier.

![image](https://user-images.githubusercontent.com/55023068/117546710-6d17db00-b034-11eb-9673-6246e31ae895.png)

** You can see there is also front-end.code-snippets
This helps to write some all-time-repeated code faster.
Some examples:

snippet: "saga"

![image](https://user-images.githubusercontent.com/55023068/117546774-ced84500-b034-11eb-8496-2f3b7a18dd74.png)

snippet: "service_init"

![image](https://user-images.githubusercontent.com/55023068/117546804-fb8c5c80-b034-11eb-84a4-7ebe004026e5.png)

snippet: "service_request"

![image](https://user-images.githubusercontent.com/55023068/117546818-152da400-b035-11eb-8c6c-6cbfb116ff57.png)

Explore others in .vscode/front-end.code-snippets. Don't be shy to add your own.

# Template generator

** To create components or redux modules faster, you can use Template Generator

To continue, you should have installed Template Generator extension, if you haven't installed yet, you can find it out in @recommended list.
Quick tutorial how to install and use:

1. F1 > Open template generator
2. Move folders from directory .templates to folder you opened via step 1.
3. Save everything. By now you can remove .templates from project.
4. Press right click on the folder in your workspace. Choose template from list and give it name.
5. By now you should have created a module in the folder.

# Components

Please check out all components before you want to create new ones.

![image](https://user-images.githubusercontent.com/55023068/105221336-a4d04500-5b61-11eb-9870-37e2c52a801e.png)

# Manifest, Service Worker

**_Manifest_**:

- Provided basic config
- Use npm pwa-asset-generator to generate icons for manifest

**_Service worker_**:

- Registering service-worker
- Caching css|js
- Caching png|jpg|gif
- Added route to cache api response (POST, GET)
- Added route to cache react-router pages
- Added function to handle background sync request (in case we made POST request with internet lost connection it will be sent asap connection is up again)

# Lazy load

![image](https://user-images.githubusercontent.com/55023068/105222711-866b4900-5b63-11eb-8807-ab0104d4cd8c.png)

- Use React.Lazy to import your component
- Use default export for component as it required for React.lazy work
- webpackChunkName gives a file name, example for LazyLoad component:
  ![image](https://user-images.githubusercontent.com/55023068/105222881-c0d4e600-5b63-11eb-9a15-efcf541ffc44.png)

# Husky

**_Added husky script that includes pre-commit processes_**

[!!!] This boilerplate has pre-commit script, which will run stylelint & eslint commands before you push new commit. If you don't see it working, please run "npx husky install". If it will not help, please view husky docs, and combine two script "npm run eslint" & "npm run stylelint" inside script config.

- "eslint": going through all files and trying to auto-fix eslint issues, if there is error, you won't be able to make commit & push.
- "stylelint": going through all scss files, filtering & sorting & auto-fix problems. Using airbnb config.

# Babel

**Included next Babel plugins/presets:**

- **_@babel/preset-env_** (@babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s))
- **_@babel/preset-typescript_** (This preset is recommended if you use TypeScript, a typed superset of JavaScript.)
- **_@babel/plugin-proposal-class-properties_** (This plugin transforms static class properties as well as properties declared with the property initializer syntax)
- **_@babel/plugin-transform-typescript_** (This plugin adds support for the syntax used by the TypeScript programming language)
- **_@babel/plugin-transform-runtime_** (A plugin that enables the re-use of Babel's injected helper code to save on codesize.)

**Babel for Optimization:**

- **_transform-remove-debugger_** (removes debugger)
- **_minify-dead-code-elimination_** (removes unused code)
- **_minify-simplify_** (minifying code)
- **_transform-minify-booleans_** (example: transforms from 'true' to '!0')
- **_transform-merge-sibling-variables _**(merge sibling variables into one).
- **_@babel/plugin-transform-react-constant-elements_** (This plugin can speed up reconciliation and reduce garbage collection pressure by hoisting React elements to the highest possible scope, preventing multiple unnecessary reinstantiations.)
- **_@babel/plugin-proposal-export-namespace-from_** (example: export \* as ns from 'mod';)
- **_@babel/plugin-transform-react-jsx-compat_** (react)
- **_@babel/plugin-transform-react-jsx-self_** (react)
- **_transform-remove-console_** (removess all console logs except warnings & errors (in case we want to use for production))

# Webpack

**Common plugins:**

- **_TsconfigPathsPlugin_**
- **_PrettierPlugin_**
- **_ESLintPlugin_**
- **_CleanWebpackPlugin_** (clears build folder everytime we build new one)
- **_HtmlWebpackPlugin_** (generates html template)

**Plugins for development:**

- **_DuplicatesPlugin_** (checks for duplicates in npm packages)
- **_UnusedWebpackPlugin_** (warnings for console about unused files)
- **_ForkTsCheckerWebpackPlugin_** (realtime ts checking)
- **_CircularDependencyPlugin_** (checks for circular imports)
- **_FriendlyErrorsWebpackPlugin_** (warnings & errors in console)
- **_CaseSensitivePathsPlugin_** (checks right spelled file import)

**Plugins for prod:**

- **_BundleAnalyzerPlugin_** (creates ui map of files)
- **_MiniCssExtractPlugin_** (css optimizations)
- **_CssMinimizerPlugin_** (css optimization)

**Webpack loaders:**

- **_sass-loader_** (sass-loader will transpile scss into css)
- **_postcss-loader_** (postcss uses latest features of css in browsers)
- **_css-loader_** (css-loader will load all styles)
- **_style-loader_** (style-loader will apply them to DOM elements)
- **_babel-loader_** (compile js files)
- **_ts-loader_** (handler ts files)
- **_asset/resource_** (webpack 5 loader, file-loader, saves types in build/assets folder)
- **_asset/inline_** (webpack 5 loader, url loader, bundles with js)

# UI plugins

**Compile status**

![image](https://user-images.githubusercontent.com/55023068/103198309-ac008c00-48f0-11eb-9c18-d06001079793.png)

**Npm pagckages duplicates status**
![image](https://user-images.githubusercontent.com/55023068/103198347-cc304b00-48f0-11eb-9f26-1c09302c5d69.png)

**Unused files status**
![image](https://user-images.githubusercontent.com/55023068/103198417-f3871800-48f0-11eb-8b5f-64c0967dd37f.png)
![image](https://user-images.githubusercontent.com/55023068/105320311-b0a62080-5bce-11eb-8bb9-bd0805117888.png)

**Ts status**
![image](https://user-images.githubusercontent.com/55023068/103198535-36e18680-48f1-11eb-86c5-a9bee9325f10.png)

# Lighthouse result

![image](https://user-images.githubusercontent.com/55023068/105220074-e19b3c80-5b5f-11eb-9350-b64e0a7b19f8.png)
![image](https://user-images.githubusercontent.com/55023068/105218245-92540c80-5b5d-11eb-8ee9-d86ddcf34d12.png)
