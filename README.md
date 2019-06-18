# GraphQL mode for CodeMirror (this repository moved to GraphQL IDE Monorepo)

> ⚠️NOTICE!⚠️ This repository is about to be archived and is now part of a monorepo.  Please make new PRs and issues in the [GraphQL IDE Monorepo](https://github.com/graphql/graphiql)

[![Build Status](https://travis-ci.org/graphql/codemirror-graphql.svg?branch=master)](https://travis-ci.org/graphql/codemirror-graphql)

Provides CodeMirror with a parser mode for GraphQL along with a live linter and
typeahead hinter powered by your GraphQL Schema.

![](resources/example.gif)

### Getting Started

```
npm install --save codemirror-graphql
```

CodeMirror helpers install themselves to the global CodeMirror when they
are imported.

```js
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';

CodeMirror.fromTextArea(myTextarea, {
  mode: 'graphql',
  lint: {
    schema: myGraphQLSchema
  },
  hintOptions: {
    schema: myGraphQLSchema
  }
});
```

Build for the web with [webpack](http://webpack.github.io/) or
[browserify](http://browserify.org/).
